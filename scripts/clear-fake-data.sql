-- Clear all fake/sample data from customers table
DELETE FROM customers;

-- Reset the auto-increment counter
ALTER SEQUENCE customers_id_seq RESTART WITH 1;

-- Verify table is empty
SELECT COUNT(*) as total_customers FROM customers;
