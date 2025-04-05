"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type ChatInterfaceProps = {
  agentId: string
  agentName: string
}

export function ChatInterface({ agentId, agentName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hello! I'm the ${agentName}. How can I assist you today?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate response based on agent type
      let responseContent = ""

      switch (agentId) {
        case "quality":
          responseContent = `As the Quality Agent, I've carefully analyzed your query: "${input}". Here's a comprehensive response that addresses all aspects of your question...`
          break
        case "flkh":
          responseContent = `FLKH Agent response: Based on technical analysis of "${input}", I can provide the following efficient solution...`
          break
        case "omni":
          responseContent = `I'm coordinating with multiple specialized agents to address: "${input}". Here's what our collective intelligence has determined...`
          break
        default:
          responseContent = `Thank you for your message. I'll help you with "${input}" right away.`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[60px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

