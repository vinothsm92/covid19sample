const express = require('express');
const os = require('os');


var bodyParser = require('body-parser')

var app = express()



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', express.static('./build'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/getUserData', (req, res) => res.send({ data: data }));
app.post('/create', function(req,res){
    
    console.log(req.body.Domain);
    console.log(req.body.Listname); 
    console.log(req.body.list_desc); 
    console.log(req.body.list_mem); 
    console.log(req.body.emailset);
    res.send({ Message:'Success'})
});
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));


var data={
"data":[]
}