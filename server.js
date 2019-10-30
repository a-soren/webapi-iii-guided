const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan=require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(gateKeeper);
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

function gateKeeper(req, res, next){
  // data can come in through the body, params, query sting, headers

  const password = req.headers.password || '';
   if(password.toLowerCase()==='mellon'){
     next();
   } else if (!password){
     res.status(400).json({message: 'please provide a password'})
   }
     else {
     res.status(401).json({you: 'cannot pass!'});
   }
}

module.exports = server;
