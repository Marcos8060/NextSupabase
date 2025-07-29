'use client'
import { createContext, useState, useEffect } from "react";
import client from "@/api/client";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // set user if client is authenticated
    client.auth.getSession().then(({ data }) => {
      setUser(data.session.user || null);
      setLoading(false);
    });

    // always know of any logins by the user
    const { data: listener } = client.auth.onAuthStateChange((e, session) => {
      setUser(session.user || null);
    });

    // stop listening to auth events when component unmounts
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <AuthProvider value={{ user, loading }}>{children}</AuthProvider>;
};

export { AuthContext, AuthProvider };
