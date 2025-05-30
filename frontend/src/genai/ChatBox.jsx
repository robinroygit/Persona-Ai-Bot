import { useState } from 'react';
import axios from 'axios';

export default function PodcastChat() {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
  
    const userQ = input.trim();
    setInput('');
    setConversation((prev) => [
      ...prev,
      { role: 'user', text: `🧑‍💻 You: ${userQ}` },
    ]);
    setLoading(true);
  
    try {
      const res = await axios.post('/api/user/chat-bot', { message: userQ });
      const botReplyArray = res.data.reply;
  
      if (Array.isArray(botReplyArray) && botReplyArray.length > 0) {
        const replies = botReplyArray[0]
          .split('Hitesh sir:')
          .join('|Hitesh sir:')
          .split('Piyush sir:')
          .join('|Piyush sir:')
          .split('|')
          .filter(Boolean);
  
        const formattedReplies = replies.map((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('Hitesh sir')) {
            return { role: 'hitesh', text: `🎙️ Hitesh Sir: ${trimmed.replace('Hitesh sir:', '').trim()}` };
          } else if (trimmed.startsWith('Piyush sir')) {
            return { role: 'piyush', text: `🎙️ Piyush Sir: ${trimmed.replace('Piyush sir:', '').trim()}` };
          } else {
            return { role: 'bot', text: `🎙️ ${trimmed}` };
          }
        });
  
        setConversation((prev) => [...prev, ...formattedReplies]);
      }
    } catch (err) {
      console.error(err);
      setConversation((prev) => [
        ...prev,
        {
          role: 'bot',
          text: '⚠️ Podcast: Sorry, something went wrong. Try again later.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAsk();
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 rounded-xl shadow-xl bg-zinc-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-700">
        🎧 Chai Aur Code – Podcast Q&A
      </h1>

      <div className="space-y-4 h-96 overflow-y-auto mb-6 border border-amber-800 p-4 rounded-md bg-gray-90">
        {conversation.map((entry, idx) => (
          <p
            key={idx}
            className={`text-sm leading-relaxed ${
              entry.role === 'user' ? 'text-gray-200' : 'text-green-700'
            }`}
          >
            {entry.text}
          </p>
        ))}
        {loading && (
          <p className="text-green-500 text-sm">🎙️ typing...</p>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Ask a question like you're talking to them..."
          className="flex-1 border bg-gray-700 text-white border-amber-800 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAsk}
          className="bg-amber-700 text-white px-5 py-2 rounded-r-md hover:bg-amber-800 transition"
          disabled={loading}
        >
          Ask
        </button>
      </div>
    </div>
  );
}
