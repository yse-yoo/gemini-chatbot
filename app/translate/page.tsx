'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
    role: string;
    content: string;
}

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        translate();
    }, []);

    const translate = () => {
        if ('webkitSpeechRecognition' in window) {
            const speechRecognition = new (window as any).webkitSpeechRecognition();
            speechRecognition.continuous = false;
            speechRecognition.interimResults = false;
            speechRecognition.lang = 'ja-JP';

            speechRecognition.onstart = () => {
                setIsListening(true);
            };

            speechRecognition.onend = () => {
                setIsListening(false);
            };

            speechRecognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleSubmit(transcript);
            };
            setRecognition(speechRecognition);
        } else {
            alert('Web Speech API is not supported in this browser.');
        }
    }

    const handleVoiceInput = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const handleSubmit = async (userMessage: string) => {
        if (!userMessage) return;

        setMessages(prevMessages => [...prevMessages, { role: 'user', content: userMessage }]);

        try {
            const res = await axios.post('/api/translate', { userMessage });
            setMessages(prevMessages => [...prevMessages, { role: 'bot', content: res.data.translate }]);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <div className="p-4 mb-4 overflow-y-scroll">
            <h1>会話アプリ</h1>
            <button onClick={handleVoiceInput} className="p-2 bg-blue-500 text-white rounded mt-4">
                {isListening ? 'Listening...' : '音声入力'}
            </button>
            <div>
                {messages && messages.map((message, index) => (
                    <div
                        key={index}
                        className={`m-3 p-5 rounded-lg shadow-md
                        ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100  text-gray-800'}
                    `}>
                        <span className=
                            {`inline-block mb-2 me-3 px-3 py-1 
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
        </div>
    );
}
