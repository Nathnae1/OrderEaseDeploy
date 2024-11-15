// Route for last quotation reference number
app.post("/send_so_to_db", async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  let soRefNumber;

  // Create table name dynamically based on the year
  const tableName = `sales_order_${year}`;

  // Utility function to handle database queries with promises
  const queryPromise = (query, values = []) => {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  try {
    // Check if the table exists
    const checkTableQuery = `SHOW TABLES LIKE '${tableName}'`;
    const tableExists = await queryPromise(checkTableQuery);

    // If the table does not exist, create it
    if (tableExists.length === 0) {
      // Create table
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          qoId INT NOT NULL,
          qoRefNum INT NOT NULL,
          sales_rep_id INT NOT NULL,
          Name VARCHAR(100) NOT NULL,
          qoDate DATE NOT NULL,
          soDate DATE NOT NULL,
          BillTo VARCHAR(255) NOT NULL,
          tin VARCHAR(50) NOT NULL,
          Size VARCHAR(50) NOT NULL,
          itemDescription VARCHAR(50) NOT NULL,
          itemCode VARCHAR(50) NOT NULL,
          Colour VARCHAR(50) NOT NULL,
          Volt VARCHAR(50) NOT NULL,
          Unit VARCHAR(50) NOT NULL,
          QTY INT NOT NULL,
          Packing VARCHAR(50) NOT NULL,
          UnitPrice DECIMAL(10, 2) NOT NULL,
          BeforeVAT DECIMAL(20, 2) NOT NULL,
          AMD INT NOT NULL
        );
      `;
      await queryPromise(createTableQuery);

      // Insert the first reference number (id = 1)
      const insertRefQuery = `INSERT INTO ${tableName} (id) VALUES (1)`;
      await queryPromise(insertRefQuery);
      soRefNumber = 1;

    } else {
      // Table exists, get the last reference number (id)
      const selectRefQuery = `SELECT id FROM ${tableName} ORDER BY id DESC LIMIT 1`;
      const result = await queryPromise(selectRefQuery);
      soRefNumber = result[0].id + 1; // Increment the id to get the next reference number
    }

    // Process the incoming data (ensure it's an array of objects)
    const objectsArray = req.body;
    if (!Array.isArray(objectsArray)) {
      return res.status(400).json({ error: 'Expected an array of objects' });
    }

    // Prepare the insertion query
    const escapedTableName = mysql.escapeId(tableName); // Escape table name for security
    const insertionPromises = objectsArray.map(object => {
      const insertQuery = `INSERT INTO ${escapedTableName} (\`qoId\`, \`qoRefNum\`, \`sales_rep_id\`, \`Name\`, \`qoDate\`, \`soDate\`, \`BillTo\`, \`tin\`, \`Size\`, \`itemDescription\`, \`itemCode\`, \`Colour\`, \`Volt\`, \`Unit\`, \`QTY\`, \`Packing\`, \`UnitPrice\`, \`BeforeVAT\`, \`AMD\`) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        object.qoId,
        soRefNumber, // Using the `soRefNumber` (or `id`) here
        object.sales_rep_id,
        object.Name,
        new Date(object.Date),
        today,
        object.BillTo,
        object.tin,
        object.Size,
        object.itemDescription,
        object.itemCode,
        object.Colour,
        object.Volt,
        object.Unit,
        object.QTY,
        object.Packing,
        object.UnitPrice,
        object.BeforeVAT,
        object.AMD
      ];

      // Return the promise for insertion
      return queryPromise(insertQuery, values);
    });

    // Wait for all insertions to complete
    await Promise.all(insertionPromises);

    // Send a success response after all insertions
    res.json("Sales Order have been added");

  } catch (err) {
    // Handle any errors that occurred during the process
    console.error("Error occurred:", err);
    res.status(500).json({ error: err.message });
  }
});


/*
SalesOrder_Delivery_Link Table:

sales_order_id	delivery_instruction_id
1	1
2	1
2	2

*/