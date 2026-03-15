import React, { createContext, useState, useContext, useEffect } from 'react';
import { databases, appwriteConfig, ID } from '../lib/appwriteClient';
import { Query } from 'appwrite';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const defaultDestinations = [
  {
    name: 'Royal Rajasthan',
    description: 'Explore the majestic forts, palaces, and vibrant culture of the desert state.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Heritage', 'Desert', 'Culture'],
    media_slides: []
  },
  {
    name: 'Serene Kerala',
    description: 'Cruise through tranquil backwaters and relax on pristine tropical beaches.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Nature', 'Backwaters', 'Ayurveda'],
    media_slides: []
  },
  {
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
  const [callbackRequests, setCallbackRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get collection ID
  const getTable = (name) => appwriteConfig.tables[name];

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResp = await databases.listDocuments(appwriteConfig.databaseId, getTable('profiles'));
        if (usersResp?.documents) setUsers(usersResp.documents);

        const packagesResp = await databases.listDocuments(
            appwriteConfig.databaseId, 
            getTable('packages'),
            [Query.orderDesc('$createdAt')]
        );
        if (packagesResp?.documents) setPackages(packagesResp.documents);

        const bookingsResp = await databases.listDocuments(
            appwriteConfig.databaseId, 
            getTable('bookings'),
            [Query.orderDesc('$createdAt')]
        );
        if (bookingsResp?.documents) setBookings(bookingsResp.documents);

        const callbacksResp = await databases.listDocuments(
            appwriteConfig.databaseId,
            getTable('callback_requests'),
            [Query.orderDesc('$createdAt')]
        ).catch(() => null); // Ignore error if table doesn't exist yet
        if (callbacksResp?.documents) setCallbackRequests(callbacksResp.documents);

        // Check local storage for persistent login
        const savedUser = localStorage.getItem('terraUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (usersResp?.documents) {
            const activeDbUser = usersResp.documents.find(u => 
              (parsedUser.$id && u.$id === parsedUser.$id) || 
              (parsedUser.id && u.id === parsedUser.id)
            );
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
        const destsResp = await databases.listDocuments(
            appwriteConfig.databaseId, 
            getTable('destinations'),
            [Query.orderAsc('$createdAt')]
        );
        
        if (destsResp?.documents && destsResp.documents.length > 0) {
          setDestinations(destsResp.documents);
        } else {
          // Seed the database with defaults if it's completely empty
          setDestinations(defaultDestinations.map((d, i) => ({ ...d, id: `default-${i}` }))); // Assign temporary IDs for UI
          // Fire and forget insertion of defaults
          defaultDestinations.forEach(async (dest) => {
            try {
               // Only send exactly what the schema expects!
               // Extra attributes (even if undefined) cause 400 errors.
               const destToInsert = { 
                   name: dest.name,
                   description: dest.description,
                   image: dest.image,
                   tags: dest.tags
               };
               
               await databases.createDocument(
                   appwriteConfig.databaseId, 
                   getTable('destinations'), 
                   ID.unique(), 
                   destToInsert
               );
            } catch (err) {
               console.error("⛔ Dest Seeding Error ⛔", err.message, err);
               // If there's an error, it might be due to a missing attribute like 'tags'
               if (err.code === 400) {
                 console.warn("Hint: Ensure the 'destinations' collection has attributes: name (String), description (String), image (URL/String), tags (String Array)");
               }
            }
          });
        }
      } catch (error) {
        console.error("⛔ APPWRITE FETCH ERROR ⛔");
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
        console.log("Full Error Object:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auth Functions
  const login = async (mobile, password) => {
    try {
        // Find user by mobile and password (basic custom auth)
        const { documents } = await databases.listDocuments(
            appwriteConfig.databaseId, 
            getTable('profiles'),
            [
                Query.equal('mobile', mobile),
                Query.equal('password', password)
            ]
        );

        const user = documents[0];

        if (user) {
          setCurrentUser(user);
          localStorage.setItem('terraUser', JSON.stringify(user));
          
          // Update status to online in DB
          try {
             await databases.updateDocument(
                 appwriteConfig.databaseId, 
                 getTable('profiles'), 
                 user.$id, 
                 { status: 'Online' }
             );
             setUsers(users.map(u => u.$id === user.$id ? { ...u, status: 'Online' } : u));
          } catch(e) {
             console.error("Failed to update user status", e);
          }
          return true;
        }
        return false;
    } catch (error) {
        console.error("Login error:", error);
         return false;
    }
  };

  const signup = async (userData) => {
    try {
        // Check if exists
        const { documents: existing } = await databases.listDocuments(
            appwriteConfig.databaseId, 
            getTable('profiles'),
            [
                Query.or([
                     Query.equal('email', userData.email),
                     Query.equal('mobile', userData.mobile)
                ])
            ]
        );
          
        if (existing && existing.length > 0) return false;

        const newUserResp = await databases.createDocument(
            appwriteConfig.databaseId, 
            getTable('profiles'), 
            ID.unique(),
            { 
              name: userData.name, 
              email: userData.email, 
              mobile: userData.mobile, 
              password: userData.password,
              status: 'Online',
              role: 'user'
            }
        );

        if (newUserResp) {
          setUsers([...users, newUserResp]);
          setCurrentUser(newUserResp);
          localStorage.setItem('terraUser', JSON.stringify(newUserResp));
          return true;
        }
        return false;
     } catch (error) {
        console.error("Signup error:", error);
         return false;
     }
  };

  const logout = async () => {
    if (currentUser) {
      try {
          const userId = currentUser.$id || currentUser.id; // Map depending on old vs new data struct
          if (userId) {
              await databases.updateDocument(
                  appwriteConfig.databaseId, 
                  getTable('profiles'), 
                  userId, 
                  { status: 'Offline' }
              );
              setUsers(users.map(u => (u.$id === userId || u.id === userId) ? { ...u, status: 'Offline' } : u));
          }
      } catch(e) {
          console.error("Error logging out:", e);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('terraUser');
  };

  // Booking Functions
  const createBooking = async (pkgData, details = {}) => {
    if (!currentUser) return false;
    
    // Normalize user ID to handle Appwrite's $id
    const userId = currentUser.$id || currentUser.id;
    
    const pkg = (typeof pkgData === 'string' || typeof pkgData === 'number') 
      ? packages.find(p => p.id === pkgData || p.$id === pkgData) 
      : pkgData;

    if (!pkg) {
      alert("Package not found");
      return false;
    }
    
    const pkgId = pkg.$id || pkg.id;

    // Removed duplicate booking check to allow re-booking


    const bookingData = {
      user_id: userId,
      user_name: currentUser.name,
      package_id: pkgId,
      package_title: pkg.title || pkg.name,
      price: pkg.price,
      status: 'Pending',
      date: `${details.date || new Date().toLocaleDateString()} | Pax: ${details.travelers || 1} | Req: ${details.requests || 'N/A'}`,
    };

    try {
        const newBooking = await databases.createDocument(
            appwriteConfig.databaseId, 
            getTable('bookings'), 
            ID.unique(), 
            bookingData
        );

        if (newBooking) {
          setBookings([newBooking, ...bookings]);
          return true;
        }
    } catch (error) {
         console.error("Booking failed:", error);
         return false;
    }
    return false;
  };

  // Admin Functions
  const updateBookingStatus = async (bookingId, status) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId, 
            getTable('bookings'), 
            bookingId, 
            { status }
        );
        setBookings(bookings.map(b => (b.$id === bookingId || b.id === bookingId) ? { ...b, status } : b));
    } catch (error) {
        console.error("Error updating booking status:", error);
    }
  };

  const addPackage = async (newPkg) => {
    try {
        const insertedPkg = await databases.createDocument(
            appwriteConfig.databaseId, 
            getTable('packages'), 
            ID.unique(), 
            newPkg
        );
        if (insertedPkg) {
          setPackages([insertedPkg, ...packages]);
        }
    } catch (error) {
         console.error("Error adding package:", error);
         console.error("Payload attempted:", newPkg);
         alert(`Failed to save package: ${error.message}`);
    }
  };

  const updatePackage = async (id, updatedData) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId, 
            getTable('packages'), 
            id, 
            updatedData
        );
        setPackages(packages.map(p => (p.$id === id || p.id === id) ? { ...p, ...updatedData } : p));
        return true;
    } catch(error) {
        console.error("Error updating package:", error);
        return false;
    }
  };

  const toggleFeaturedPackage = async (id, currentStatus) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId, 
            getTable('packages'), 
            id, 
            { featured: !currentStatus }
        );
        setPackages(packages.map(p => (p.$id === id || p.id === id) ? { ...p, featured: !currentStatus } : p));
    } catch (error) {
        console.error("Error toggling featured package:", error);
    }
  };

  const deletePackage = async (id) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId, 
            getTable('packages'), 
            id
        );
        setPackages(packages.filter(p => p.$id !== id && p.id !== id));
    } catch (error) {
         console.error("Error deleting package:", error);
    }
  };

  // Destination Admin Functions
  const addDestination = async (newDest) => {
    try {
        const insertedDest = await databases.createDocument(
            appwriteConfig.databaseId, 
            getTable('destinations'), 
            ID.unique(), 
            newDest
        );
        if (insertedDest) {
          setDestinations([...destinations, insertedDest]);
        }
    } catch (error) {
         console.error("Error adding destination:", error);
    }
  };
  
  const updateDestination = async (id, updatedData) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId, 
            getTable('destinations'), 
            id, 
            updatedData
        );
        setDestinations(destinations.map(d => (d.$id === id || d.id === id) ? { ...d, ...updatedData } : d));
    } catch (error) {
        console.error("Error updating destination:", error);
    }
  };

  const deleteDestination = async (id) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId, 
            getTable('destinations'), 
            id
        );
        setDestinations(destinations.filter(d => d.$id !== id && d.id !== id));
    } catch (error) {
         console.error("Error deleting destination:", error);
    }
  };

  // Callback Functions
  const createCallbackRequest = async (requestData) => {
    try {
        const newRequest = await databases.createDocument(
            appwriteConfig.databaseId,
            getTable('callback_requests'),
            ID.unique(),
            { ...requestData, status: 'Pending' }
        );
        if (newRequest) {
            setCallbackRequests([newRequest, ...callbackRequests]);
            return true;
        }
    } catch (error) {
        console.error("Error creating callback request:", error);
    }
    return false;
  };

  const updateCallbackStatus = async (id, status) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId,
            getTable('callback_requests'),
            id,
            { status }
        );
        setCallbackRequests(callbackRequests.map(c => (c.$id === id || c.id === id) ? { ...c, status } : c));
    } catch (error) {
        console.error("Error updating callback status:", error);
    }
  };

  return (
    <AppContext.Provider value={{
      users, packages, bookings, destinations, currentUser, loading,
      // Pass $id as id to components expecting old Supabase schema
      normalizedPackages: packages.map(p => ({ ...p, id: p.$id || p.id })),
      normalizedDestinations: destinations.map(d => ({ ...d, id: d.$id || d.id })),
      normalizedBookings: bookings.map(b => ({ ...b, id: b.$id || b.id })),
      normalizedCallbackRequests: callbackRequests.map(c => ({ ...c, id: c.$id || c.id })),
      normalizedCurrentUser: currentUser ? { ...currentUser, id: currentUser.$id || currentUser.id } : null,
      login, signup, logout, createBooking, 
      updateBookingStatus, addPackage, updatePackage, deletePackage, toggleFeaturedPackage,
      addDestination, updateDestination, deleteDestination, createCallbackRequest, updateCallbackStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

