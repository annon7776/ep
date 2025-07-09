"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getCustomersData, updateVerificationStatus, removeCustomer } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, CheckCircle, Clock, DollarSign, Search, RefreshCw, Edit, Trash2 } from "lucide-react"
import type { Customer } from "@/lib/database"
import { Header } from "@/components/header"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AdminDashboard() {
  /* ------------------------------------------------------------------ */
  /*  STATE                                                             */
  /* ------------------------------------------------------------------ */
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [stats, setStats] = useState({
    total_verifications: 0,
    verified_customers: 0,
    pending_review: 0,
    avg_balance: 0,
  })
  const [activeFilter, setActiveFilter] = useState<"all" | "verified" | "pending">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  /* modal */
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  /* ------------------------------------------------------------------ */
  /*  EFFECTS                                                           */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 3_000) // auto-refresh
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterCustomers()
  }, [customers, activeFilter, searchQuery])

  /* ------------------------------------------------------------------ */
  /*  HELPERS                                                           */
  /* ------------------------------------------------------------------ */
  async function loadData() {
    setIsLoading(true)
    const res = await getCustomersData()
    if (res.success) {
      setCustomers(res.customers)
      /* derive stats */
      const total = res.customers.length
      const verified = res.customers.filter((c) => c.verification_status === "verified").length
      const pending = res.customers.filter((c) => c.verification_status === "pending").length
      const avg = total > 0 ? res.customers.reduce((s, c) => s + c.current_balance, 0) / total : 0
      setStats({
        total_verifications: total,
        verified_customers: verified,
        pending_review: pending,
        avg_balance: avg,
      })
    }
    setIsLoading(false)
  }

  function filterCustomers() {
    let list = customers
    if (activeFilter !== "all") {
      list = list.filter((c) => c.verification_status === activeFilter)
    }
    if (searchQuery) {
      list = list.filter(
        (c) => c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || c.account_number.includes(searchQuery),
      )
    }
    setFilteredCustomers(list)
  }

  async function handleStatusChange(id: number, status: "verified" | "pending" | "rejected") {
    const res = await updateVerificationStatus(id, status, adminNotes)
    if (res.success) {
      setSelectedCustomer(null)
      setAdminNotes("")
      loadData()
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Delete this record?")) {
      const res = await removeCustomer(id)
      if (res.success) loadData()
    }
  }

  /* ------------------------------------------------------------------ */
  /*  RENDER                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header
        variant="admin"
        showHomeLink
        title="Admin Dashboard"
        subtitle="Real-time verification management • Auto-refresh every 3 seconds"
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {/* ───────────────────────── Stats ───────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <StatCard
            title="Total Verifications"
            icon={<Users className="w-5 h-5 text-white" />}
            gradient="from-blue-50 to-blue-100"
            color="text-blue-700"
            value={stats.total_verifications}
          />
          <StatCard
            title="Verified Customers"
            icon={<CheckCircle className="w-5 h-5 text-white" />}
            gradient="from-green-50 to-emerald-100"
            color="text-green-700"
            value={stats.verified_customers}
          />
          <StatCard
            title="Average Balance"
            icon={<DollarSign className="w-5 h-5 text-white" />}
            gradient="from-yellow-50 to-amber-100"
            color="text-amber-700"
            value={`Rs${Math.round(stats.avg_balance).toLocaleString()}`}
          />
          <StatCard
            title="Pending Review"
            icon={<Clock className="w-5 h-5 text-white" />}
            gradient="from-orange-50 to-red-100"
            color="text-orange-700"
            value={stats.pending_review}
          />
        </div>

        {/* ───────────────────── Search & Filters ────────────────── */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or account number…"
                  className="pl-10 h-10 sm:h-12"
                />
              </div>
              <FilterButton
                active={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
                label={`All (${customers.length})`}
              />
              <FilterButton
                active={activeFilter === "verified"}
                onClick={() => setActiveFilter("verified")}
                label={`Verified (${customers.filter((c) => c.verification_status === "verified").length})`}
              />
              <FilterButton
                active={activeFilter === "pending"}
                onClick={() => setActiveFilter("pending")}
                label={`Pending (${customers.filter((c) => c.verification_status === "pending").length})`}
              />
            </div>
          </CardContent>
        </Card>

        {/* ───────────────────── Customer List ──────────────────── */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 sm:p-6 text-white">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Users className="w-5 h-5" />
              Customer Verification Management
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">Auto-refreshes every 3 seconds</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <EmptyState icon={<RefreshCw className="animate-spin" />} text="Loading…" />
            ) : filteredCustomers.length === 0 ? (
              <EmptyState icon={<Users />} text="No records found" />
            ) : (
              <>
                {/* mobile cards */}
                <div className="sm:hidden divide-y">
                  {filteredCustomers.map((c) => (
                    <MobileCustomerCard
                      key={c.id}
                      customer={c}
                      onEdit={() => {
                        setSelectedCustomer(c)
                        setAdminNotes(c.admin_notes || "")
                      }}
                      onDelete={() => handleDelete(c.id)}
                    />
                  ))}
                </div>

                {/* desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <Th>Customer</Th>
                        <Th>Account</Th>
                        <Th>Status</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <Td>
                            <div className="font-medium">{c.full_name}</div>
                            {c.security_comment && (
                              <div className="text-gray-500 truncate max-w-xs">{c.security_comment}</div>
                            )}
                          </Td>
                          <Td>
                            <div className="text-gray-900">{c.account_number}</div>
                            <div className="font-bold text-emerald-600">Rs{c.current_balance.toLocaleString()}</div>
                          </Td>
                          <Td>
                            <StatusBadge status={c.verification_status} />
                          </Td>
                          <Td className="whitespace-nowrap text-gray-500">
                            {new Date(c.created_at).toLocaleDateString()}
                          </Td>
                          <Td>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedCustomer(c)
                                  setAdminNotes(c.admin_notes || "")
                                }}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(c.id)}
                                className="border-red-200 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* ───────────────────── Modal ──────────────────── */}
      {selectedCustomer && (
        <Dialog open onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Verification Status</DialogTitle>
              <DialogDescription>
                Review and update&nbsp;
                <span className="font-semibold">{selectedCustomer.full_name}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label className="block mb-1 font-medium">Current Status</Label>
                <StatusBadge status={selectedCustomer.verification_status} />
              </div>

              <div>
                <Label htmlFor="notes" className="block mb-1 font-medium">
                  Admin Notes
                </Label>
                <Textarea id="notes" rows={4} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => handleStatusChange(selectedCustomer.id, "rejected")}
                className="border-red-200 text-red-700"
              >
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusChange(selectedCustomer.id, "pending")}
                className="border-orange-200 text-orange-700"
              >
                Mark Pending
              </Button>
              <Button
                onClick={() => handleStatusChange(selectedCustomer.id, "verified")}
                className="bg-emerald-600 text-white"
              >
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

/* ───────────────────────── Reusable Pieces ───────────────────────── */

function StatCard({
  title,
  icon,
  gradient,
  color,
  value,
}: {
  title: string
  icon: React.ReactNode
  gradient: string
  color: string
  value: number | string
}) {
  return (
    <Card className={`shadow-lg border-0 bg-gradient-to-br ${gradient}`}>
      <CardHeader className="flex items-center justify-between p-3 sm:p-4 pb-1">
        <CardTitle className={`text-xs sm:text-sm font-semibold ${color}`}>{title}</CardTitle>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-opacity-80 rounded-lg flex items-center justify-center bg-current">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className={`font-bold ${color} text-xl sm:text-3xl`}>{value}</div>
      </CardContent>
    </Card>
  )
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className={`px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm ${
        active ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      {label}
    </Button>
  )
}

function StatusBadge({ status }: { status: Customer["verification_status"] }) {
  const map = {
    verified: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-orange-100 text-orange-800 border-orange-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  }
  return <Badge className={`px-2 py-1 text-xs font-semibold border ${map[status]}`}>{status.toUpperCase()}</Badge>
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-gray-600 gap-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400">{icon}</div>
      <p className="text-base sm:text-lg">{text}</p>
    </div>
  )
}

function MobileCustomerCard({
  customer,
  onEdit,
  onDelete,
}: {
  customer: Customer
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{customer.full_name}</div>
          <div className="text-gray-600 text-sm">{customer.account_number}</div>
        </div>
        <StatusBadge status={customer.verification_status} />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="font-bold text-emerald-600">Rs{customer.current_balance.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{new Date(customer.created_at).toLocaleDateString()}</div>
      </div>

      {customer.security_comment && <div className="text-gray-500 text-sm mt-2">{customer.security_comment}</div>}

      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-1" /> Review
        </Button>
        <Button variant="outline" size="sm" className="border-red-200 text-red-600 bg-transparent" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left uppercase tracking-wider text-gray-600 text-xs font-semibold">{children}</th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top">{children}</td>
}
