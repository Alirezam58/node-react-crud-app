import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

app.get('/', (req, res) => {
  res.json('Hello this is from backend');
});

app.get('/books', (req, res) => {
  const qry = 'SELECT * FROM books';
  db.query(qry, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const qry = 'INSERT INTO books(`title`,`desc`,`price`,`cover`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(qry, [values], (req, res) => {
    if (err) return res.json(err);
    return res.json('Book has been added successfully');
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const qry = 'DELETE FROM books WHERE id = ?';
  db.query(qry, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been added successfully');
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const qry =
    'UPDATE books SET `title`=? , `desc`=? , `price`=? ,`cover`=? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(qry, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been updated successfully');
  });
});

app.listen(8800, () => {
  console.log('server is connected');
});
