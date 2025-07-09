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

-- Clear existing data and insert Pakistani customer data
DELETE FROM customers;

-- Insert Pakistani customers with realistic names and data
INSERT INTO customers (full_name, account_number, current_balance, security_comment, verification_status, created_at) VALUES
('Muhammad Ali Khan', '03001234567', 45000.00, 'Regular customer from Karachi, verified through SMS', 'verified', NOW() - INTERVAL '2 hours'),
('Fatima Sheikh', '03009876543', 28000.50, 'New customer from Lahore, pending document verification', 'pending', NOW() - INTERVAL '1 hour'),
('Ahmad Hassan', '03007654321', 75000.00, 'Premium customer from Islamabad, auto-verified', 'verified', NOW() - INTERVAL '3 hours'),
('Ayesha Malik', '03005432109', 15000.25, 'Student account from Faisalabad, manual review required', 'pending', NOW() - INTERVAL '30 minutes'),
('Usman Ahmed', '03003456789', 52000.75, 'Business account from Rawalpindi, verified via branch', 'verified', NOW() - INTERVAL '4 hours'),
('Zainab Ali', '03008765432', 33000.00, 'Teacher from Multan, pending salary verification', 'pending', NOW() - INTERVAL '45 minutes'),
('Hassan Raza', '03002345678', 67000.50, 'Engineer from Peshawar, verified through employer', 'verified', NOW() - INTERVAL '5 hours'),
('Mariam Khan', '03006543210', 19000.25, 'Fresh graduate from Quetta, pending first salary', 'pending', NOW() - INTERVAL '20 minutes'),
('Bilal Shah', '03004567890', 41000.00, 'Shopkeeper from Sialkot, verified through business license', 'verified', NOW() - INTERVAL '6 hours'),
('Sana Tariq', '03007890123', 29000.75, 'Nurse from Gujranwala, pending hospital verification', 'pending', NOW() - INTERVAL '15 minutes'),
('Imran Butt', '03001357924', 58000.00, 'Doctor from Hyderabad, verified through medical council', 'verified', NOW() - INTERVAL '7 hours'),
('Nida Iqbal', '03009753186', 22000.50, 'Designer from Sargodha, pending freelance income proof', 'pending', NOW() - INTERVAL '10 minutes'),
('Tariq Mahmood', '03008642097', 84000.25, 'Contractor from Bahawalpur, verified through tax records', 'verified', NOW() - INTERVAL '8 hours'),
('Rabia Noor', '03005791346', 16000.00, 'Receptionist from Jhang, pending employment letter', 'pending', NOW() - INTERVAL '5 minutes'),
('Shahid Afridi', '03003698521', 95000.75, 'Former cricketer from Kohat, verified through sports board', 'verified', NOW() - INTERVAL '9 hours');
