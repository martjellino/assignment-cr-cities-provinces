const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'assignment_city_province'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//tampilkan 
app.get('/', (req, res) => {
  res.send("This is home")
})

//tampilkan semua data cities
app.get('/api/cities',(req, res) => {
  let sql = "SELECT * FROM cities";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//tampilkan semua data provinces
app.get('/api/provinces',(req, res) => {
  let sql = "SELECT * FROM provinces";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//tampilkan data cities berdasarkan id
app.get('/api/cities/:id',(req, res) => {
  let sql = "SELECT * FROM cities WHERE cities_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//tampilkan data provinces berdasarkan id
app.get('/api/provinces/:id',(req, res) => {
  let sql = "SELECT * FROM provinces WHERE provinces_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Tambahkan data cities baru
app.post('/api/cities',(req, res) => {
  let data = {cities_name: req.body.cities_name};
  let sql = "INSERT INTO cities SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Tambahkan data provinces baru
app.post('/api/provinces',(req, res) => {
  let data = {provinces_name: req.body.provinces_name};
  let sql = "INSERT INTO provinces SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Edit data cities berdasarkan id
app.put('/api/cities/:id',(req, res) => {
  let sql = "UPDATE cities SET cities_name='"+req.body.cities_name+ ' WHERE cities_id="+req.params.id';
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Edit data provinces berdasarkan id
app.put('/api/provinces/:id',(req, res) => {
    let sql = "UPDATE provinces SET provinces_name='"+req.body.provinces_name+ ' WHERE provinces_id="+req.params.id';
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//Delete data cities berdasarkan id
app.delete('/api/cities/:id',(req, res) => {
  let sql = "DELETE FROM cities WHERE cities_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Delete data provinces berdasarkan id
app.delete('/api/provinces/:id',(req, res) => {
  let sql = "DELETE FROM provinces WHERE provinces_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});