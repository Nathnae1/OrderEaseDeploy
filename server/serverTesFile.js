// Route for last quotation reference number
app.post("/create_so_from_qo", (req, res) => {

  const today = new Date();
  const year = today.getFullYear();
  let refNumber;
  
  // Create table name dynamically based on the year
  const tableName = `sales_order_${year}`;

  // Check if the table exists
  const checkTableQuery = `SHOW TABLES LIKE '${tableName}'`;

  pool.query(checkTableQuery, (err, result) => {
    if (err) {
      console.error('Error checking table existence:', err);
      return res.status(500).json({ error: 'Error checking table existence' });
    }

    // If the table does not exist, create it
    if (result.length === 0) {
      refNumber = 1;
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          refNum INT NOT NULL,
          sales_rep_id INT NOT NULL,
          Name VARCHAR(100) NOT NULL,
          Date DATE NOT NULL,
          BillTo VARCHAR(255) NOT NULL,
          Size VARCHAR(50) NOT NULL,
          itemDescription VARCHAR(50) NOT NULL,
          itemCode VARCHAR(50) NOT NULL,
          Colour VARCHAR(50) NOT NULL,
          Volt VARCHAR(50) NOT NULL,
          QTY INT NOT NULL,
          Packing VARCHAR(50) NOT NULL,
          UnitPrice DECIMAL(10, 2) NOT NULL,
          BeforeVAT DECIMAL(10, 2) NOT NULL
        );
      `;

      pool.query(createTableQuery, (err, result) => {
        if (err) {
          console.error('Error creating table:', err);
          return res.status(500).json({ error: 'Error creating table' });
        }

        console.log(`Table ${tableName} created successfully`);

        // After creating the table, insert the first reference number (refNum = 1)
        const insertRefQuery = `INSERT INTO ${tableName} (refNum) VALUES (1)`;

        pool.query(insertRefQuery, (err, result) => {
          if (err) {
            console.error('Error inserting reference number:', err);
            return res.status(500).json({ error: 'Error inserting reference number' });
          }
          console.log('Reference number 1 inserted');
          return res.json({ refNum: 1 });
        });
      });

    } else {
      // Table exists, get the last reference number
      const selectRefQuery = `SELECT refNum FROM ${tableName} ORDER BY refNum DESC LIMIT 1`;

      pool.query(selectRefQuery, (err, data) => {
        if (err) {
          console.error('Query error:', err);
          return res.status(500).json({ error: 'Query error' });
        }
        return res.json(data);
      });
    }
  });
});