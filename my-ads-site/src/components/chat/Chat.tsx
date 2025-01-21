"use client"
import { useState } from 'react';
import { parseCookies } from 'nookies';
import { getUserIdFromToken } from '@/services/jwt-utils';
import { sendMessage } from '@/services/api';

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

const Chat = ({ adId, receiverId }: { adId: string, receiverId: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cookies = parseCookies();
    const token = cookies.token;
    const userId = token ? getUserIdFromToken(token) : null;

    if (!userId) {
      setError('Utilisateur non authentifié');
      setIsLoading(false);
      return;
    }

    if (newMessage.trim()) {
      const message: ChatMessage = {
        sender: userId,
        message: newMessage,
        timestamp: new Date().toLocaleString(),
      };

      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');

      try {
        console.log(userId, "Utilisateur connecté")
        console.log(receiverId),
        console.log(adId),
        console.log(message),
        await sendMessage({
          senderId: userId,
          receiverId,
          adId,
          message: newMessage,
        });
      } catch (error) {
        setError('Erreur lors de l\'envoi du message');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <strong>{msg.sender}</strong> <span className="text-gray-500 text-sm">{msg.timestamp}</span>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Écrivez votre message..."
        />
        <button
          onClick={handleButtonClick}
          className="bg-indigo-600 text-white p-2 rounded-r-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
