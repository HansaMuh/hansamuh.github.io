"use client"

import React, {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react"

import { cn } from "@/lib/utils"

interface MousePosition {
  x: number
  y: number
}

function MousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return mousePosition
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
  /** Local addition: link particles (and the cursor) closer than this many px. 0 = off. */
  linkDistance?: number
  /** Local addition: each particle slowly pulses brighter and dimmer. */
  twinkle?: boolean
  /** Local addition: opacity band the particles settle into. */
  minAlpha?: number
  maxAlpha?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(hex, 16)
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
  phase: number
  twinkleSpeed: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  linkDistance = 0,
  twinkle = false,
  minAlpha = 0.15,
  maxAlpha = 0.7,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mousePosition = MousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const hasMouse = useRef(false)
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const rafID = useRef<number | null>(null)
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
  const initCanvasRef = useRef<() => void>(() => {})
  const onMouseMoveRef = useRef<() => void>(() => {})
  const animateRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvasRef.current()
    animateRef.current()

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvasRef.current()
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current)
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [color])

  useEffect(() => {
    onMouseMoveRef.current()
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    initCanvasRef.current()
  }, [refresh])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = mousePosition.x - rect.left - w / 2
      const y = mousePosition.y - rect.top - h / 2
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
        hasMouse.current = true
      }
    }
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight

      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)

      // Clear existing particles and create new ones with exact quantity
      circles.current = []
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams()
        drawCircle(circle)
      }
    }
  }

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    // Local change: one crisp radius (no random jitter) keeps dots from looking soft.
    const pSize = size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * (maxAlpha - minAlpha) + minAlpha).toFixed(2))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    const phase = Math.random() * Math.PI * 2
    const twinkleSpeed = 0.0008 + Math.random() * 0.0017
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
      phase,
      twinkleSpeed,
    }
  }

  const rgb = hexToRgb(color)

  const drawCircle = (circle: Circle, update = false, drawAlpha = circle.alpha) => {
    if (context.current) {
      const { x, y, translateX, translateY, size } = circle
      const alpha = drawAlpha
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      // Local change: whole device pixels, so the dots land sharp instead of blurred.
      const snap = (value: number) => Math.round(value * dpr) / dpr
      context.current.arc(snap(x), snap(y), size, 0, 2 * Math.PI)
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      )
    }
  }

  const drawParticles = () => {
    clearContext()
    const particleCount = quantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  // Local addition: thin lines between nearby particles, and from particles to the cursor.
  const drawLinks = (alphas: number[]) => {
    const ctx = context.current
    if (!ctx || linkDistance <= 0) return
    const points = circles.current.map((c) => ({ x: c.x + c.translateX, y: c.y + c.translateY }))
    ctx.lineWidth = 0.7
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y)
        if (dist >= linkDistance) continue
        const strength = (1 - dist / linkDistance) * Math.min(alphas[i], alphas[j])
        ctx.strokeStyle = `rgba(${rgb.join(", ")}, ${strength * 0.8})`
        ctx.beginPath()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[j].x, points[j].y)
        ctx.stroke()
      }
    }
    if (!hasMouse.current) return
    const cursor = {
      x: mouse.current.x + canvasSize.current.w / 2,
      y: mouse.current.y + canvasSize.current.h / 2,
    }
    const reach = linkDistance * 1.6
    points.forEach((point, i) => {
      const dist = Math.hypot(point.x - cursor.x, point.y - cursor.y)
      if (dist >= reach) return
      ctx.strokeStyle = `rgba(${rgb.join(", ")}, ${(1 - dist / reach) * alphas[i]})`
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(cursor.x, cursor.y)
      ctx.stroke()
    })
  }

  const animate = () => {
    clearContext()
    const now = performance.now()
    circles.current.forEach((circle: Circle, i: number) => {
      // Local change: no fade near the edges, so the field covers the whole screen.
      circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease

      const drawAlpha = twinkle
        ? circle.alpha * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * circle.twinkleSpeed + circle.phase)))
        : circle.alpha
      drawCircle(circle, true, drawAlpha)

      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        // remove the circle from the array
        circles.current.splice(i, 1)
        // create a new circle
        const newCircle = circleParams()
        drawCircle(newCircle)
      }
    })
    if (linkDistance > 0) {
      drawLinks(
        circles.current.map((c) =>
          twinkle
            ? c.alpha * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * c.twinkleSpeed + c.phase)))
            : c.alpha
        )
      )
    }
    rafID.current = window.requestAnimationFrame(animateRef.current)
  }

  initCanvasRef.current = initCanvas
  onMouseMoveRef.current = onMouseMove
  animateRef.current = animate

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
