import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// Cache for storing responses to avoid duplicate API calls
const responseCache = new Map();

// Throttling variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

export default function FloatingChatbot({ apiKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to make API call with throttling
  const callOpenRouter = async (prompt) => {
    // Check cache first
    const cacheKey = prompt.trim().toLowerCase();
    if (responseCache.has(cacheKey)) {
      console.log("Using cached response");
      return responseCache.get(cacheKey);
    }

    // Implement throttling
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => 
        setTimeout(resolve, MIN_REQUEST_INTERVAL - (now - lastRequestTime))
      );
    }
    
    lastRequestTime = Date.now();

    try {
      console.log("Making API request to OpenRouter");
      
      // Use fetch API directly
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: prompt }],
          //max_tokens:150
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const message = typeof errorData.error === 'string'
          ? errorData.error
          : JSON.stringify(errorData.error || errorData || 'API request failed');
        throw new Error(message);
      }
      
      const data = await response.json();
      const result = data.choices[0].message.content.trim();
      
      // Cache the result
      responseCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error("Error calling API:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: inputText };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    // Store input value and clear input field
    const currentInput = inputText + " in atmost 100 words";
    setInputText('');
    
    try {
      // Call the API
      const response = await callOpenRouter(currentInput);
      
      // Add assistant message to chat
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      const errorMessage = { 
        role: 'system', 
        content: `Sorry, there was an error: ${error.message || 'Unknown error'}`
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Function to render message content with proper formatting
  const renderMessage = (content) => {
    return content.split('\n').map((line, i) => (
      <p key={i} className="my-1">{line || ' '}</p> // Empty lines get a space to maintain formatting
    ));
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col overflow-hidden transition-all duration-300 ease-in-out min-h-[35rem] min-w-[25rem]">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">Chat Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 ${message.role === 'user' ? 'text-right' : message.role === 'system' ? 'text-center' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-2 rounded-lg max-w-xs ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-bl-none' 
                      : message.role === 'system'
                        ? 'bg-yellow-400 text-gray-800 italic'
                        : 'bg-gray-200 text-gray-800 rounded-br-none'
                  }`}
                >
                  {renderMessage(message.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-br-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t p-3 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className={`px-3 rounded-r-lg flex items-center justify-center ${
                isLoading || !inputText.trim() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}