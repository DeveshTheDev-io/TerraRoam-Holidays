import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AdminDashboard = () => {
  const { users, bookings, packages, currentUser, logout, updateBookingStatus, addPackage, deletePackage, toggleFeaturedPackage, updatePackage, destinations, addDestination, updateDestination, deleteDestination } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [editingPkg, setEditingPkg] = useState(null);
  const [editingDest, setEditingDest] = useState(null);
  const [addingPkg, setAddingPkg] = useState(false);
  const [addingDest, setAddingDest] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageToSupabase = async (file) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    setIsUploading(true);
    try {
      const { data, error } = await supabase.storage.from('images').upload(filePath, file);
      if (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
        return null;
      }
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
      return publicUrlData.publicUrl;
    } finally {
      setIsUploading(false);
    }
  };

  // If not admin, block access
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Unauthorized</h2>
        <p>You must be an admin to view this page.</p>
        <button className="glass-button" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalRevenue = bookings.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.price, 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '1400px', margin: '0 auto', zIndex: 10, position: 'relative' }}>
      
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '3rem' }}>Admin <span className="text-gradient">Dashboard</span></h1>
        <button onClick={handleLogout} className="glass-button" style={{ padding: '10px 20px' }}>Logout</button>
      </div>

      {/* Finance Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '25px', borderLeft: '4px solid var(--color-saffron)' }}>
          <h3 style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '10px' }}>Total Revenue</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
        </div>
        <div className="glass-panel" style={{ padding: '25px', borderLeft: '4px solid var(--color-emerald)' }}>
          <h3 style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '10px' }}>Active Bookings</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{bookings.length}</div>
        </div>
        <div className="glass-panel" style={{ padding: '25px', borderLeft: '4px solid #DC143C' }}>
          <h3 style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '10px' }}>Pending Action</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{pendingBookings}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('bookings')} className="glass-button" style={{ background: activeTab === 'bookings' ? 'rgba(255,153,51,0.2)' : '' }}>Manage Bookings</button>
        <button onClick={() => setActiveTab('users')} className="glass-button" style={{ background: activeTab === 'users' ? 'rgba(255,153,51,0.2)' : '' }}>Manage Users</button>
        <button onClick={() => setActiveTab('packages')} className="glass-button" style={{ background: activeTab === 'packages' ? 'rgba(255,153,51,0.2)' : '' }}>Manage Packages</button>
        <button onClick={() => setActiveTab('destinations')} className="glass-button" style={{ background: activeTab === 'destinations' ? 'rgba(255,153,51,0.2)' : '' }}>Manage Destinations</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        
        {/* Bookings Section */}
        {activeTab === 'bookings' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Pending & Confirmed Bookings
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '15px 10px' }}>Booking ID</th>
                    <th style={{ padding: '15px 10px' }}>User</th>
                    <th style={{ padding: '15px 10px' }}>Package</th>
                    <th style={{ padding: '15px 10px' }}>Date & Details</th>
                    <th style={{ padding: '15px 10px' }}>Status</th>
                    <th style={{ padding: '15px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', color: 'white' }}>{booking.id}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{booking.user_name}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--color-saffron)' }}>{booking.package_title}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{booking.date}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: '12px', 
                          fontSize: '0.85rem',
                          background: booking.status === 'Confirmed' ? 'rgba(19, 136, 8, 0.2)' : 'rgba(255, 153, 51, 0.2)',
                          color: booking.status === 'Confirmed' ? 'var(--color-emerald)' : 'var(--color-saffron)'
                        }}>
                          {booking.status}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px' }}>
                        {booking.status === 'Pending' && (
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                            style={{ background: 'var(--color-emerald)', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status === 'Confirmed' && (
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'Pending')}
                            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            Mark Pending
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                     <tr><td colSpan="8" style={{ padding: '20px', textAlign: 'center' }}>No bookings found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Section */}
        {activeTab === 'users' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              User Management
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '15px 10px' }}>Name</th>
                    <th style={{ padding: '15px 10px' }}>Email</th>
                    <th style={{ padding: '15px 10px' }}>Mobile</th>
                    <th style={{ padding: '15px 10px' }}>Status</th>
                    <th style={{ padding: '15px 10px' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', color: 'white' }}>{user.name}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{user.email}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{user.mobile}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: '12px', 
                          fontSize: '0.85rem',
                          background: user.status === 'Online' ? 'rgba(19, 136, 8, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: user.status === 'Online' ? 'var(--color-emerald)' : 'var(--text-dim)'
                        }}>
                          {user.status}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px', color: 'var(--color-saffron)' }}>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Packages Section */}
        {activeTab === 'packages' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Available Packages</h2>
              <button onClick={() => setAddingPkg(true)} className="glass-button" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>+ Add Package</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '15px 10px' }}>Title</th>
                    <th style={{ padding: '15px 10px' }}>Duration</th>
                    <th style={{ padding: '15px 10px' }}>Price</th>
                    <th style={{ padding: '15px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map(pkg => (
                    <tr key={pkg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', color: 'white' }}>{pkg.title} {pkg.featured && '⭐'}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{pkg.duration}</td>
                      <td style={{ padding: '15px 10px', color: 'var(--color-saffron)' }}>₹{pkg.price.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '15px 10px', display: 'flex', gap: '10px' }}>
                        <button onClick={() => setEditingPkg(pkg)} style={{ background: 'var(--color-saffron)', color: '#000', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                          Edit
                        </button>
                        <button onClick={() => {
                          toggleFeaturedPackage(pkg.id, pkg.featured);
                        }} style={{ background: pkg.featured ? 'rgba(255, 153, 51, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: pkg.featured ? 'var(--color-saffron)' : 'var(--text-dim)', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s' }}>
                          {pkg.featured ? '★ Featured' : '☆ Make Feature'}
                        </button>
                        <button onClick={() => {
                          if (window.confirm('Delete this package?')) deletePackage(pkg.id);
                        }} style={{ background: 'rgba(220,20,60,0.2)', color: '#ff6b6b', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Destinations Section */}
        {activeTab === 'destinations' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Top Destinations</h2>
              <button onClick={() => setAddingDest(true)} className="glass-button" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>+ Add Destination</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '15px 10px' }}>Name</th>
                    <th style={{ padding: '15px 10px' }}>Tags</th>
                    <th style={{ padding: '15px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map(dest => (
                    <tr key={dest.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={dest.image} alt={dest.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        {dest.name}
                      </td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{dest.tags?.join(', ')}</td>
                      <td style={{ padding: '15px 10px', display: 'flex', gap: '10px' }}>
                        <button onClick={() => setEditingDest(dest)} style={{ background: 'var(--color-saffron)', color: '#000', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                          Edit
                        </button>
                        <button onClick={() => {
                          if (window.confirm('Delete this destination?')) deleteDestination(dest.id);
                        }} style={{ background: 'rgba(220,20,60,0.2)', color: '#ff6b6b', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Package Modal */}
      {(editingPkg || addingPkg) && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '500px', padding: '30px', position: 'relative' }}>
            <h2 style={{ marginBottom: '20px' }}>{editingPkg ? 'Edit Package' : 'Add Package'}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              
              let imageUrl = editingPkg ? editingPkg.image : '';
              const imageFile = formData.get('imageFile');
              if (imageFile && imageFile.size > 0) {
                const uploadedUrl = await uploadImageToSupabase(imageFile);
                if (uploadedUrl) imageUrl = uploadedUrl;
              }

              const pkgData = {
                title: formData.get('title'),
                price: parseFloat(formData.get('price')),
                duration: formData.get('duration'),
                description: formData.get('description'),
                image: imageUrl
              };

              if (editingPkg) {
                await updatePackage(editingPkg.id, pkgData);
                setEditingPkg(null);
              } else {
                pkgData.featured = false;
                pkgData.route = 'Local';
                await addPackage(pkgData);
                setAddingPkg(false);
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Title</label>
                <input name="title" defaultValue={editingPkg ? editingPkg.title : ''} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Price (₹)</label>
                <input name="price" type="number" defaultValue={editingPkg ? editingPkg.price : ''} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Duration (Days/Nights)</label>
                <input name="duration" defaultValue={editingPkg ? editingPkg.duration : ''} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Description / Features</label>
                <textarea name="description" defaultValue={editingPkg ? editingPkg.description : ''} rows={4} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Package Image {editingPkg && '(Leave blank to keep current)'}</label>
                <input name="imageFile" type="file" accept="image/*" required={!editingPkg} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={isUploading} className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>{isUploading ? 'Uploading...' : 'Save Changes'}</button>
                <button type="button" className="glass-button" onClick={() => { setEditingPkg(null); setAddingPkg(false); }} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Destination Modal */}
      {(editingDest || addingDest) && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '500px', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px' }}>{editingDest ? 'Edit Destination' : 'Add Destination'}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const tagsArray = formData.get('tags').split(',').map(t => t.trim()).filter(Boolean);
              
              let mainImageUrl = editingDest ? editingDest.image : '';
              const mainImageFile = formData.get('mainImageFile');
              if (mainImageFile && mainImageFile.size > 0) {
                const uploadedUrl = await uploadImageToSupabase(mainImageFile);
                if (uploadedUrl) mainImageUrl = uploadedUrl;
              }

              let slidesArray = editingDest && editingDest.media_slides ? [...editingDest.media_slides] : [];
              const slideFiles = formData.getAll('slideFiles');
              
              if (slideFiles && slideFiles.length > 0 && slideFiles[0].size > 0) {
                setIsUploading(true);
                const slideUploadPromises = slideFiles.map(file => uploadImageToSupabase(file));
                const newSlidesUrls = await Promise.all(slideUploadPromises);
                slidesArray = [...slidesArray, ...newSlidesUrls.filter(url => url !== null)];
                setIsUploading(false);
              }
              
              const destData = {
                name: formData.get('name'),
                description: formData.get('description'),
                tags: tagsArray,
                image: mainImageUrl,
                media_slides: slidesArray,
              };

              if (editingDest) {
                await updateDestination(editingDest.id, destData);
                setEditingDest(null);
              } else {
                await addDestination(destData);
                setAddingDest(false);
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Name</label>
                <input name="name" defaultValue={editingDest ? editingDest.name : ''} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Main Image {editingDest && '(Leave blank to keep current)'}</label>
                <input name="mainImageFile" type="file" accept="image/*" required={!editingDest} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Description</label>
                <textarea name="description" defaultValue={editingDest ? editingDest.description : ''} rows={3} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Tags (Comma separated)</label>
                <input name="tags" defaultValue={editingDest ? (editingDest.tags || []).join(', ') : ''} placeholder="Mountains, Nature" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Add Slideshow Media (Multiple images)</label>
                <input name="slideFiles" type="file" accept="image/*" multiple style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
                {editingDest && editingDest.media_slides && editingDest.media_slides.length > 0 && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '5px' }}>Current slides: {editingDest.media_slides.length} media files attached.</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={isUploading} className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>{isUploading ? 'Uploading...' : 'Save Changes'}</button>
                <button type="button" className="glass-button" onClick={() => { setEditingDest(null); setAddingDest(false); }} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
