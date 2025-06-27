"use client"

import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export function SessionStatus() {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <Badge variant="secondary" className="fixed bottom-4 right-4 z-50">
        <WifiOff className="mr-1 h-3 w-3" />
        Connecting...
      </Badge>
    )
  }

  if (status === "authenticated") {
    return (
      <Badge variant="default" className="fixed bottom-4 right-4 z-50 bg-green-500">
        <Wifi className="mr-1 h-3 w-3" />
        Connected
      </Badge>
    )
  }

  return null
}
