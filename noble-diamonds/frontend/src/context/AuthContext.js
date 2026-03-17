import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nd_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/me');
      setUser(data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('nd_token', data.token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password, phone });
    localStorage.setItem('nd_token', data.token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('nd_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const toggleWishlist = async (productId) => {
    const { data } = await axios.put('/api/auth/wishlist/' + productId);
    setUser(prev => ({ ...prev, wishlist: data.wishlist }));
    return data.wishlist;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, toggleWishlist, isAdmin: user && user.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
