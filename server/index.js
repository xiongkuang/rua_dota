/**
 * Created by xiongkuang on 11/8/16.
 * Main starting point of this application
 */

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


//db setup
mongoose.connect('mongodb://localhost:auth/auth');



//App setup
app.use(morgan('combined'));
app.use(cors());//cors is a middleware on express side
app.use(bodyParser.json({type: '*/*'}));
router(app);




//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on', port);
