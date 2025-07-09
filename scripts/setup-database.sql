-- Create customers table for storing verification details
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    current_balance DECIMAL(15,2) NOT NULL,
    security_comment TEXT,
    verification_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP NULL,
    admin_notes TEXT
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_customers_account_number ON customers(account_number);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(verification_status);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

-- Insert some sample data for testing
INSERT INTO customers (full_name, account_number, current_balance, security_comment, verification_status) VALUES
('Ahmed Ali Khan', '03001234567', 25000.00, 'Regular customer, verified through SMS', 'verified'),
('Fatima Sheikh', '03009876543', 15000.50, 'New customer, pending document verification', 'pending'),
('Muhammad Hassan', '03007654321', 50000.00, 'Premium customer, auto-verified', 'verified'),
('Ayesha Malik', '03005432109', 8000.25, 'Student account, manual review required', 'pending');
