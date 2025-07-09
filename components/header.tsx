import { EasyPaisaLogo } from "./easypaisa-logo"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Shield, Home } from "lucide-react"

interface HeaderProps {
  showHomeLink?: boolean
  variant?: "default" | "admin"
  title?: string
  subtitle?: string
}

export function Header({ showHomeLink = false, variant = "default", title, subtitle }: HeaderProps) {
  if (variant === "admin") {
    return (
      <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-xl border-b border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-6">
              <EasyPaisaLogo width={160} height={53} variant="white" />
              <div className="border-l-2 border-white/30 pl-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{title || "Admin Dashboard"}</h1>
                    <p className="text-emerald-100 text-sm">
                      {subtitle || `Real-time verification management • ${new Date().toLocaleTimeString()}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Status and Actions */}
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
              {showHomeLink && (
                <Button
                  variant="outline"
                  asChild
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <a href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Home
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <EasyPaisaLogo width={180} height={60} />
            {title && (
              <div className="ml-6 border-l-2 border-gray-200 pl-6">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
              </div>
            )}
          </div>

          {/* Right side - Navigation */}
          {showHomeLink && (
            <Button variant="outline" asChild className="shadow-sm bg-white/80 backdrop-blur-sm">
              <a href="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
