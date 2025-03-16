// import React, { useState, useEffect, useRef } from 'react';
// import { MessageSquare, Send, Minimize2, Maximize2 } from 'lucide-react';
// import { supabase } from '../lib/supabase';

// interface Message {
//   id: string;
//   sender: string;
//   content: string;
//   timestamp: Date;
//   room_id: string;
// }

// interface ChatProps {
//   roomId: string;
//   onClose: () => void;
// }

// const Chat: React.FC<ChatProps> = ({ roomId, onClose }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isMinimized, setIsMinimized] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     // Subscribe to new messages
//     const channel = supabase
//       .channel(`room:${roomId}`)
//       .on('postgres_changes', {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'messages',
//         filter: `room_id=eq.${roomId}`,
//       }, 
//       (payload) => {
//         const newMessage = payload.new as Message;
//         setMessages(prev => [...prev, newMessage]);
//       })
//       .subscribe();

//     // Fetch existing messages
//     const fetchMessages = async () => {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('room_id', roomId)
//         .order('timestamp', { ascending: true });

//       if (error) {
//         console.error('Error fetching messages:', error);
//         return;
//       }

//       setMessages(data || []);
//     };

//     fetchMessages();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [roomId]);

//   const sendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const { data: user } = await supabase.auth.getUser();
//     if (!user.user) return;

//     const message = {
//       content: newMessage,
//       room_id: roomId,
//       sender: user.user.id,
//       timestamp: new Date(),
//     };

//     const { error } = await supabase
//       .from('messages')
//       .insert([message]);

//     if (error) {
//       console.error('Error sending message:', error);
//       return;
//     }

//     setNewMessage('');
//   };

//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized);
//   };

//   return (
//     <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ${
//       isMinimized ? 'h-14 w-64' : 'w-96 h-[500px]'
//     }`}>
//       <div className="p-4 border-b flex items-center justify-between bg-indigo-600 rounded-t-lg">
//         <div className="flex items-center">
//           <MessageSquare className="h-5 w-5 text-white mr-2" />
//           <h2 className="text-lg font-semibold text-white">Chat</h2>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={toggleMinimize}
//             className="text-white hover:text-gray-200 focus:outline-none"
//           >
//             {isMinimized ? (
//               <Maximize2 className="h-4 w-4" />
//             ) : (
//               <Minimize2 className="h-4 w-4" />
//             )}
//           </button>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-200 focus:outline-none"
//           >
//             ×
//           </button>
//         </div>
//       </div>

//       {!isMinimized && (
//         <>
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex flex-col ${
//                   message.sender === supabase.auth.user()?.id ? 'items-end' : 'items-start'
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] rounded-lg p-3 ${
//                     message.sender === supabase.auth.user()?.id
//                       ? 'bg-indigo-600 text-white'
//                       : 'bg-gray-100 text-gray-900'
//                   }`}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//                 <span className="text-xs text-gray-500 mt-1">
//                   {new Date(message.timestamp).toLocaleTimeString()}
//                 </span>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <form onSubmit={sendMessage} className="p-4 border-t">
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <Send className="h-5 w-5" />
//               </button>
//             </div>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Minimize2, Maximize2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  room_id: string;
}

interface ChatProps {
  roomId: string;
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ roomId, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      if (data) {
        setMessages(data);
      }
    };

    fetchCurrentUser();
    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [roomId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserId) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            content: newMessage.trim(),
            room_id: roomId,
            sender: currentUserId
          }
        ]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ${
        isMinimized ? 'h-14 w-64' : 'w-96 h-[500px]'
      }`}
    >
      <div className="p-4 border-b flex items-center justify-between bg-indigo-600 rounded-t-lg">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 text-white mr-2" />
          <h2 className="text-lg font-semibold text-white">Chat</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMinimize}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            ×
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.sender === currentUserId ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === currentUserId
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm break-words">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Chat;
