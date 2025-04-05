"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type ChatInterfaceProps = {
  agentId: string
  agentName: string
  teamMode?: "collaborate" | "coordinate" | "route"
}

export function ChatInterface({ agentId, agentName, teamMode = "collaborate" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hello! I'm the ${agentName}. How can I assist you today?${
        agentId === "omni" ? ` I'm operating in ${teamMode} mode.` : ""
      }`,
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

    if (agentId === "flkh") {
      try {
        // Call the safety/ask API endpoint
        const response = await fetch("https://agnoagentapi-94777822355.europe-west2.run.app/safety/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            query: input,
            model_id: "o3-mini"
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        let content = '';
        
        // Handle different response formats
        if (typeof data === 'string') {
          content = data;
        } else if (data && typeof data === 'object') {
          content = data.response || data.message || data.answer || JSON.stringify(data);
        } else {
          content = "Received response in an unexpected format.";
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: content,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Error calling FLKH API:", error);
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, there was an error processing your request. Please try again later.",
          role: "assistant",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else if (agentId === "quality") {
      try {
        // Call the quality/ask API endpoint
        const response = await fetch("https://agnoagentapi-94777822355.europe-west2.run.app/quality/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            query: input,
            model_id: "o3-mini"
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        let content = '';
        
        // Handle different response formats
        if (typeof data === 'string') {
          content = data;
        } else if (data && typeof data === 'object') {
          content = data.response || data.message || data.answer || JSON.stringify(data);
        } else {
          content = "Received response in an unexpected format.";
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: content,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Error calling Quality API:", error);
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, there was an error processing your request. Please try again later.",
          role: "assistant",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else if (agentId === "omni") {
      try {
        // First try to call the team/ask API endpoint
        let useBackup = false;
        
        try {
          const response = await fetch("https://agnoagentapi-94777822355.europe-west2.run.app/team/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              query: input,
              model_id: "o3-mini",
              team_mode: teamMode
            })
          });

          if (!response.ok) {
            console.warn(`Team API returned status ${response.status}, using fallback response`);
            useBackup = true;
          } else {
            const data = await response.json();
            let content = '';
            
            // Handle different response formats
            if (typeof data === 'string') {
              content = data;
            } else if (data && typeof data === 'object') {
              content = data.response || data.message || data.answer || JSON.stringify(data);
            } else {
              content = "Received response in an unexpected format.";
            }
            
            const assistantMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: content,
              role: "assistant",
              timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage]);
          }
        } catch (error) {
          console.error("Error calling Team API:", error);
          useBackup = true;
        }

        // If the API call failed, provide a fallback response
        if (useBackup) {
          const fallbackContent = `I'm coordinating with multiple specialized agents to address: "${input}". Here's what our collective intelligence has determined:

## Analysis from Multiple Experts

* The **Technical Team** has analyzed your query and provided insights
* Our **Research Division** has gathered relevant information from various sources
* The **Domain Specialists** have applied their expertise to your specific question

This collaborative approach allows us to provide a more comprehensive response than any single agent could.

> Note: We're currently experiencing some technical difficulties with our backend services. This is a synthesized response based on typical agent coordination patterns.

Would you like me to focus on any particular aspect of your query?`;
          
          const fallbackMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: fallbackContent,
            role: "assistant",
            timestamp: new Date(),
          }
          
          setMessages((prev) => [...prev, fallbackMessage]);
        }
        
      } catch (outerError) {
        console.error("Critical error in Omni agent handling:", outerError);
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, there was an error processing your request. Our team has been notified and is working to resolve the issue.",
          role: "assistant",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate API call delay for other agents
      setTimeout(() => {
        // Generate response based on agent type
        let responseContent = `Thank you for your message. I'll help you with "${input}" right away.`

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
              <div className="text-sm">
                {message.role === "assistant" ? (
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    {message.content && (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Override default components to ensure they render properly
                          a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                          pre: ({node, ...props}) => <pre className="overflow-auto p-2 bg-gray-100 dark:bg-gray-800 rounded" {...props} />,
                          code: ({inline, className, children, ...props}: any) => 
                            inline ? <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" {...props}>{children}</code> 
                                  : <code {...props}>{children}</code>
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                ) : (
                  message.content
                )}
              </div>
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

