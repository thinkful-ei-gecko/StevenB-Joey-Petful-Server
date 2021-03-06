const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PORT } = require('./config');

const { Queue, displayQ } = require('./Queue');
const { cats, dogs } = require('./animalStore');
const [ catQ, dogQ ] = [ new Queue(), new Queue() ];

const app = express();
app.use(cors());
app.use(helmet());

const createCatQ = (catJson) => {
  for (let i = 0; i < catJson.length; i++) {
    catQ.enqueue(catJson[i]);
  }
  return catQ;
};

const createDogQ = (dogJson) => {
  for (let i = 0; i < dogJson.length; i++) {
    dogQ.enqueue(dogJson[i]);
  }
  return dogQ;
};

createCatQ(cats);
createDogQ(dogs);

app.get('/api/cat/adopt', (req, res) => {
  res.json(displayQ(catQ));
});

app.get('/api/dog/adopt', (req, res) => {
  res.json(displayQ(dogQ));
});

app.delete('/api/cat/adopt', (req, res) => {
  catQ.dequeue();
  res.status(204).end();
});

app.delete('/api/dog/adopt', (req, res) => {
  dogQ.dequeue();
  res.status(204).end();
});

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT);