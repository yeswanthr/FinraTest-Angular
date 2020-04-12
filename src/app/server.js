// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// configure our express instance with some body-parser settings 
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
router.get('/getCombinations/:getCombinations', (req,res) => {
    console.log(req.params);
    res.json({data: ['1234567','1234567','1234567','1234567','1234567','1234567','1234567','1234567','1234567','1234567']});
});

router.get('/generateCombinations/:generateCombinations', (req,res) => {
    console.log(req.params);
    res.json({totalNumberOfItems: 100, itemsPerPage: 20});
});


// this is where we'll handle our various routes from
app.use('/', (router));
// finally, launch our server on port 3001.
const server = app.listen(9090, () => {
    console.log('listening on port %s...', server.address().port);
});