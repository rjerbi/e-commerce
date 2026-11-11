import { useEffect, useState } from "react";
import api from "../api";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatError, setChatError] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatbot_messages");

    if (!savedMessages) {
      return [];
    }

    try {
      const parsedMessages = JSON.parse(savedMessages);
      return Array.isArray(parsedMessages)
        ? parsedMessages.filter(
            (item) =>
              item &&
              ["user", "model"].includes(item.role) &&
              typeof item.text === "string" &&
              !(
                item.role === "model" &&
                [
                  "Sorry, I couldn't process your request right now.",
                  "Sorry, I couldn't generate a response.",
                  "message and sessionId are required"
                ].includes(item.text)
              )
          )
        : [];
    } catch (error) {
      console.error("Error loading chat:", error);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatbot_messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();
    setChatError("");
    const conversation = [
      ...messages,
      { role: "user", text: userMessage }
    ];
    setMessages(conversation);
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/chat", {
        message: userMessage,
        history: conversation
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: response.data.reply
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage =
        error.response &&
        error.response.data &&
        error.response.data.error;

      setChatError(
        errorMessage || "Sorry, I couldn't process your request right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    localStorage.removeItem("chatbot_messages");
    setMessages([]);
    setChatError("");
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div>
              <h3>Tunixo AI Assistant</h3>
              <span>Online</span>
            </div>

            <div className="chatbot-header-actions">
              <button
                onClick={clearChat}
                title="Clear conversation"
              >
                🗑
              </button>

              <button onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <strong>Hello! 👋</strong>
                <p>
                  I'm your AI shopping assistant.
                  Ask me about our products!
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "message user-message"
                    : "message bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {chatError && (
              <div className="message bot-message" role="alert">
                {chatError}
              </div>
            )}

            {loading && (
              <div className="message bot-message">
                Thinking...
              </div>
            )}
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Ask about a product..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
