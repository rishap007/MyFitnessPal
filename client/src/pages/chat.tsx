import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, MicOff } from "lucide-react";

const suggestedPrompts = [
  "How do I do squats properly?",
  "Can you adjust my meal plan?",
  "What's the best way to warm up?",
  "I'm feeling sore, what should I do?",
];

const initialMessages = [
  {
    role: "assistant",
    content: "Hi! I'm your AI Fitness Coach. I'm here to help you with workouts, nutrition, and any fitness questions you have. What would you like to know?",
    time: "10:00 AM",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: "Great question! Let me help you with that. [This is a demo response. In the full app, this will be powered by OpenAI to provide real coaching advice.]",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log("Voice recording:", !isRecording);
  };

  const useSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display uppercase mb-1">
              AI Coach Chat
            </h1>
            <p className="text-muted-foreground">
              Your personal fitness assistant
            </p>
          </div>
          <Badge variant="secondary" className="h-7">
            Online
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => useSuggestedPrompt(prompt)}
                  data-testid={`button-prompt-${index}`}
                  className="text-sm"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback
                className={
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }
              >
                {message.role === "assistant" ? "AI" : "JD"}
              </AvatarFallback>
            </Avatar>
            <div className={`flex-1 max-w-2xl ${message.role === "user" ? "text-right" : ""}`}>
              <Card
                className={`inline-block p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
              <p className="text-xs text-muted-foreground mt-1 px-1">
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything about fitness..."
            className="flex-1"
            data-testid="input-chat-message"
          />
          <Button
            size="icon"
            variant={isRecording ? "default" : "outline"}
            onClick={toggleRecording}
            data-testid="button-voice-record"
          >
            {isRecording ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim()}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
