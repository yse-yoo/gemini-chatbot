'use client';

import { useState, useRef, useEffect } from "react";
import { Message } from "./interfaces/Message";
import axios from "axios";

export default function Home() {
    const [inputMessage, setInputMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const changeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setInputMessage(e.target.value);
    };

    const sendHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (inputMessage.trim() === '') return;

        const userMessage: Message = { role: 'user', content: inputMessage };
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
        <main className="flex flex-col justify-center">
            <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
                <h1 className="text-2xl p-5">Gemini Chatbot</h1>
                <div className="flex">
                    <input
                        onChange={changeMessageHandler}
                        value={inputMessage}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-l mr-0"
                        placeholder="Type your message..."
                    />
                    <button
                        className="w-1/6 bg-blue-500 text-white p-2 rounded-r"
                        onClick={sendHandler}>
                        Send
                    </button>
                </div>
            </div>
            <div className="pt-32 p-4 mb-4 overflow-y-scroll">
                {messages && messages.map((message, index) => (
                    <div
                        key={index}
                        className="m-3 p-5 border border-gray-100 rounded">
                        <span className={
                            `inline-block mb-2 me-3 px-3 py-1 
                             rounded-full text-white 
                             text-sm font-semibold
                             ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-600'}
                            `}>
                            {message.role === 'user' ? 'あなた' : 'ボット'}
                        </span>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
            <div ref={messagesEndRef} />
        </main>
    );
}
