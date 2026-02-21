import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const defaultDestinations = [
  {
    id: 1,
    name: 'Royal Rajasthan',
    description: 'Explore the majestic forts, palaces, and vibrant culture of the desert state.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Heritage', 'Desert', 'Culture'],
    media_slides: []
  },
  {
    id: 2,
    name: 'Serene Kerala',
    description: 'Cruise through tranquil backwaters and relax on pristine tropical beaches.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Nature', 'Backwaters', 'Ayurveda'],
    media_slides: []
  },
  {
    id: 3,
    name: 'Majestic Himalayas',
    description: 'Experience the spiritual aura and breathtaking peaks of the northern frontier.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d99903b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Adventure', 'Spiritual'],
    media_slides: []
  }
];

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: usersData } = await supabase.from('users').select('*');
        if (usersData) setUsers(usersData);

        const { data: packagesData } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
        if (packagesData) setPackages(packagesData);

        const { data: bookingsData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (bookingsData) setBookings(bookingsData);

        // Check local storage for persistent login
        const savedUser = localStorage.getItem('terraUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (usersData) {
            const activeDbUser = usersData.find(u => u.id === parsedUser.id);
            if (activeDbUser) {
              setCurrentUser(activeDbUser);
              localStorage.setItem('terraUser', JSON.stringify(activeDbUser));
            } else {
              setCurrentUser(parsedUser);
            }
          } else {
            setCurrentUser(parsedUser);
          }
        }
        
        // Fetch Destinations
        const { data: destsData } = await supabase.from('destinations').select('*').order('id', { ascending: true });
        
        if (destsData && destsData.length > 0) {
          setDestinations(destsData);
        } else {
          // Seed the database with defaults if it's completely empty
          setDestinations(defaultDestinations);
          // Fire and forget insertion of defaults
          supabase.from('destinations').insert(defaultDestinations.map(({ id, ...rest }) => rest)).then();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auth Functions
  const login = async (mobile, password) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('mobile', mobile)
      .eq('password', password)
      .single();

    if (user && !error) {
      setCurrentUser(user);
      localStorage.setItem('terraUser', JSON.stringify(user));
      // Update status to online in DB
      await supabase.from('users').update({ status: 'Online' }).eq('id', user.id);
      setUsers(users.map(u => u.id === user.id ? { ...u, status: 'Online' } : u));
      return true;
    }
    return false;
  };

  const signup = async (userData) => {
    // Check if exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${userData.email},mobile.eq.${userData.mobile}`);
      
    if (existing && existing.length > 0) return false;

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ 
        name: userData.name, 
        email: userData.email, 
        mobile: userData.mobile, 
        password: userData.password,
        status: 'Online',
        role: 'user'
      }])
      .select()
      .single();

    if (!error && newUser) {
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      localStorage.setItem('terraUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = async () => {
    if (currentUser) {
      await supabase.from('users').update({ status: 'Offline' }).eq('id', currentUser.id);
      setUsers(users.map(u => u.id === currentUser.id ? { ...u, status: 'Offline' } : u));
    }
    setCurrentUser(null);
    localStorage.removeItem('terraUser');
  };

  // Booking Functions
  const createBooking = async (pkgData, details = {}) => {
    if (!currentUser) return false;
    
    const pkg = (typeof pkgData === 'string' || typeof pkgData === 'number') 
      ? packages.find(p => p.id === pkgData) 
      : pkgData;

    if (!pkg) {
      alert("Package not found");
      return false;
    }
    
    try {
      // Check if user already booked this
      const { data: existingBooking } = await supabase
        .from('bookings')
        .select('id')
        .eq('user_id', currentUser.id)
        .eq('package_id', pkg.id);
        
      if (existingBooking && existingBooking.length > 0) {
        alert("You have already booked this package!");
        return false;
      }
    } catch(err) {
      console.warn("Non-fatal check error:", err);
    }

    const bookingData = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      user_id: currentUser.id,
      user_name: currentUser.name,
      package_id: pkg.id,
      package_title: pkg.title || pkg.name,
      price: pkg.price,
      status: 'Pending',
      date: `${details.date || new Date().toLocaleDateString()} | Pax: ${details.travelers || 1} | Req: ${details.requests || 'N/A'}`,
    };

    const { data: newBooking, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (!error && newBooking) {
      setBookings([newBooking, ...bookings]);
      return true;
    }
    
    if (error) {
      console.error("Booking failed:", error);
    }
    return false;
  };

  // Admin Functions
  const updateBookingStatus = async (bookingId, status) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (!error) {
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    }
  };

  const addPackage = async (newPkg) => {
    const { data: insertedPkg, error } = await supabase
      .from('packages')
      .insert([newPkg])
      .select()
      .single();

    if (!error && insertedPkg) {
      setPackages([insertedPkg, ...packages]);
    }
  };

  const updatePackage = async (id, updatedData) => {
    const { error } = await supabase
      .from('packages')
      .update(updatedData)
      .eq('id', id);

    if (!error) {
      setPackages(packages.map(p => p.id === id ? { ...p, ...updatedData } : p));
      return true;
    }
    console.error("Error updating package:", error);
    return false;
  };

  const toggleFeaturedPackage = async (id, currentStatus) => {
    const { error } = await supabase
      .from('packages')
      .update({ featured: !currentStatus })
      .eq('id', id);

    if (!error) {
      setPackages(packages.map(p => p.id === id ? { ...p, featured: !currentStatus } : p));
    }
  };

  const deletePackage = async (id) => {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);

    if (!error) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  // Destination Admin Functions (Supabase Integrated)
  const addDestination = async (newDest) => {
    const { data: insertedDest, error } = await supabase
      .from('destinations')
      .insert([newDest])
      .select()
      .single();

    if (!error && insertedDest) {
      setDestinations([...destinations, insertedDest]);
    }
  };
  
  const updateDestination = async (id, updatedData) => {
    const { error } = await supabase
      .from('destinations')
      .update(updatedData)
      .eq('id', id);

    if (!error) {
       setDestinations(destinations.map(d => d.id === id ? { ...d, ...updatedData } : d));
    }
  };

  const deleteDestination = async (id) => {
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);

    if (!error) {
      setDestinations(destinations.filter(d => d.id !== id));
    }
  };

  return (
    <AppContext.Provider value={{
      users, packages, bookings, destinations, currentUser, loading,
      login, signup, logout, createBooking, 
      updateBookingStatus, addPackage, updatePackage, deletePackage, toggleFeaturedPackage,
      addDestination, updateDestination, deleteDestination
    }}>
      {children}
    </AppContext.Provider>
  );
};
