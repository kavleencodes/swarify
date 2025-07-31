// src/components/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(); // ✅ Named export

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Helper hook (optional, but recommended)
export function useAuth() {
  return useContext(AuthContext);
}
