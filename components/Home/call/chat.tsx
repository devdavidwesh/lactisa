"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Send, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema } from "@/schemas/message";
import { z } from "zod";
import { sendMessage, getMessages } from "@/actions/userdashboard";
import toast from "react-hot-toast";
import { format } from "date-fns";

type MessageType = z.infer<typeof MessageSchema>;

interface Message {
  id: string;
  sender: string;
  text: string;
  createdAt: Date;
}

const ChatWidget = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const user = useCurrentUser();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "welcome",
      sender: "Lactisa", 
      text: "Welcome! Please leave us a message and we shall get to you as soon as possible.",
      createdAt: new Date() 
    },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageType>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });

  // Fetch messages when component mounts or when session changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (session?.user?.email) {
        try {
          const userMessages = await getMessages(session?.user?.id);
          if (userMessages) {
            setMessages(prev => [
              prev[0], // Keep the welcome message
              ...userMessages.map(msg  => ({
                id: msg.id,
                sender: msg.sender,
                text: msg.message,
                createdAt: new Date(msg.createdAt)
              }))
            ]);
          }
        } catch {
          console.error("Failed to fetch messages:");
        }
      }
    };

    fetchMessages();
  }, [session]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const onSubmit = async (data: MessageType) => {
      // Optimistically add the new message to local state
      const newMessage = {
        id: Date.now().toString(), // Temporary ID
        sender: session?.user?.name || "Guest",
        text: data.message,
        createdAt: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      reset();

      // Send to server
      const result = await sendMessage({
        message: data.message,
      });

      if (result.error) {
        toast.error(result.error);
        // Remove the optimistic message if there was an error
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      } else if (result.success) {
        toast.success("Message sent successfully!");
      }else {
      toast.error("Failed to send message:");
      }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primaryFade transition"
      >
        <MessageCircle size={20} />
        <span>Hello, 👋 We are here!</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="w-80 bg-white shadow-lg rounded-lg mt-2 p-4 border border-gray-200 flex flex-col"
        >
          <div className="h-80 overflow-y-auto p-2 space-y-4">
            {session ? (
              messages.map((msg) => (
                <div key={msg.id}>
                  <div
                    className={`flex ${
                      msg.sender === "Lactisa"
                        ? "items-start"
                        : "items-end justify-end"
                    }`}
                  >
                    {msg.sender === "Lactisa" && (
                      <Image
                        src="/logo.jpeg"
                        alt="Lactisa"
                        className="w-8 h-8 rounded-full mr-2"
                        width={20}
                        height={20}
                      />
                    )}
                    <div
                      className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                        msg.sender === "Lactisa"
                          ? "bg-gray-200 text-gray-800"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender !== "Lactisa" && (
                      <div className="ml-2 flex items-center justify-center w-8 h-8 bg-primary text-white text-xs font-bold rounded-full">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "Lactisa" ? "text-left" : "text-right"
                    } text-gray-500`}
                  >
                    {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/support.jpg"
                  width={1000}
                  height={1000}
                  alt="support"
                  className="w-32 h-32"
                />
                <Link
                  href="/auth/login"
                  className="text-white p-2 rounded-lg bg-primary"
                >
                  Please login to proceed
                </Link>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {session && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-2 border-t pt-2"
            >
              <input
                type="text"
                className={`flex-1 p-2 border rounded-lg focus:outline-none ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="Type a message..."
                {...register("message")}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary p-2 text-white rounded-r-lg hover:bg-primaryFade disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          )}
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
