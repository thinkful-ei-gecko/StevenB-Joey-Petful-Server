const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { Queue, peek, displayQ } = require('./Queue');
const { cats, dogs } = require('./animalStore');

const [ catQ, dogQ ] = [ new Queue(), new Queue() ];

const app = express();
app.use(cors());
app.use(helmet());

const createCatQ = (catJson) => {
  for (let i = 0; i < catJson.length; i++) {
    catQ.enqueue(catJson[i]);
  }
  return displayQ(catQ);
};

const createDogQ = (dogJson) => {
  for (let i = 0; i < dogJson.length; i++) {
    dogQ.enqueue(dogJson[i]);
  }
  return displayQ(dogQ);
};

app.get('/api/cat/adopt', (req, res) => {
  res.json(createCatQ(cats));
});

app.get('/api/dog/adopt', (req, res) => {
  res.json(createDogQ(dogs));
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

app.listen(8080,()=>{
  console.log('Serving on 8080');
});