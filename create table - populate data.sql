-- Sure! Here's the MySQL script to create the table and populate it with the data provided:
-- Switch to the mydb database
USE mydb;
-- Create the table
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    tin VARCHAR(20) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    website_url VARCHAR(255),
    address VARCHAR(255),
    industry_sector VARCHAR(100),
    parent_company VARCHAR(255)
);

-- Insert data into the table
INSERT INTO companies (company_name, region, city, tin, contact_person, phone_number, email_address, website_url, address, industry_sector, parent_company) VALUES
('Tech Innovators', 'Oromia', 'Adama', '1234567890', 'John Doe', '+251 911 123456', 'john.doe@techinnov.com', 'www.techinnov.com', '123 Tech Street, Adama', 'Technology', 'Innovate Holdings'),
('Green Solutions', 'Amhara', 'Bahir Dar', '2345678901', 'Jane Smith', '+251 922 234567', 'jane.smith@greensol.com', 'www.greensolutions.com', '456 Green Road, Bahir Dar', 'Environmental', 'Eco Group'),
('Blue Sky Ltd.', 'Addis Ababa', 'Addis Ababa', '3456789012', 'Michael Brown', '+251 933 345678', 'michael.brown@bluesky.com', 'www.bluesky.com', '789 Blue Avenue, Addis Ababa', 'Aviation', 'Sky Enterprises'),
('Red Star Corp.', 'Tigray', 'Mekelle', '4567890123', 'Sarah Johnson', '+251 944 456789', 'sarah.johnson@redstar.com', 'www.redstar.com', '101 Red Street, Mekelle', 'Manufacturing', 'Star Industries'),
('Golden Harvest', 'SNNPR', 'Hawassa', '5678901234', 'David Wilson', '+251 955 567890', 'david.wilson@goldenharvest.com', 'www.goldenharvest.com', '202 Golden Lane, Hawassa', 'Agriculture', 'Harvest Group'),
('Silver Line Inc.', 'Oromia', 'Jimma', '6789012345', 'Emily Davis', '+251 966 678901', 'emily.davis@silverline.com', 'www.silverline.com', '303 Silver Road, Jimma', 'Transportation', 'Line Holdings'),
('Bright Future Co.', 'Amhara', 'Gondar', '7890123456', 'Daniel Garcia', '+251 977 789012', 'daniel.garcia@brightfuture.com', 'www.brightfuture.com', '404 Bright Street, Gondar', 'Education', 'Future Group'),
('Sunrise Enterprises', 'Addis Ababa', 'Addis Ababa', '8901234567', 'Laura Martinez', '+251 988 890123', 'laura.martinez@sunrise.com', 'www.sunrise.com', '505 Sunrise Blvd, Addis Ababa', 'Retail', 'Sunrise Holdings'),
('Horizon Ventures', 'Tigray', 'Axum', '9012345678', 'Robert Lee', '+251 999 901234', 'robert.lee@horizon.com', 'www.horizonventures.com', '606 Horizon Road, Axum', 'Investment', 'Venture Group'),
('Eco-Friendly Ltd.', 'SNNPR', 'Arba Minch', '0123456789', 'Maria Hernandez', '+251 910 012345', 'maria.hernandez@ecofriendly.com', 'www.ecofriendly.com', '707 Eco Street, Arba Minch', 'Environmental', 'Green Holdings'),
('Prime Tech', 'Oromia', 'Bishoftu', '1234509876', 'James Clark', '+251 921 123450', 'james.clark@primetech.com', 'www.primetech.com', '808 Prime Avenue, Bishoftu', 'Technology', 'Tech Group'),
('Future Vision', 'Amhara', 'Dessie', '2345609876', 'Patricia Lewis', '+251 932 234560', 'patricia.lewis@futurevision.com', 'www.futurevision.com', '909 Vision Road, Dessie', 'Media', 'Vision Holdings'),
('Star Enterprises', 'Addis Ababa', 'Addis Ababa', '3456709876', 'Christopher Young', '+251 943 345670', 'christopher.young@star.com', 'www.starenterprises.com', '1010 Star Blvd, Addis Ababa', 'Retail', 'Star Group'),
('Global Solutions', 'Tigray', 'Shire', '4567809876', 'Barbara King', '+251 954 456780', 'barbara.king@globalsolutions.com', 'www.globalsolutions.com', '1111 Global Street, Shire', 'Consulting', 'Solutions Group'),
('Dynamic Systems', 'SNNPR', 'Jinka', '5678909876', 'Anthony Wright', '+251 965 567890', 'anthony.wright@dynamicsystems.com', 'www.dynamicsystems.com', '1212 Dynamic Road, Jinka', 'IT Services', 'Systems Holdings');
