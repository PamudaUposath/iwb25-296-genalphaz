-- Centers
INSERT INTO centers (name, district, address, contact_phone, contact_email)
VALUES
('Colombo Blood Bank', 'Colombo', '123 Main St, Colombo', '+94112345678', 'colombo@mailinator.com'),
('Kandy General Hospital', 'Kandy', '45 Temple Rd, Kandy', '+94812233445', 'kandy@mailinator.com');

-- Donors
INSERT INTO donors (nic, first_name, last_name, email, date_of_birth, weight, district, blood_type, last_donation_date, points, total_donations)
VALUES
('981234567V', 'Kasun', 'Perera', 'kasun.perera@mailinator.com', '1995-03-12', 68, 'Colombo', 'O+', '2025-02-15', 10, 3),
('912345678V', 'Nadeesha', 'Fernando', 'nadeesha.fernando@mailinator.com', '1992-07-20', 55, 'Gampaha', 'A-', '2025-01-10', 20, 5);

-- Blood Requirements
INSERT INTO blood_requirements (center_id, blood_type, units_required, units_remaining, category, notes, start_time, end_time)
VALUES
(1, 'O+', 10, 10, 'Routine', 'Routine donation needed', '2025-08-01 08:00', '2025-08-31 18:00'),
(2, 'A-', 5, 5, 'Urgent', 'Urgent need for A- blood', '2025-08-05 09:00', '2025-08-20 17:00');

-- Donations
INSERT INTO donations (donor_id, center_id, requirement_id, donated_at, verified_by, hemoglobin_level, points_awarded)
VALUES
(1, 1, 1, '2025-08-02 10:00', 'Dr. Silva', 14.2, 5);

-- QR Tokens
INSERT INTO qr_tokens (token, donor_id, expires_at, used)
VALUES
('token123abc', 1, '2025-08-15 23:59', FALSE);

-- Center Blood Stock
INSERT INTO center_blood_stock (center_id, blood_type, units, last_updated)
VALUES
(1, 'O+', 20, '2025-08-10 08:00'),
(2, 'A-', 15, '2025-08-10 09:00');
