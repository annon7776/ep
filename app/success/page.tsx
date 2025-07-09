"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, CreditCard, Smartphone, Gift } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <Header
            showHomeLink={true}
            title="Verification Complete"
            subtitle="Your account has been successfully verified"
          />
        </div>

        <Card className="shadow-2xl text-center border-0 overflow-hidden">
          <CardContent className="p-10">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Verification Successful!</h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Congratulations! Your EasyPaisa account has been successfully verified. You can now enjoy all the benefits
              of your debit card.
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-emerald-800 mb-4 text-lg">🎉 What's Next?</h3>
              <ul className="text-emerald-700 space-y-3 text-left">
                <li className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-3 text-emerald-600" />
                  Your debit card will be activated within 24 hours
                </li>
                <li className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-3 text-emerald-600" />
                  You'll receive an SMS confirmation shortly
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-emerald-600" />
                  Start using your card for transactions immediately
                </li>
                <li className="flex items-center">
                  <Gift className="w-5 h-5 mr-3 text-emerald-600" />
                  Enjoy cashless payments and ATM withdrawals
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-4 text-lg font-bold rounded-xl shadow-lg"
              >
                <Home className="w-5 h-5 mr-3" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-gray-500">
          <p className="text-lg">Need help? Contact EasyPaisa customer support</p>
          <p className="font-bold text-emerald-600 text-xl">111-123-456</p>
        </div>
      </div>
    </div>
  )
}
