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


app.post('/create', (req, res) => {
    const email = req.body.email;
    const coin = req.body.coin;
    const amount = req.body.amount;
 
    db.query(
        "INSERT INTO input (I_email, I_coin, I_amount) VALUES (?, ?, ?)",
        [email, coin, amount], (err, result) => {
            if (err) {
                console.log(err)
            }   else {
                res.send("Values Inserted")
            }
        }
    );
})
 
app.post("/transactions", (req, res) => {
    const email = req.body.email

    db.query("SELECT T_coin, T_amount FROM Transactions WHERE T_email= ?",[email], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

/*app.get('/transaction', (req, res) => {
    const email = req.body.email 

    db.query("SELECT T_coin, T_amount FROM transactions WHERE T_email = ?;", 
    [email], (err, result) => {
        if (err){
            res.send({err: err})
        }
            if(result.length > 0)
            {
            res.send(result);
            }
            else
            {
              res.send({message: "Wrong email!"});  
            }
    })
})*/

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

app.post('/postinfo', (req, res) => {
    const coinname = req.body.name 
    const choice = req.body.choice

    db.query("SELECT price,time FROM chartinfo WHERE coinName = ? AND choice = ?;", 
    [coinname, choice], (err, result) => {
        if (err){
            res.send({err: err})
        }
            if(result.length > 0)
            {
            res.send(result);
            }
            else
            {
              res.send({message: "No Information in Database"});  
            }
    })
})


app.post('/info', (req,res) => {
    const coinname = req.body.name
    const coinprice = req.body.price 
    const cointime = req.body.time
    const choice = req.body.choice

    db.query("INSERT INTO chartinfo (coinName, price, time, choice) VALUES (?,?,?,?);", 
    [coinname, coinprice, cointime, choice], (err, result) => {
        if (err){
            console.log(err)
        }
        else
        {
            res.send(result)
        }
    })
});

app.listen(3001, () => {console.log("Successful Connection!")})
