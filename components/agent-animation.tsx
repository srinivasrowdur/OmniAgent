"use client"

import { useEffect, useRef } from "react"

export function AgentAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      return { width: rect.width, height: rect.height }
    }

    const { width, height } = setCanvasDimensions()

    // Create agent nodes
    const mainAgent = {
      x: width / 2,
      y: height / 2,
      radius: 40,
      color: "hsl(221, 83%, 53%)", // primary color
      label: "OmniAgent",
    }

    const specializedAgents = [
      { x: width / 4, y: height / 4, radius: 25, color: "hsl(262, 83%, 58%)", label: "Research" },
      { x: (width * 3) / 4, y: height / 4, radius: 25, color: "hsl(142, 76%, 36%)", label: "Code" },
      { x: width / 4, y: (height * 3) / 4, radius: 25, color: "hsl(346, 84%, 61%)", label: "Content" },
      { x: (width * 3) / 4, y: (height * 3) / 4, radius: 25, color: "hsl(48, 96%, 53%)", label: "Data" },
    ]

    // Animation variables
    let animationFrameId: number
    let pulseSize = 0
    const pulseOpacity = 0.8
    let pulseDirection = 1
    let connectionOpacity = 0
    let connectionDirection = 0.01
    const dataParticles: {
      x: number
      y: number
      targetIndex: number
      progress: number
      speed: number
      sourceIndex?: number
    }[] = []

    // Create data particles
    const createDataParticles = () => {
      if (Math.random() > 0.95) {
        const targetIndex = Math.floor(Math.random() * specializedAgents.length)
        dataParticles.push({
          x: mainAgent.x,
          y: mainAgent.y,
          targetIndex,
          progress: 0,
          speed: 0.01 + Math.random() * 0.02,
          sourceIndex: -1, // -1 indicates main agent as source
        })
      }

      // Return data from specialized agents to main agent
      if (Math.random() > 0.97) {
        const sourceIndex = Math.floor(Math.random() * specializedAgents.length)
        const source = specializedAgents[sourceIndex]
        dataParticles.push({
          x: source.x,
          y: source.y,
          targetIndex: -1, // -1 indicates main agent as target
          progress: 0,
          speed: 0.01 + Math.random() * 0.02,
          sourceIndex,
        })
      }
    }

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Update pulse animation
      pulseSize += 0.5 * pulseDirection
      if (pulseSize > 20) pulseDirection = -1
      if (pulseSize < 0) pulseDirection = 1

      // Update connection opacity
      connectionOpacity += 0.005 * connectionDirection
      if (connectionOpacity > 0.8) connectionDirection = -1
      if (connectionOpacity < 0.2) connectionDirection = 1

      // Draw connections
      specializedAgents.forEach((agent) => {
        ctx.beginPath()
        ctx.moveTo(mainAgent.x, mainAgent.y)
        ctx.lineTo(agent.x, agent.y)
        ctx.strokeStyle = `rgba(150, 150, 150, ${connectionOpacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Create and update data particles
      createDataParticles()

      // Draw data particles
      dataParticles.forEach((particle, index) => {
        particle.progress += particle.speed

        let targetX, targetY
        if (particle.targetIndex === -1) {
          // Target is main agent
          targetX = mainAgent.x
          targetY = mainAgent.y
        } else {
          // Target is specialized agent
          const target = specializedAgents[particle.targetIndex]
          targetX = target.x
          targetY = target.y
        }

        // Calculate current position
        const currentX = particle.x + (targetX - particle.x) * particle.progress
        const currentY = particle.y + (targetY - particle.y) * particle.progress

        // Draw particle - Fix the color logic
        ctx.beginPath()
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)

        // Correctly determine the color based on direction
        let particleColor
        if (particle.targetIndex === -1) {
          // Going to main agent, use specialized agent color
          particleColor = specializedAgents[particle.sourceIndex!].color
        } else {
          // Going to specialized agent, use main agent color
          particleColor = mainAgent.color
        }

        ctx.fillStyle = particleColor
        ctx.fill()

        // Remove particles that have reached their target
        if (particle.progress >= 1) {
          dataParticles.splice(index, 1)
        }
      })

      // Draw main agent with pulse
      ctx.beginPath()
      ctx.arc(mainAgent.x, mainAgent.y, mainAgent.radius + pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = `${mainAgent.color}20` // 20 is hex for low opacity
      ctx.fill()

      ctx.beginPath()
      ctx.arc(mainAgent.x, mainAgent.y, mainAgent.radius, 0, Math.PI * 2)
      ctx.fillStyle = mainAgent.color
      ctx.fill()

      // Draw main agent label
      ctx.font = "bold 14px sans-serif"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(mainAgent.label, mainAgent.x, mainAgent.y)

      // Draw specialized agents
      specializedAgents.forEach((agent) => {
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, agent.radius, 0, Math.PI * 2)
        ctx.fillStyle = agent.color
        ctx.fill()

        // Draw agent label
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(agent.label, agent.x, agent.y)
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    // Handle window resize
    const handleResize = () => {
      const { width: newWidth, height: newHeight } = setCanvasDimensions()

      // Update positions
      mainAgent.x = newWidth / 2
      mainAgent.y = newHeight / 2

      specializedAgents[0].x = newWidth / 4
      specializedAgents[0].y = newHeight / 4

      specializedAgents[1].x = (newWidth * 3) / 4
      specializedAgents[1].y = newHeight / 4

      specializedAgents[2].x = newWidth / 4
      specializedAgents[2].y = (newHeight * 3) / 4

      specializedAgents[3].x = (newWidth * 3) / 4
      specializedAgents[3].y = (newHeight * 3) / 4
    }

    window.addEventListener("resize", handleResize)

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-[400px] rounded-xl" style={{ maxWidth: "600px" }} />
}

