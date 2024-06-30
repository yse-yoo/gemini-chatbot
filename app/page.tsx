'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <h1 className="text-2xl p-3">Gemini Chatbot</h1>

      <div className="mt-3">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white p-2 rounded">Send</button>
      </div>

    </main>
  );
}
