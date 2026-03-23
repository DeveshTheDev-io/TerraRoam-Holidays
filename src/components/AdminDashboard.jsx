import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { storage, appwriteConfig, ID } from '../lib/appwriteClient';
import { 
    CheckCircle, Users, Package, Map, FileText, Image as ImageIcon, 
    MessageSquare, LogOut 
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
      users, currentUser, logout, updateBookingStatus, 
      addPackage, deletePackage, toggleFeaturedPackage, updatePackage, 
      addDestination, updateDestination, deleteDestination,
      normalizedPackages: packages, 
      normalizedBookings: bookings, 
      normalizedDestinations: destinations,
      normalizedCallbackRequests: callbackRequests,
      updateCallbackStatus,
      heroImages,
      addHeroImage,
      deleteHeroImage,
      blogs,
      addBlog,
      updateBlog,
      deleteBlog,
      siteSettings,
      upsertSiteSetting
  } = useAppContext();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [editingPkg, setEditingPkg] = useState(null);
  const [editingDest, setEditingDest] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [addingPkg, setAddingPkg] = useState(false);
  const [addingDest, setAddingDest] = useState(false);
  const [addingHero, setAddingHero] = useState(false);
  const [addingBlog, setAddingBlog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const pendingCallbacks = (callbackRequests || []).filter(c => c.status === 'Pending').length;

  const uploadImageToAppwrite = async (file) => {
    if (!file) return null;
    
    setIsUploading(true);
    try {
      const result = await storage.createFile(
          appwriteConfig.storageId,
          ID.unique(),
          file
      );
      
      if (result && result.$id) {
          // Get public view URL
          const fileUrl = storage.getFileView(
              appwriteConfig.storageId,
              result.$id
          );
          return fileUrl.href || fileUrl; // Get the raw string url
      }
      return null;
    } catch (error) {
      console.error('Error uploading image to Appwrite:', error);
      alert('Error uploading image');
      return null;
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

  const renderSidebarButton = (id, icon, label, badgeCount = 0) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)} 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '15px', 
          width: '100%', padding: '15px 20px', 
          background: isActive ? 'linear-gradient(90deg, rgba(255,153,51,0.2), transparent)' : 'transparent', 
          border: 'none', 
          borderLeft: isActive ? '4px solid var(--color-saffron)' : '4px solid transparent',
          color: isActive ? 'white' : 'var(--text-dim)', 
          textAlign: 'left', cursor: 'pointer', 
          transition: 'all 0.3s',
          fontSize: '1.05rem',
          fontWeight: isActive ? 'bold' : 'normal',
          position: 'relative'
        }}
        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
      >
        {icon}
        <span>{label}</span>
        {badgeCount > 0 && (
          <span style={{ 
              marginLeft: 'auto', background: '#DC143C', color: 'white', 
              borderRadius: '50%', minWidth: '22px', height: '22px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '0.75rem', fontWeight: 'bold', padding: '0 6px'
          }}>
              {badgeCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '80px', position: 'relative', zIndex: 10 }}>
      {/* Sidebar Layout */}
      <aside style={{ 
          width: '280px', 
          background: 'rgba(10,10,15,0.95)', 
          borderRight: '1px solid rgba(255,255,255,0.05)', 
          display: 'flex', flexDirection: 'column', 
          position: 'fixed', height: 'calc(100vh - 80px)', 
          top: '80px', left: 0, zIndex: 100
      }}>
          <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '15px' }}>
             <h2 style={{ fontSize: '1.4rem', color: 'var(--color-saffron)', margin: 0 }}>Admin Panel</h2>
             <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '5px' }}>Welcome back, Admin</p>
          </div>
          <nav style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {renderSidebarButton('bookings', <CheckCircle size={20} />, 'Manage Bookings', pendingBookings)}
              {renderSidebarButton('users', <Users size={20} />, 'Manage Users')}
              {renderSidebarButton('packages', <Package size={20} />, 'Manage Packages')}
              {renderSidebarButton('destinations', <Map size={20} />, 'Manage Destinations')}
              {renderSidebarButton('blogs', <FileText size={20} />, 'Manage Blogs')}
              {renderSidebarButton('hero', <ImageIcon size={20} />, 'Hero Images')}
              {renderSidebarButton('callbacks', <MessageSquare size={20} />, 'Callback Requests', pendingCallbacks)}
          </nav>
          <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button 
                onClick={handleLogout} 
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', 
                    padding: '12px', background: 'rgba(220,20,60,0.1)', color: '#ff6b6b', 
                    border: '1px solid rgba(220,20,60,0.2)', borderRadius: '8px', 
                    cursor: 'pointer', justifyContent: 'center', fontWeight: 'bold', transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(220,20,60,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(220,20,60,0.1)'}
            >
                <LogOut size={18} /> Logout
            </button>
          </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '40px', maxWidth: 'calc(100vw - 280px)' }}>
        
        <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Dashboard <span className="text-gradient">Overview</span></h1>
        </div>

        {/* Finance Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
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
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{pendingBookings + pendingCallbacks}</div>
          </div>
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

        {/* Callback Requests Section */}
        {activeTab === 'callbacks' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Callback Requests
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '15px 10px' }}>Name</th>
                    <th style={{ padding: '15px 10px' }}>Contact</th>
                    <th style={{ padding: '15px 10px' }}>Query / Message</th>
                    <th style={{ padding: '15px 10px' }}>Status</th>
                    <th style={{ padding: '15px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(callbackRequests || []).map(req => (
                    <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', color: 'white' }}>{req.name}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <div style={{ color: 'var(--color-saffron)' }}>📞 {req.phone}</div>
                        {req.email && <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>✉️ {req.email}</div>}
                      </td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)', maxWidth: '300px' }}>
                        {req.query || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>No message provided</span>}
                      </td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: '12px', 
                          fontSize: '0.85rem',
                          background: req.status === 'Resolved' ? 'rgba(19, 136, 8, 0.2)' : 'rgba(220, 20, 60, 0.2)',
                          color: req.status === 'Resolved' ? 'var(--color-emerald)' : '#ff6b6b'
                        }}>
                          {req.status}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px', display: 'flex', gap: '10px' }}>
                        {req.status === 'Pending' && (
                          <button 
                            onClick={() => updateCallbackStatus(req.id, 'Resolved')}
                            style={{ background: 'var(--color-emerald)', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            Mark Resolved
                          </button>
                        )}
                        {req.status === 'Resolved' && (
                          <button 
                            onClick={() => updateCallbackStatus(req.id, 'Pending')}
                            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            Re-open
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {(!callbackRequests || callbackRequests.length === 0) && (
                     <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-dim)' }}>No callback requests found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hero Images Section */}
        {activeTab === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Global Logo Setting */}
            <div className="glass-panel" style={{ padding: '30px', borderLeft: '4px solid var(--color-emerald)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Global Hero Logo</h2>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '5px' }}>This image appears in the center of the geometric circle on the landing page.</p>
                </div>
                {siteSettings.find(s => s.setting_name === 'hero_logo')?.setting_value && (
                  <img 
                    src={siteSettings.find(s => s.setting_name === 'hero_logo').setting_value} 
                    alt="Current Logo" 
                    style={{ height: '60px', objectFit: 'contain', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '8px' }} 
                  />
                )}
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const file = new FormData(e.target).get('logoFile');
                if (file && file.size > 0) {
                  const url = await uploadImageToAppwrite(file);
                  if (url) {
                    await upsertSiteSetting('hero_logo', url);
                    e.target.reset();
                    alert('Logo updated successfully!');
                  }
                }
              }} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <input name="logoFile" type="file" accept="image/*" required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
                </div>
                <button type="submit" disabled={isUploading} className="glass-button" style={{ background: 'var(--color-emerald)', padding: '12px 20px' }}>
                  {isUploading ? 'Uploading...' : 'Update Logo'}
                </button>
              </form>
            </div>

            <div className="glass-panel" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Hero Slider Images</h2>
                <button onClick={() => setAddingHero(true)} className="glass-button" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>+ Add Image</button>
              </div>
              <div style={{ overflowX: 'auto', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {(!heroImages || heroImages.length === 0) && <p style={{ color: 'var(--text-dim)' }}>No hero images found. Add some to display on the landing page.</p>}
                {(heroImages || []).map(img => (
                  <div key={img.id} style={{ position: 'relative', width: '250px', height: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={img.url} alt={img.title || 'Hero'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '8px', fontSize: '0.85rem', textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                       {img.title || 'Untitled'}
                    </div>
                    <button onClick={() => { if(window.confirm('Delete this image?')) deleteHeroImage(img.id); }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(220,20,60,0.8)', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Blogs Section */}
        {activeTab === 'blogs' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Manage Blogs</h2>
              <button onClick={() => setAddingBlog(true)} className="glass-button" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>+ Add Blog</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    <th style={{ padding: '15px 10px' }}>Title</th>
                    <th style={{ padding: '15px 10px' }}>Date</th>
                    <th style={{ padding: '15px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(blogs || []).map(blog => (
                    <tr key={blog.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px 10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={blog.image} alt="blog" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{blog.title}</span>
                      </td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-dim)' }}>{blog.date}</td>
                      <td style={{ padding: '15px 10px', display: 'flex', gap: '10px' }}>
                        <button onClick={() => setEditingBlog(blog)} style={{ background: 'var(--color-saffron)', color: '#000', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                          Edit
                        </button>
                        <button onClick={() => {
                          if (window.confirm('Delete this blog?')) deleteBlog(blog.id);
                        }} style={{ background: 'rgba(220,20,60,0.2)', color: '#ff6b6b', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {(!blogs || blogs.length === 0) && (
                     <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No blogs found.</td></tr>
                  )}
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
                const uploadedUrl = await uploadImageToAppwrite(imageFile);
                if (uploadedUrl) imageUrl = uploadedUrl;
              }

              const pkgData = {
                title: formData.get('title'),
                price: parseFloat(formData.get('price')),
                duration: formData.get('duration'),
                description: formData.get('description'),
                destination: formData.get('destination'),
                included: formData.get('included') || '',
                popular: formData.get('popular') === 'on',
                image: imageUrl || 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Add placeholder if no image provided to avoid broken UI early on
              };

              if (editingPkg) {
                await updatePackage(editingPkg.id, pkgData);
                setEditingPkg(null);
              } else {
                pkgData.featured = false;
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
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Destination</label>
                <input name="destination" defaultValue={editingPkg ? editingPkg.destination : ''} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Features/Included (Comma separated)</label>
                <input name="included" defaultValue={editingPkg ? editingPkg.included : ''} placeholder="5 Days / 4 Nights, 4-Star Accommodation, Daily Breakfast" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" name="popular" id="popular" defaultChecked={editingPkg ? editingPkg.popular : false} style={{ width: '20px', height: '20px', accentColor: 'var(--color-saffron)', cursor: 'pointer' }} />
                <label htmlFor="popular" style={{ color: 'var(--text-dim)', cursor: 'pointer' }}>Mark as "Most Popular" on the Home Page</label>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Package Image {editingPkg && '(Leave blank to keep current)'}</label>
                <input name="imageFile" type="file" accept="image/*" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
                <small style={{ color: 'var(--text-dim)' }}>Optional. A default placeholder will be used if left blank.</small>
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
                const uploadedUrl = await uploadImageToAppwrite(mainImageFile);
                if (uploadedUrl) mainImageUrl = uploadedUrl;
              }
              
              let previousGallery = editingDest && editingDest.media_slides ? editingDest.media_slides : [];
              const galleryFiles = formData.getAll('galleryImages');
              let newGalleryUrls = previousGallery;
              
              const validGalleryFiles = Array.from(galleryFiles).filter(f => f.size > 0);
              if (validGalleryFiles.length > 0) {
                  const uploadPromises = validGalleryFiles.map(f => uploadImageToAppwrite(f));
                  const results = await Promise.all(uploadPromises);
                  newGalleryUrls = results.filter(url => url !== null);
              }
              
              const destData = {
                name: formData.get('name'),
                description: formData.get('description'),
                tags: tagsArray,
                image: mainImageUrl,
                media_slides: newGalleryUrls
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
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--color-emerald)', fontWeight: 'bold' }}>Gallery Array (Discover More Slideshow)</label>
                <input name="galleryImages" type="file" multiple accept="image/*" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,153,51,0.3)', color: 'white', borderRadius: '5px' }} />
                <small style={{ color: 'var(--text-dim)' }}>Select multiple images to create the destination's 3D photo slideshow.</small>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Description</label>
                <textarea name="description" defaultValue={editingDest ? editingDest.description : ''} rows={3} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Tags (Comma separated)</label>
                <input name="tags" defaultValue={editingDest ? (editingDest.tags || []).join(', ') : ''} placeholder="Mountains, Nature" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={isUploading} className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>{isUploading ? 'Uploading...' : 'Save Changes'}</button>
                <button type="button" className="glass-button" onClick={() => { setEditingDest(null); setAddingDest(false); }} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Hero Image Modal */}
      {addingHero && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '400px', padding: '30px', position: 'relative' }}>
            <h2 style={{ marginBottom: '20px' }}>Add Hero Image</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              
              const imageFile = formData.get('imageFile');
              if (!imageFile || imageFile.size === 0) {
                  alert('Please select an image.');
                  return;
              }
              const uploadedUrl = await uploadImageToAppwrite(imageFile);
              if (uploadedUrl) {
                  await addHeroImage({
                      url: uploadedUrl,
                      title: formData.get('title') || ''
                  });
                  setAddingHero(false);
              } else {
                  alert('Failed to upload image.');
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Title (Optional)</label>
                <input name="title" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Image File</label>
                <input name="imageFile" type="file" accept="image/*" required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={isUploading} className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>{isUploading ? 'Uploading...' : 'Upload'}</button>
                <button type="button" className="glass-button" onClick={() => setAddingHero(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Blog Modal */}
      {(editingBlog || addingBlog) && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="glass-panel" style={{ width: '700px', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px' }}>{editingBlog ? 'Edit Blog' : 'Add Blog'}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              
              let mainImageUrl = editingBlog ? editingBlog.image : '';
              const mainImageFile = formData.get('mainImageFile');
              if (mainImageFile && mainImageFile.size > 0) {
                const uploadedUrl = await uploadImageToAppwrite(mainImageFile);
                if (uploadedUrl) mainImageUrl = uploadedUrl;
              }
              
              const blogData = {
                title: formData.get('title'),
                content: formData.get('content'),
                image: mainImageUrl,
              };

              if (editingBlog) {
                await updateBlog(editingBlog.id, blogData);
                setEditingBlog(null);
              } else {
                await addBlog(blogData);
                setAddingBlog(false);
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Blog Title</label>
                <input name="title" defaultValue={editingBlog ? editingBlog.title : ''} required style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', fontSize: '1.1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Cover Image {editingBlog && '(Leave blank to keep current)'}</label>
                <input name="mainImageFile" type="file" accept="image/*" required={!editingBlog} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-dim)' }}>Blog Content</label>
                <textarea name="content" defaultValue={editingBlog ? editingBlog.content : ''} rows={12} required style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '5px', resize: 'vertical', fontSize: '1rem', lineHeight: '1.5' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={isUploading} className="glass-button" style={{ flex: 1, background: 'var(--color-emerald)', color: 'white', padding: '12px' }}>{isUploading ? 'Uploading...' : 'Save Blog'}</button>
                <button type="button" className="glass-button" onClick={() => { setEditingBlog(null); setAddingBlog(false); }} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      </main>
    </div>
  );
};

export default AdminDashboard;
