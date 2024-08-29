const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path');
const { error, log } = require('console');

const app = express();

//Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

const port = 5000;

// create a connection pool - not single connectin
const pool = mysql.createPool({
  host: "localhost",
  connectionLimit: 10,
  user: "root",
  password: "password",
  database: "mydb"
})

// Middleware to handle conncetion errors

app.use((req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).json({error: 'Database connection error'});
    }
    connection.release(); // Release connection back to the pool
    next();
  })
})

app.get("/", (req, res) =>{
  res.json("hello this is the backend");
})

function generateTableName(year, month) {
  return `quotation_${year}_${month}`;
}

// Quotation route to fetch data
app.get("/get_quotation/:id", (req, res) => {
  const id = req.params.id;
  const year = req.query.year;
  const month = req.query.month;

  // Validate input
  if (!id || !year || !month) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const tableName = generateTableName(year, month);

  // Escape table name for safety
  const escapedTableName = mysql.escapeId(tableName);

  const q = `SELECT * FROM ${escapedTableName} WHERE refNum= ?`;
  pool.query(q,[id], (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })

})

// Delete quotatio item route
app.delete("/delete_quotation/:id", (req, res) => {
  const id = req.params.id;
  const year = req.query.year;
  const month = req.query.month;

  const tableName = generateTableName(year, month);

  // Escape table name for safety
  const escapedTableName = mysql.escapeId(tableName);

  const q = `DELETE FROM ${escapedTableName} WHERE id= ?`;
  pool.query(q,[id], (err, data) => {
    if(err) {
      console.error('Deleting error:', err);
      return res.status(500).json({error: 'Error deleting data' });
    } else{
      res.send({message: 'Data deleted successfully'})
    }
  })
});

// Updadte quotation item route
app.put("/update_quotation/:id", (req, res) => {
  const id = req.params.id;
  const year = req.query.year;
  const month = req.query.month;

  const tableName = generateTableName(year, month);

  // Escape table name for safety
  const escapedTableName = mysql.escapeId(tableName);

  const data = req.body;

  // checking for empty values
  Object.values(data).forEach((item) => {
    if (!item) {
           return res.status(400).json({ error: `${field} is required` });
         }
  })



  const q = `UPDATE ${escapedTableName} 
            SET refNum = ?, 
                sales_rep_id = ?, 
                Name = ?, 
                Date = ?, 
                BillTo = ?, 
                Size = ?, 
                Description = ?, 
                Qty = ?, 
                colour = ?, 
                Packing = ?, 
                UnitPrice = ?, 
                BeforeVAT = ? 
            WHERE id = ?`;

  const values = [
    data.refNum,
    data.sales_rep_id,
    data.Name,
    data.Date.split('T')[0], // Convert to date
    data.BillTo,
    data.Size,
    data.Description,
    data.QTY,
    data.Colour,
    data.Packing,
    data.UnitPrice,
    data.BeforeVAT,
    id
  ];

  pool.query(q,values, (err, data) => {
    if(err) {
      console.error('Updating error:', err);
      return res.status(500).json({error: 'Error Updating data' });
    } else{
      res.send({message: 'Data updated successfully'})
    }
  })
});

// Update quotation item Bill To
app.put("/update_quotation/billto/:ref", (req, res) => {
  const ref = req.params.ref;
  const year = req.query.year;
  const month = req.query.month;

  const tableName = generateTableName(year, month);

  // Escape table name for safety
  const escapedTableName = mysql.escapeId(tableName);

  const data = req.body;

  // checking for empty values
  Object.values(data).forEach((item) => {
    if (!item) {
           return res.status(400).json({ error: `${field} is required` });
         }
  })

  const q = `UPDATE ${escapedTableName} 
            SET BillTo = ? 
            WHERE refNum = ?`;

  console.log('Data is', data);
  const values = [data.billToEdit, ref];



  pool.query(q,values, (err, data) => {
    if(err) {
      console.error('Updating error:', err);
      return res.status(500).json({error: 'Error Updating data' });
    } else{
      res.send({message: 'Data updated successfully'})
    }
  })
});


// Route for last qoutaion reference number 
app.get("/get_ref", (req, res) => {
  const q = "SELECT refNum FROM quotation_2024_08 ORDER BY refNum DESC LIMIT 1";

  pool.query(q, (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })

})

// Items size, desc and price route
app.get("/suggestions/items", (req,res) => {

  const q = "SELECT * FROM items";
  pool.query(q, (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })

})

// Get companies and it's info
app.get("/suggestions/billto",(req, res) => {
  const q = "SELECT * FROM companies";
  pool.query(q, (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })
})

// Get Sales info
app.get("/suggestions/sales/person",(req, res) => {
  const q = "SELECT sales_rep_id, first_name FROM sales_representative";
  pool.query(q, (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })
})


// Add items to to quotation table
app.post("/add", async (req, res) => {
  const objectsArray = req.body; // Ensure this is an array of objects

  try {
    // Map each object to a promise of the database insertion
    const insertionPromises = objectsArray.map(object => {
      const q = "INSERT INTO quotation_2024_08 (`refNum`,`sales_rep_id`,`Name`,`Date`,`BillTo`,`Size`,`Description`,`Qty`,`colour`,`Packing`,`UnitPrice`,`BeforeVAT`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      
      const values = [
        object.ref,
        object.salesRepId,
        object.name,
        new Date(object.date), // Convert date to ISO format if needed
        object.billTo,
        object.size,
        object.description,
        object.quantity,
        object.colour,
        object.packing,
        object.unitPrice,
        object.beforeVat
      ];

      return new Promise((resolve, reject) => {
        pool.query(q, values, (err, data) => {
          if (err) {
            reject(err); // Reject the promise if there is an error
          } else {
            resolve(data); // Resolve the promise if the query is successful
          }
        });
      });
    });

    // Wait for all insertion promises to complete
    await Promise.all(insertionPromises);

    // Send response after all insertions
    res.json("Proformas have been added");

  } catch (err) {
    // Handle any errors that occurred during insertion
    res.status(500).json({ error: err.message });
  }
});

// Add Additional items to quotation table
app.post("/add/edit", async (req, res) => {
  const objectsArray = req.body; // Ensure this is an array of objects

  try {
    // Map each object to a promise of the database insertion
    const insertionPromises = objectsArray.map(object => {
      const q = "INSERT INTO quotation_2024_08 (`refNum`,`sales_rep_id`,`Name`,`Date`,`BillTo`,`Size`,`Description`,`Qty`,`colour`,`Packing`,`UnitPrice`,`BeforeVAT`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      
      const values = [
        object.ref,
        object.salesRepId,
        object.name,
        new Date(object.date), // Convert date to ISO format if needed
        object.billTo,
        object.size,
        object.description,
        object.quantity,
        object.colour,
        object.packing,
        object.unitPrice,
        object.beforeVat
      ];

      return new Promise((resolve, reject) => {
        pool.query(q, values, (err, data) => {
          if (err) {
            reject(err); // Reject the promise if there is an error
          } else {
            resolve(data); // Resolve the promise if the query is successful
          }
        });
      });
    });

    // Wait for all insertion promises to complete
    await Promise.all(insertionPromises);

    // Send response after all insertions
    res.json("Proformas have been added");

  } catch (err) {
    // Handle any errors that occurred during insertion
    res.status(500).json({ error: err.message });
  }
});


app.post("/addtest", (req, res) => {
  const q = "INSERT INTO test (`id`,`name`) VALUES (?, ?)";

  const values = [
      req.body.id,
      req.body.name
  ];

  pool.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Proforma has been added");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
