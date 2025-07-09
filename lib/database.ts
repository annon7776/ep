import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Customer {
  id: number
  full_name: string
  account_number: string
  current_balance: number
  security_comment?: string
  verification_status: "pending" | "verified" | "rejected" | "unverified"
  created_at: string
  updated_at: string
  verified_at?: string
  admin_notes?: string
}

export async function getAllCustomers(): Promise<Customer[]> {
  const customers = await sql`
    SELECT * FROM customers 
    ORDER BY created_at DESC
  `
  return customers as Customer[]
}

export async function getCustomersByStatus(status: string): Promise<Customer[]> {
  if (status === "all") {
    return getAllCustomers()
  }

  const customers = await sql`
    SELECT * FROM customers 
    WHERE verification_status = ${status}
    ORDER BY created_at DESC
  `
  return customers as Customer[]
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  const customers = await sql`
    SELECT * FROM customers 
    WHERE full_name ILIKE ${`%${query}%`} 
    OR account_number ILIKE ${`%${query}%`}
    ORDER BY created_at DESC
  `
  return customers as Customer[]
}

export async function createCustomer(data: {
  full_name: string
  account_number: string
  current_balance: number
  security_comment?: string
}): Promise<Customer> {
  const [customer] = await sql`
    INSERT INTO customers (full_name, account_number, current_balance, security_comment, verification_status)
    VALUES (${data.full_name}, ${data.account_number}, ${data.current_balance}, ${data.security_comment}, 'unverified')
    RETURNING *
  `
  return customer as Customer
}

export async function updateCustomerStatus(
  id: number,
  status: "pending" | "verified" | "rejected" | "unverified",
  adminNotes?: string,
): Promise<Customer> {
  const [customer] = await sql`
    UPDATE customers 
    SET verification_status = ${status},
        admin_notes = ${adminNotes || null},
        verified_at = ${status === "verified" ? new Date().toISOString() : null},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `
  return customer as Customer
}

export async function deleteCustomer(id: number): Promise<void> {
  await sql`DELETE FROM customers WHERE id = ${id}`
}

export async function getStats() {
  const [stats] = await sql`
    SELECT 
      COUNT(*) as total_verifications,
      COUNT(CASE WHEN verification_status = 'verified' THEN 1 END) as verified_customers,
      COUNT(CASE WHEN verification_status = 'unverified' THEN 1 END) as unverified_customers,
      COUNT(CASE WHEN verification_status = 'pending' THEN 1 END) as pending_review,
      COALESCE(SUM(CASE WHEN verification_status = 'verified' THEN current_balance END), 0) as total_verified_balance,
      COALESCE(AVG(CASE WHEN verification_status = 'verified' THEN current_balance END), 0) as avg_balance
    FROM customers
  `
  return stats
}
