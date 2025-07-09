-- Update the customers table to include 'unverified' status and add total balance tracking
-- First, update existing records to 'unverified' status
UPDATE customers SET verification_status = 'unverified' WHERE verification_status = 'pending';

-- Add constraint to ensure only valid statuses
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_verification_status_check;
ALTER TABLE customers ADD CONSTRAINT customers_verification_status_check 
CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected'));

-- Update the default status for new customers
ALTER TABLE customers ALTER COLUMN verification_status SET DEFAULT 'unverified';

-- Verify the changes
SELECT verification_status, COUNT(*) as count FROM customers GROUP BY verification_status;
