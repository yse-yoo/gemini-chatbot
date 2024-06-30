'use client';

import { useState } from "react";
import { Message } from "./interfaces/Message";
import axios from "axios";

export default function Home() {
    const [inputMessage, setInputMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const changeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setInputMessage(e.target.value);
    };

    const sendHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (inputMessage.trim() === '') return;

        const userMessage: Message = { sender: 'user', content: inputMessage };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        try {
            const response = await axios.post('/api/chat', userMessage);
            const botMessage = response.data;
            setMessages([...updatedMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInputMessage('');
    };

    return (
        <main className="flex flex-col justify-center p-6">
            <h1 className="text-2xl p-3">Gemini Chatbot</h1>

            <div className="mt-3">
                <input
                    onChange={changeMessageHandler}
                    value={inputMessage}
                    type="text"
                    className="w-full flex-grow p-2 border border-gray-300 rounded mr-2"
                    placeholder="Type your message..."
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={sendHandler}>
                    Send
                </button>
            </div>

            <div className="p-4 mb-4 overflow-y-scroll">
                {messages && messages.map((message, index) => (
                    <div
                        key={index}
                        className={`m-3 p-5 border border-gray-100 rounded
                            ${message.sender === 'user' ?
                                'text-right text-blue-600' :
                                'text-left text-gray-600'}
                            `}
                    >
                        <span>{message.sender}</span>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>

        </main>
    );
}
