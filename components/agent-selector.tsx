"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChatInterface } from "@/components/chat-interface"

type Agent = {
  id: string
  name: string
  description: string
  color: string
}

const agents: Agent[] = [
  {
    id: "quality",
    name: "Quality Agent",
    description: "Specialized in providing high-quality, well-researched responses with attention to detail.",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: "flkh",
    name: "FLKH Agent",
    description: "Focused on fast, efficient responses with specialized knowledge in technical domains.",
    color: "bg-green-100 border-green-300",
  },
  {
    id: "omni",
    name: "Omni Agent",
    description: "Coordinates with multiple specialized agents to provide comprehensive responses to complex queries.",
    color: "bg-purple-100 border-purple-300",
  },
]

export function AgentSelector() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [chatStarted, setChatStarted] = useState(false)

  const handleAgentSelect = (value: string) => {
    setSelectedAgent(value)
    setChatStarted(false)
  }

  const startChat = () => {
    if (selectedAgent) {
      setChatStarted(true)
    }
  }

  const resetSelection = () => {
    setChatStarted(false)
  }

  if (chatStarted && selectedAgent) {
    const agent = agents.find((a) => a.id === selectedAgent)!

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${agent.id === "quality" ? "bg-blue-500" : agent.id === "flkh" ? "bg-green-500" : "bg-purple-500"}`}
            ></div>
            <h2 className="text-xl font-semibold">{agent.name}</h2>
          </div>
          <Button variant="outline" size="sm" onClick={resetSelection}>
            Change Agent
          </Button>
        </div>

        <ChatInterface agentId={selectedAgent} agentName={agent.name} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedAgent || ""} onValueChange={handleAgentSelect} className="space-y-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedAgent === agent.id ? agent.color : "hover:bg-muted"
            }`}
            onClick={() => handleAgentSelect(agent.id)}
          >
            <RadioGroupItem value={agent.id} id={agent.id} className="mt-1" />
            <div className="space-y-1">
              <Label htmlFor={agent.id} className="text-base font-medium cursor-pointer">
                {agent.name}
              </Label>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <Button onClick={startChat} disabled={!selectedAgent} className="w-full">
        Start Chat
      </Button>
    </div>
  )
}

