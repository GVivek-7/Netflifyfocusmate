import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateJaccardSimilarity } from '../lib/utils';
import Chat from './Chat';

interface Profile {
  id: string;
  name: string;
  subjects: string[];
}

interface Match extends Profile {
  similarity: number;
}

const MatchResults = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  
  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Get current user's profile
      const { data: currentProfile, error: profileError } = await supabase
        .from('profiles')
        .select('subjects')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Get all other profiles
      const { data: otherProfiles, error: othersError } = await supabase
        .from('profiles')
        .select('id, name, subjects')
        .neq('id', user.id);

      if (othersError) throw othersError;

      // Calculate similarity scores
      const matchesWithScores = otherProfiles.map((profile: Profile) => ({
        ...profile,
        similarity: calculateJaccardSimilarity(
          new Set(currentProfile.subjects),
          new Set(profile.subjects)
        )
      }));

      // Sort by similarity score
      matchesWithScores.sort((a, b) => b.similarity - a.similarity);

      setMatches(matchesWithScores);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const startChat = async (matchId: string) => {
    try {
      // Create a new chat room
      const { data: room, error: roomError } = await supabase
        .from('chat_rooms')
        .insert({})
        .select()
        .single();

      if (roomError) throw roomError;

      setSelectedRoomId(room.id);
      setShowChat(true);
    } catch (err) {
      console.error('Error creating chat room:', err);
    }
  };

  if (loading) {
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
          <Users className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Your Study Matches</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {matches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No matches found. Try updating your profile with more subjects!
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{match.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {match.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Match Score:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {(match.similarity * 100).toFixed(0)}%
                      </span>
                    </div>
                    <button
                      onClick={() => startChat(match.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showChat && selectedRoomId && (
        <Chat roomId={selectedRoomId} onClose={() => {
          setShowChat(false);
          setSelectedRoomId(null);
        }} />
      )}
    </div>
  );
};

export default MatchResults;