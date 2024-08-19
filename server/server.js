const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path');
const { error } = require('console');

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

// Quotation route
app.get("/get_quotation/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM quotation WHERE `refNum`= ?";
  pool.query(q,[id], (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })

})

// Route for last qoutaion reference number 
app.get("/get_ref", (req, res) => {
  const q = "SELECT refNum FROM quotation ORDER BY refNum DESC LIMIT 1";

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


// Add items to to quotation table
app.post("/add", async (req, res) => {
  const objectsArray = req.body; // Ensure this is an array of objects

  try {
    // Map each object to a promise of the database insertion
    const insertionPromises = objectsArray.map(object => {
      const q = "INSERT INTO quotation (`refNum`,`Name`,`date`,`BillTo`,`Size`,`Desc`,`Qty`,`colour`,`Packing`,`UnitPrice`,`BeforeVAT`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      
      const values = [
        object.ref,
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
