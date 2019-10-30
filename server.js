const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan=require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(logger);
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req, res, next){
  console.log(`The Logger: [${new Date().toISOString()}]${req.method} to ${req.url}`)

  next();
}

module.exports = server;
