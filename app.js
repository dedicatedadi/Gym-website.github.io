// importing express 
const express = require("express");
const fs = require("fs");
const path = require("path");
const { brotliDecompress } = require("zlib");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engines as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = "best city in your city"
    const params = { 'title': 'Stay fit gym', "content": con }
    res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {
    // console.log(req.body);
    name = req.body.name;
    age = req.body.age;
    gender = req.body.gender;
    address = req.body.address;
    contact_no = req.body.contact_no;
    email_id = req.body.email_id;
    

    let outputToWrite = `the name of the client is ${name},
    ${age} years old ,
    ${gender} ,
    residing at ${address} ,
    contact no of client is : ${contact_no},
    email id of client is : ${email_id} `

    var d = new Date();
    var unique_n = d.getTime();

    fs.writeFileSync(`output${unique_n}.txt`, outputToWrite)

    const params = { 'message': 'your form has been submitted sucessfully' }
    res.status(200).render('index.pug', params);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})