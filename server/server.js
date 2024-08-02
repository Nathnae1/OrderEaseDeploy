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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})