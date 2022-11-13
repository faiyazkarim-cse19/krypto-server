const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { response } = require('express')

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password : '!qaz',
    database : 'krypto'
});

app.post('/register', (req,res) => {
    const name = req.body.name
    const email = req.body.email 
    const password = req.body.password

    db.query("INSERT INTO clientinfo (clientName, clientMail, clientPassword) VALUES (?,?,?);", 
    [name, email, password], (err, result) => {
        if (err){
            console.log(err)
        }
        else
        {
            res.send(result)
        }
    })
});
 
app.post('/login', (req, res) => {
    const email = req.body.email 
    const password = req.body.password

    db.query("SELECT * FROM clientinfo WHERE clientMail = ? AND clientPassword = ?;", 
    [email, password], (err, result) => {
        if (err){
            res.send({err: err})
        }
            if(result.length > 0)
            {
            res.send(result);
            }
            else
            {
              res.send({message: "Wrong email/password combination"});  
            }
    })
})

app.listen(3001, () => {console.log("Successful Connection!")})
