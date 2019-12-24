var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var app = express();

var routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/mubashir', { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
app.listen(3000);
