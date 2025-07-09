"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, CreditCard, Smartphone, Gift } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-lg">
        {/* Ultra Mobile-First Header */}
        <div className="mb-4 sm:mb-6">
          <Header
            showHomeLink={true}
            title="Verification Complete"
            subtitle="Your account has been successfully verified"
          />
        </div>

        <Card className="shadow-2xl text-center border-0 overflow-hidden mx-2 sm:mx-0">
          <CardContent className="p-4 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Verification Successful!</h2>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed px-1">
              Congratulations! Your EasyPaisa account has been successfully verified. You can now enjoy all the benefits
              of your debit card.
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-3 sm:p-5 mb-4 sm:mb-6">
              <h3 className="font-bold text-emerald-800 mb-2 sm:mb-3 text-sm sm:text-base">🎉 What's Next?</h3>
              <ul className="text-emerald-700 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-center text-xs sm:text-sm">
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  Your debit card will be activated within 24 hours
                </li>
                <li className="flex items-center text-xs sm:text-sm">
                  <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  You'll receive an SMS confirmation shortly
                </li>
                <li className="flex items-center text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  Start using your card for transactions immediately
                </li>
                <li className="flex items-center text-xs sm:text-sm">
                  <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-600 flex-shrink-0" />
                  Enjoy cashless payments and ATM withdrawals
                </li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-lg shadow-lg active:scale-95 transition-all touch-manipulation"
              >
                <Home className="w-4 h-4 mr-2 flex-shrink-0" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6 text-gray-500 px-4">
          <p className="text-sm sm:text-base">Need help? Contact EasyPaisa customer support</p>
          <p className="font-bold text-emerald-600 text-base sm:text-lg">111-123-456</p>
        </div>
      </div>
    </div>
  )
}
