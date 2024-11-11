-- Drop the table if it exists (for cleanup purposes)
USE mydb;

DROP TABLE IF EXISTS `items`; -- Ensure the table is dropped if it exists

-- Create the table with `iditems` as auto-increment and `ItemCode` as unique
CREATE TABLE `items` (
  idItems INT AUTO_INCREMENT,               -- Auto-incrementing id
  size VARCHAR(45) NOT NULL,                -- Item size (e.g., small, medium)
  itemDescription VARCHAR(45) NOT NULL,               -- Item description
  itemCode VARCHAR(45) NOT NULL,            -- Unique item code
  voltage VARCHAR(20) NOT NULL,             -- Voltage (if necessary as a string)
  price FLOAT NOT NULL,                     -- Item price
  PRIMARY KEY (iditems),                    -- Make `iditems` the primary key
  UNIQUE (ItemCode)                         -- Make `ItemCode` unique
);



-- Insert data into the `items` table with `ItemCode` and `voltage` information
INSERT INTO items (size, itemDescription, itemCode, voltage, price) VALUES
('1x1.5 S', 'CU/PVC-S', 'CU/PVC-S-1x1.5', '300/500', 25),
('1x2.5 S', 'CU/PVC-S', 'CU/PVC-S-1x2.5', '300/500', 35),
('1x4 S', 'CU/PVC-S', 'CU/PVC-S-1x4', '300/500', 65),
('1x1.5 F', 'CU/PVC-F', 'CU/PVC-F-1x1.5', '300/500', 30),
('1x2.5 F', 'CU/PVC-F', 'CU/PVC-F-1x2.5', '300/500', 50),
('1x4 F', 'CU/PVC-F', 'CU/PVC-F-1x4', '300/500', 70),
('2x1.5', 'HO5VV-F', 'HO5VV-F-2x1.5', '300/500', 10),
('3x1.5', 'HO5VV-F', 'HO5VV-F-3x1.5', '300/500', 20),
('4x1.5', 'HO5VV-F', 'HO5VV-F-4x1.5', '300/500', 35),
('2x2.5', 'HO5VV-F', 'HO5VV-F-2x2.5', '300/500', 36),
('3x2.5', 'HO5VV-F', 'HO5VV-F-3x2.5', '300/500', 36),
('4x2.5', 'HO5VV-F', 'HO5VV-F-4x2.5', '300/500', 56),
('5x2.5', 'HO5VV-F', 'HO5VV-F-5x2.5', '300/500', 66),
('2x4', 'HO5VV-F', 'HO5VV-F-2x4', '300/500', 98),
('3x4', 'HO5VV-F', 'HO5VV-F-3x4', '300/500', 65564),
('4x4', 'HO5VV-F', 'HO5VV-F-4x4', '300/500', 656),
('5x4', 'HO5VV-F', 'HO5VV-F-5x4', '300/500', 656),
('2x6', 'CU/PVC/PVC-S', 'CU/PVC/PVC-S-2x6', '600/1000', 65),
('3x6', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-3x6', '600/1000', 65),
('4x6', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-4x6', '600/1000', 65),
('2x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-2x10', '600/1000', 989),
('3x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-3x10', '600/1000', 78),
('4x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-4x10', '600/1000', 4652),
('5x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-5x10', '600/1000', 656),
('4x16', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-4x16', '600/1000', 465),
('5x16', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-5x16', '600/1000', 465),
('3x25+16', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3x25+16', '600/1000', 46546),
('3x35+16', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3x35+16', '600/1000', 498),
('3X50+25', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X50+25', '600/1000', 5464),
('3X70+35', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X70+35', '600/1000', 465),
('3X95+50', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X95+50', '600/1000', 465),
('3X120+70', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X120+70', '600/1000', 659),
('3X150+70', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X150+70', '600/1000', 565),
('3X185+95', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X185+95', '600/1000', 465),
('3X240+120', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X240+120', '600/1000', 465),
('3X300+150', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X300+150', '600/1000', 897),
('1X16', 'CU/PVC-T', 'CU/PVC-T-1X16', '450/750', 165),
('1X25', 'CU/PVC-T', 'CU/PVC-T-1X25', '450/750', 1654),
('1X35', 'CU/PVC-T', 'CU/PVC-T-1X35', '450/750', 463),
('1X50', 'CU/PVC-T', 'CU/PVC-T-1X50', '450/750', 46),
('1X70', 'CU/PVC-T', 'CU/PVC-T-1X70', '450/750', 94),
('1X95', 'CU/PVC-T', 'CU/PVC-T-1X95', '450/750', 4421),
('1X120', 'CU/PVC-T', 'CU/PVC-T-1X120', '450/750', 15),
('1X150', 'CU/PVC-T', 'CU/PVC-T-1X150', '450/750', 456);

