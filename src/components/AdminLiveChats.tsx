import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const AdminLiveChats = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'chats'), orderBy('updatedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setChats(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db || !selectedChat) return;
    const q = query(collection(db, 'chats', selectedChat.id, 'messages'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [selectedChat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat || !db) return;
    
    await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
      text: inputText,
      senderId: selectedChat.studentId, // Sending AS Bhavya or Pragya
      isUser: false, // The profile is sending it, not the "user"
      timestamp: serverTimestamp()
    });
    
    await updateDoc(doc(db, 'chats', selectedChat.id), {
      updatedAt: serverTimestamp()
    });
    
    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-200px)] glass-card rounded-xl border border-white/10 overflow-hidden">
      {/* Sidebar: Chats List */}
      <div className="w-1/3 border-r border-white/10 flex flex-col bg-[#1e0f10]/80">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-white font-bold text-sm">Live User Chats</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${selectedChat?.id === chat.id ? 'bg-[#5edda8]/20' : 'hover:bg-white/5'}`}
            >
              <p className="text-white font-bold text-sm">{chat.userName} & {chat.studentName}</p>
              <p className="text-[#e3bebd] text-xs mt-1">Intercepting as: {chat.studentName}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1e0f10]">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Chat with {selectedChat.userName}</h3>
                <p className="text-[#5edda8] text-xs font-mono font-bold">Acting as: {selectedChat.studentName}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isUser ? 'items-start' : 'items-end'}`}>
                  <div className={`px-4 py-2 rounded-2xl text-sm ${msg.isUser ? 'bg-white/10 text-[#f9dcdb] rounded-bl-none' : 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white rounded-br-none'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/40 mt-1">{msg.isUser ? selectedChat.userName : selectedChat.studentName}</span>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={`Type a message as ${selectedChat.studentName}...`}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5edda8] focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-[#5edda8] text-black font-bold cursor-pointer">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#e3bebd]">
            Select a live chat to intercept and message as the profile.
          </div>
        )}
      </div>
    </div>
  );
};
