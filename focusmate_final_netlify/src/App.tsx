import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfileSetup from './components/ProfileSetup';
import MatchResults from './components/MatchResults';
import Auth from './components/Auth';
import { GraduationCap } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar session={session} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/profile"
            element={
              session ? <ProfileSetup /> : <Navigate to="/auth" replace />
            }
          />
          <Route
            path="/matches"
            element={
              session ? <MatchResults /> : <Navigate to="/auth" replace />
            }
          />
          <Route
            path="/auth"
            element={!session ? <Auth /> : <Navigate to="/profile" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;