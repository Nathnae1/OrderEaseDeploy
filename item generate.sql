-- Drop the table if it exists (for cleanup purposes)
USE mydb;

-- Create the table with the new `ItemCode` and `voltage` columns
CREATE TABLE `items` (
  iditems INT AUTO_INCREMENT,
  size VARCHAR(45) NOT NULL,
  descr VARCHAR(45) NOT NULL,
  ItemCode VARCHAR(45) NOT NULL PRIMARY KEY, 
  voltage VARCHAR(20) NOT NULL,
  price float NOT NULL
);

-- Insert data into the `items` table with `ItemCode` and `voltage` information
INSERT INTO items (size, descr, ItemCode, voltage, price) VALUES
('2x1.5', 'HO5VV-F', 'HO5VV-F-2x1.5', '220V', 10),
('3x1.5', 'HO5VV-F', 'HO5VV-F-3x1.5', '220V', 20),
('4x1.5', 'HO5VV-F', 'HO5VV-F-4x1.5', '220V', 35),
('2x2.5', 'HO5VV-F', 'HO5VV-F-2x2.5', '220V', 36),
('3x2.5', 'HO5VV-F', 'HO5VV-F-3x2.5', '220V', 36),
('4x2.5', 'HO5VV-F', 'HO5VV-F-4x2.5', '220V', 56),
('5x2.5', 'HO5VV-F', 'HO5VV-F-5x2.5', '220V', 66),
('2x4', 'HO5VV-F', 'HO5VV-F-2x4', '220V', 98),
('3x4', 'HO5VV-F', 'HO5VV-F-3x4', '220V', 65564),
('4x4', 'HO5VV-F', 'HO5VV-F-4x4', '220V', 656),
('5x4', 'HO5VV-F', 'HO5VV-F-5x4', '220V', 656),
('2x6', 'CU/PVC/PVC-S', 'CU/PVC/PVC-S-2x6', '110V', 65),
('3x6', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-3x6', '110V', 65),
('4x6', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-4x6', '110V', 65),
('2x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-2x10', '110V', 989),
('3x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-3x10', '110V', 78),
('4x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-4x10', '110V', 4652),
('5x10', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-5x10', '110V', 656),
('4x16', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-4x16', '110V', 465),
('5x16', 'CU/PVC/PVC-F', 'CU/PVC/PVC-F-5x16', '110V', 465),
('3x25+16', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3x25+16', '110V', 46546),
('3x35+16', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3x35+16', '110V', 498),
('3X50+25', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X50+25', '110V', 5464),
('3X70+35', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X70+35', '110V', 465),
('3X95+50', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X95+50', '110V', 465),
('3X120+70', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X120+70', '110V', 659),
('3X150+70', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X150+70', '110V', 565),
('3X185+95', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X185+95', '110V', 465),
('3X240+120', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X240+120', '110V', 465),
('3X300+150', 'CU/PVC/PVC-T', 'CU/PVC/PVC-T-3X300+150', '110V', 897),
('1X16', 'CU/PVC-T', 'CU/PVC-T-1X16', '110V', 165),
('1X25', 'CU/PVC-T', 'CU/PVC-T-1X25', '110V', 1654),
('1X35', 'CU/PVC-T', 'CU/PVC-T-1X35', '110V', 463),
('1X50', 'CU/PVC-T', 'CU/PVC-T-1X50', '110V', 46),
('1X70', 'CU/PVC-T', 'CU/PVC-T-1X70', '110V', 94),
('1X95', 'CU/PVC-T', 'CU/PVC-T-1X95', '110V', 4421),
('1X120', 'CU/PVC-T', 'CU/PVC-T-1X120', '110V', 15),
('1X150', 'CU/PVC-T', 'CU/PVC-T-1X150', '110V', 456),
('1x1.5 S', 'CU/PVC-S', 'CU/PVC-S-1x1.5', '220V', 25),
('1x2.5 S', 'CU/PVC-S', 'CU/PVC-S-1x2.5', '220V', 35),
('1x4 S', 'CU/PVC-S', 'CU/PVC-S-1x4', '220V', 65),
('1x1.5 F', 'CU/PVC-F', 'CU/PVC-F-1x1.5', '220V', 30),
('1x2.5 F', 'CU/PVC-F', 'CU/PVC-F-1x2.5', '220V', 50),
('1x4 F', 'CU/PVC-F', 'CU/PVC-F-1x4', '220V', 70);

