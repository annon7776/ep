"use client"

import { useState, useEffect } from "react"
import { getCustomersData, updateVerificationStatus, removeCustomer } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Users, CheckCircle, Clock, DollarSign, Search, RefreshCw, Trash2, Edit, Shield } from "lucide-react"
import type { Customer } from "@/lib/database"
import { Header } from "@/components/header"

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [stats, setStats] = useState({
    total_verifications: 0,
    verified_customers: 0,
    pending_review: 0,
    avg_balance: 0,
  })
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  useEffect(() => {
    loadData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterCustomers()
  }, [customers, activeFilter, searchQuery])

  async function loadData() {
    setIsLoading(true)
    try {
      const result = await getCustomersData()
      if (result.success) {
        setCustomers(result.customers)

        // Calculate stats from customers data
        const totalVerifications = result.customers.length
        const verifiedCustomers = result.customers.filter((c) => c.verification_status === "verified").length
        const pendingReview = result.customers.filter((c) => c.verification_status === "pending").length
        const avgBalance =
          result.customers.length > 0
            ? result.customers.reduce((sum, c) => sum + c.current_balance, 0) / result.customers.length
            : 0

        setStats({
          total_verifications: totalVerifications,
          verified_customers: verifiedCustomers,
          pending_review: pendingReview,
          avg_balance: avgBalance,
        })
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    }
    setIsLoading(false)
  }

  function filterCustomers() {
    let filtered = customers

    if (activeFilter !== "all") {
      filtered = filtered.filter((customer) => customer.verification_status === activeFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (customer) =>
          customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.account_number.includes(searchQuery),
      )
    }

    setFilteredCustomers(filtered)
  }

  async function handleStatusUpdate(id: number, status: "pending" | "verified" | "rejected") {
    const result = await updateVerificationStatus(id, status, adminNotes)
    if (result.success) {
      loadData()
      setSelectedCustomer(null)
      setAdminNotes("")
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this customer record?")) {
      const result = await removeCustomer(id)
      if (result.success) {
        loadData()
      }
    }
  }

  function exportData() {
    const csvContent = [
      ["Name", "Account Number", "Balance", "Status", "Created At", "Security Comment"].join(","),
      ...filteredCustomers.map((customer) =>
        [
          customer.full_name,
          customer.account_number,
          customer.current_balance,
          customer.verification_status,
          new Date(customer.created_at).toLocaleDateString(),
          customer.security_comment || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `easypaisa-customers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Enhanced Header */}
      <Header
        variant="admin"
        showHomeLink={true}
        title="Admin Dashboard"
        subtitle="Real-time verification management"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-blue-700">Total Verifications</CardTitle>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{stats.total_verifications}</div>
              <p className="text-xs text-blue-600 mt-1">
                {stats.total_verifications === 0 ? "No submissions yet" : "All time submissions"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-green-700">Verified Customers</CardTitle>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{stats.verified_customers}</div>
              <p className="text-xs text-green-600 mt-1">Successfully approved</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-amber-700">Average Balance</CardTitle>
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-700">
                Rs{Math.round(stats.avg_balance).toLocaleString()}
              </div>
              <p className="text-xs text-amber-600 mt-1">Verified customers only</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-orange-700">Pending Review</CardTitle>
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">{stats.pending_review}</div>
              <p className="text-xs text-orange-600 mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name or account number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  onClick={() => setActiveFilter("all")}
                  className={`${
                    activeFilter === "all"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "border-2 border-gray-200 hover:bg-gray-50"
                  } px-6 py-2 font-semibold rounded-lg shadow-sm`}
                >
                  All ({customers.length})
                </Button>
                <Button
                  variant={activeFilter === "verified" ? "default" : "outline"}
                  onClick={() => setActiveFilter("verified")}
                  className={`${
                    activeFilter === "verified"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-2 border-gray-200 hover:bg-gray-50"
                  } px-6 py-2 font-semibold rounded-lg shadow-sm`}
                >
                  Verified ({customers.filter((c) => c.verification_status === "verified").length})
                </Button>
                <Button
                  variant={activeFilter === "pending" ? "default" : "outline"}
                  onClick={() => setActiveFilter("pending")}
                  className={`${
                    activeFilter === "pending"
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "border-2 border-gray-200 hover:bg-gray-50"
                  } px-6 py-2 font-semibold rounded-lg shadow-sm`}
                >
                  Pending ({customers.filter((c) => c.verification_status === "pending").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Customer Management Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
            <CardTitle className="flex items-center text-xl">
              <Users className="w-6 h-6 mr-3" />
              Customer Verification Management
            </CardTitle>
            <CardDescription className="text-emerald-100 text-base">
              Review and approve customer verifications • Auto-refresh every 30 seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <RefreshCw className="w-8 h-8 animate-spin mr-3 text-emerald-600" />
                <span className="text-lg text-gray-600">Loading customer data...</span>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {searchQuery ? "No matching customers found" : "No verifications yet"}
                </h3>
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "Try adjusting your search terms or filters"
                    : "Customer verification requests will appear here"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Customer Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Account Info
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div>
                            <div className="text-base font-semibold text-gray-900">{customer.full_name}</div>
                            {customer.security_comment && (
                              <div className="text-sm text-gray-500 truncate max-w-xs mt-1">
                                {customer.security_comment}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{customer.account_number}</div>
                            <div className="text-lg font-bold text-emerald-600">
                              Rs{customer.current_balance.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <Badge
                            className={`px-3 py-1 text-sm font-semibold ${
                              customer.verification_status === "verified"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : customer.verification_status === "pending"
                                  ? "bg-orange-100 text-orange-800 border border-orange-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {customer.verification_status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                          {new Date(customer.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedCustomer(customer)
                                    setAdminNotes(customer.admin_notes || "")
                                  }}
                                  className="shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-xl">Update Verification Status</DialogTitle>
                                  <DialogDescription className="text-base">
                                    Review and update the verification status for {customer.full_name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div>
                                    <Label className="text-base font-semibold">Current Status</Label>
                                    <Badge
                                      className={`ml-3 px-3 py-1 ${
                                        customer.verification_status === "verified"
                                          ? "bg-green-100 text-green-800"
                                          : customer.verification_status === "pending"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {customer.verification_status.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Label htmlFor="adminNotes" className="text-base font-semibold">
                                      Admin Notes
                                    </Label>
                                    <Textarea
                                      id="adminNotes"
                                      value={adminNotes}
                                      onChange={(e) => setAdminNotes(e.target.value)}
                                      placeholder="Add notes about this verification decision..."
                                      rows={4}
                                      className="mt-2 border-2 border-gray-200 focus:border-emerald-500"
                                    />
                                  </div>
                                </div>
                                <DialogFooter className="flex gap-3 pt-4">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleStatusUpdate(customer.id, "rejected")}
                                    className="border-red-200 text-red-700 hover:bg-red-50"
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleStatusUpdate(customer.id, "pending")}
                                    className="border-orange-200 text-orange-700 hover:bg-orange-50"
                                  >
                                    Mark Pending
                                  </Button>
                                  <Button
                                    onClick={() => handleStatusUpdate(customer.id, "verified")}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                  >
                                    Approve
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(customer.id)}
                              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 shadow-sm hover:shadow-md transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="mt-12 text-center text-gray-500">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Badge variant="outline" className="bg-white border-gray-200 px-3 py-1">
              <Shield className="w-4 h-4 mr-2" />
              Secure Admin Panel
            </Badge>
            <Badge variant="outline" className="bg-white border-gray-200 px-3 py-1">
              <CheckCircle className="w-4 h-4 mr-2" />
              Real-time Updates
            </Badge>
          </div>
          <p className="text-lg">
            © 2024 EasyPaisa Admin Dashboard. All rights reserved. |
            <span className="text-emerald-600 ml-2 font-semibold">System Status: Online</span>
          </p>
        </div>
      </main>
    </div>
  )
}
