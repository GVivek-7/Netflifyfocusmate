import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'History', 'Literature', 'Economics',
  'Psychology', 'Philosophy', 'Art History', 'Political Science'
];

const ProfileSetup = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadExistingProfile();
  }, []);

  const loadExistingProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('name, subjects')
        .eq('id', user.id);

      if (profileError) throw profileError;

      if (profiles && profiles.length > 0) {
        const profile = profiles[0];
        setName(profile.name);
        setSelectedSubjects(new Set(profile.subjects));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setInitialLoading(false);
    }
  };

  const toggleSubject = (subject: string) => {
    const newSubjects = new Set(selectedSubjects);
    if (newSubjects.has(subject)) {
      newSubjects.delete(subject);
    } else {
      newSubjects.add(subject);
    }
    setSelectedSubjects(newSubjects);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      if (!name.trim()) {
        throw new Error('Name is required');
      }

      if (selectedSubjects.size === 0) {
        throw new Error('Please select at least one subject');
      }

      const profile = {
        id: user.id,
        name: name.trim(),
        subjects: Array.from(selectedSubjects)
      };

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert(profile);

      if (upsertError) throw upsertError;

      navigate('/matches');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Set Up Your Study Profile</h1>
        </div>
        
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Subjects
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors
                    ${selectedSubjects.has(subject)
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                      : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                    }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;