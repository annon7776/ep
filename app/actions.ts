"use server"

import {
  createCustomer,
  updateCustomerStatus,
  deleteCustomer,
  getCustomersByStatus,
  searchCustomers,
} from "@/lib/database"
import { revalidatePath } from "next/cache"

export async function submitVerification(formData: FormData) {
  try {
    const data = {
      full_name: formData.get("fullName") as string,
      account_number: formData.get("accountNumber") as string,
      current_balance: Number.parseFloat(formData.get("currentBalance") as string),
      security_comment: formData.get("securityComment") as string,
    }

    // Validate required fields
    if (!data.full_name || !data.account_number || !data.current_balance) {
      return { success: false, error: "All required fields must be filled" }
    }

    // Validate account number format (Pakistani mobile number)
    if (!/^03\d{9}$/.test(data.account_number)) {
      return { success: false, error: "Invalid account number format" }
    }

    // Create customer with 'unverified' status by default
    await createCustomer(data)
    revalidatePath("/admin")

    return { success: true, message: "Verification request submitted successfully! Please wait for admin approval." }
  } catch (error: any) {
    if (error.message?.includes("duplicate key")) {
      return { success: false, error: "Account number already exists" }
    }
    return { success: false, error: "Failed to submit verification request" }
  }
}

export async function updateVerificationStatus(
  id: number,
  status: "pending" | "verified" | "rejected" | "unverified",
  adminNotes?: string,
) {
  try {
    await updateCustomerStatus(id, status, adminNotes)
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update status" }
  }
}

export async function removeCustomer(id: number) {
  try {
    await deleteCustomer(id)
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete customer" }
  }
}

export async function getCustomersData(status = "all", search = "") {
  try {
    let customers
    if (search) {
      customers = await searchCustomers(search)
    } else {
      customers = await getCustomersByStatus(status)
    }
    return { success: true, customers }
  } catch (error) {
    return { success: false, customers: [], error: "Failed to fetch customers" }
  }
}
