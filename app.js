const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const path = require('path')
var cors = require('cors')
app.use(cors(["localhost:5000", "localhost:3000","https://my-server-pi-call.herokuapp.com"]));


app.use(express.json())

let users = [];

app.use('/', express.static(path.join(__dirname, '/web/build')));

app.get('/api/v1/users', (req, res) => {
  res.send(users);
})

app.post('/api/v1/login', (req, res) => {
  
  if(req.body.email && req.body.password && req.body.name){

    console.log(req.body);
    users.push({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  
    res.send("profile created");
  }
  else{
    res.send("error occured");
  }
})

app.get("/**", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./web/build/index.html"))
  // res.redirect("/")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})