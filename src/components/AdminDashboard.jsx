import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { users, bookings, packages, currentUser, logout, updateBookingStatus, addPackage, deletePackage, toggleFeaturedPackage, updatePackage, destinations, addDestination, updateDestination, deleteDestination } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [editingPkg, setEditingPkg] = useState(null);
  const [editingDest, setEditingDest] = useState(null);

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
              <button onClick={() => {
                const title = prompt("Package Name (e.g. Desert Safari):");
                if (title) {
                  addPackage({ title, duration: '3 Days / 2 Nights', price: 9999, route: 'Local', featured: false, description: 'Brand new package added by Admin.', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600' });
                }
              }} className="glass-button" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>+ Add Package</button>
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
              <button onClick={() => {
                const name = prompt("Destination Name:");
                if (name) {
                  addDestination({ 
                    name, 
                    description: 'New destination description...', 
                    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600', 
                    tags: ['New'], 
                    media_slides: [] 
                  });
                }
              }} className="glass-button" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>+ Add Destination</button>
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

      {/* Edit Package Modal */}
      {editingPkg && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '500px', padding: '30px', position: 'relative' }}>
            <h2 style={{ marginBottom: '20px' }}>Edit Package</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedData = {
                title: formData.get('title'),
                price: parseFloat(formData.get('price')),
                duration: formData.get('duration'),
                description: formData.get('description')
              };
              await updatePackage(editingPkg.id, updatedData);
              setEditingPkg(null);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Title</label>
                <input name="title" defaultValue={editingPkg.title} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Price (₹)</label>
                <input name="price" type="number" defaultValue={editingPkg.price} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Duration (Days/Nights)</label>
                <input name="duration" defaultValue={editingPkg.duration} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Description / Features</label>
                <textarea name="description" defaultValue={editingPkg.description} rows={4} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>Save Changes</button>
                <button type="button" className="glass-button" onClick={() => setEditingPkg(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Destination Modal */}
      {editingDest && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '500px', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px' }}>Edit Destination</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const tagsArray = formData.get('tags').split(',').map(t => t.trim()).filter(Boolean);
              const slidesArray = formData.get('media_slides').split(',').map(s => s.trim()).filter(Boolean);
              
              const updatedData = {
                name: formData.get('name'),
                description: formData.get('description'),
                image: formData.get('image'),
                tags: tagsArray,
                media_slides: slidesArray,
              };
              updateDestination(editingDest.id, updatedData);
              setEditingDest(null);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Name</label>
                <input name="name" defaultValue={editingDest.name} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Main Image URL</label>
                <input name="image" defaultValue={editingDest.image} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Description</label>
                <textarea name="description" defaultValue={editingDest.description} rows={3} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Tags (Comma separated)</label>
                <input name="tags" defaultValue={(editingDest.tags || []).join(', ')} placeholder="Mountains, Nature" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Slideshow Media URLs (Comma separated)</label>
                <textarea name="media_slides" defaultValue={(editingDest.media_slides || []).join(', ')} rows={3} placeholder="https://image1.jpg, https://image2.jpg" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'none' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--color-saffron)', marginTop: '5px' }}>These images/videos will appear in the Discover More popup.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>Save Changes</button>
                <button type="button" className="glass-button" onClick={() => setEditingDest(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
