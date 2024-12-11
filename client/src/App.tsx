import { useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { triggerRAG } from "./api";
import TypingBubble from "./TypingBubble";

function App() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState("Brayden");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages([...messages, { role: "user", content: input }]);
    const prompt = input;
    setInput("");

    setIsTyping(true);

    await triggerRAG(prompt, currentUser, conversationId).then((response) => {
      if (response.conversation_id) {
        setConversationId(response.conversation_id);
      }
      setIsTyping(false);
      const { bot_response } = response;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: bot_response },
      ]);
    });
  };

  return (
    <>
      {/* Main Container */}
      <div className="bg-zinc-800 h-screen flex flex-col items-center">
        {/* Header: Title and User Selection Buttons */}
        <div className="w-full flex flex-col items-center py-4">
          <div className="flex justify-center items-center text-white w-[90%] relative">
            <h1 className="text-4xl">NLP RAG Project</h1>
            <div className="absolute right-0 flex space-x-2">
              <button
                onClick={() => setCurrentUser("Brayden")}
                className={`px-2 py-1 text-sm rounded-full ${
                  currentUser === "Brayden"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
              >
                Brayden
              </button>
            </div>
          </div>
        </div>

        {/* Message Display Area (just below the title) */}
        <div className="flex flex-col items-center w-[90%] max-h-[75vh] overflow-y-auto p-4 mt-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-2 w-full`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && <TypingBubble />}
        </div>

        {/* Fixed Footer with Input Bar and Creator Text */}
        <div className="w-full fixed bottom-0 bg-zinc-800">
          <div className="w-full flex justify-center mb-2">
            <div className="w-[90%] px-4 py-2 bg-zinc-900 rounded-full flex items-center">
              <input
                type="text"
                placeholder="Message Chatbot"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow bg-transparent text-white border-none focus:outline-none px-2"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-gray-600 flex justify-center items-center rounded-full ml-2"
              >
                <FiArrowUp className="text-white" />
              </button>
            </div>
          </div>

          {/* Creator Text */}
          <p className="text-gray-400 text-center mb-4">
            Created by Brayden Christensen
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
