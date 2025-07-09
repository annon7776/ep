"use client"

import { EasyPaisaLogo } from "./easypaisa-logo"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Shield, Home } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  showHomeLink?: boolean
  variant?: "default" | "admin"
  title?: string
  subtitle?: string
}

export function Header({ showHomeLink = false, variant = "default", title, subtitle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (variant === "admin") {
    return (
      <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-xl border-b border-emerald-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <EasyPaisaLogo width={120} height={40} variant="white" clickable={true} mobile={true} />
              <div className="hidden sm:block border-l-2 border-white/30 pl-3 sm:pl-4 min-w-0">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-base sm:text-xl font-bold text-white truncate">{title || "Admin Dashboard"}</h1>
                    <p className="text-emerald-100 text-xs hidden sm:block truncate">
                      {subtitle || `Real-time verification management • ${new Date().toLocaleTimeString()}`}
                    </p>
                  </div>
                </div>
              </div>
              {/* Mobile title */}
              <div className="sm:hidden min-w-0 flex-1">
                <h1 className="text-sm font-bold text-white truncate">Admin Dashboard</h1>
              </div>
            </div>

            {/* Right side - Status and Actions */}
            <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
              <Badge className="bg-white/20 text-white border-white/30 px-1.5 sm:px-3 py-0.5 sm:py-1 text-xs">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                <span className="hidden sm:inline">System Online</span>
                <span className="sm:hidden">Online</span>
              </Badge>
              {showHomeLink && (
                <Button
                  variant="outline"
                  asChild
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-xs px-2 py-1 sm:px-4 sm:py-2"
                >
                  <a href="/">
                    <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Home</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center min-w-0 flex-1">
            <EasyPaisaLogo width={140} height={47} clickable={true} mobile={true} />
            {title && (
              <div className="ml-3 sm:ml-6 min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg font-bold text-gray-900 truncate">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-gray-600 truncate">{subtitle}</p>}
              </div>
            )}
          </div>

          {/* Right side - Navigation */}
          {showHomeLink && (
            <div className="flex items-center flex-shrink-0">
              <Button
                variant="outline"
                asChild
                className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 touch-manipulation bg-transparent"
              >
                <a href="/">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Home</span>
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
