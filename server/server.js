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
app.get("/quotation", (req, res) => {
  const q = "SELECT * FROM quotation";
  pool.query(q, (err, data) => {
    if(err) {
      console.error('Query error:', err);
      return res.status(500).json({error: 'Query error' });
    }
    return res.json(data);
  })

})

app.post("/add", (req, res) => {
  const q = "INSERT INTO quotation (`id`,`date`,`Bill To`,`Size`,`Desc`,`Qty`,`colour`,`Packing`,`Unit Price`,`Before VAT`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
      req.body.ref,
      new Date(req.body.date),
      req.body.billTo,
      req.body.size,
      req.body.description,
      parseInt(req.body.quantity),
      req.body.colour,
      req.body.packing,
      parseFloat(req.body.unitPrice),
      parseFloat(req.body.beforeVat)
  ];

  pool.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Proforma has been added");
  });
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
