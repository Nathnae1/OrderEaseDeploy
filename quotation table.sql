-- Use the mydb database
USE mydb;

-- Create the Quotation table
CREATE TABLE Quotation (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Unique identifier for each quotation
    refNum INT NOT NULL UNIQUE,                   -- Unique reference number for the quotation
    sales_rep_id INT,                             -- Foreign key to Sales_Representative table
    Name VARCHAR(100),                            -- Sales representative's name (for legacy purposes)
    Date DATETIME NOT NULL,                       -- Date and time of the quotation
    BillTo VARCHAR(255),                          -- The entity being billed
    Size VARCHAR(50),                             -- Size of the product
    Description VARCHAR(50),                      -- Description of the product
    QTY INT NOT NULL,                             -- Quantity quoted
    Colour VARCHAR(50),                           -- Colour of the product
    Packing VARCHAR(50),                          -- Packing type
    UnitPrice DECIMAL(10, 2) NOT NULL,            -- Unit price
    BeforeVAT DECIMAL(10, 2) NOT NULL,            -- Price before VAT
    FOREIGN KEY (sales_rep_id) REFERENCES Sales_Representative(sales_rep_id) -- Link to Sales_Representative
);

-- Optionally, create an index for performance on sales_rep_id
CREATE INDEX idx_sales_rep_id ON Quotation(sales_rep_id);
