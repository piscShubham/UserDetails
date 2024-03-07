const express = require('express');
const cors = require('cors');

const con = require('./config');
const server = express();
const jwt = require('jsonwebtoken');
server.use(cors());
server.use(express.json());

const JWtKey = "secret";



server.post('/add', (req, res) => {
    const data = req.body;
    con.query('INsert INTO  users set ? ', data, (err, result, fields) => {
        if (err) {
            res.send('err')
        }

        else {
            res.send(result);
        }
    })
})

server.get('/',  (req, res) => {
    con.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.send("err");
        }
        else {
            res.send(result)
        }
    })
})

server.delete('/:id', (req, res) => {
    con.query("DELETE FROM users WHERE userid =" + req.params.id, (error, results) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(results);
        }
    })

})


server.put('/:userid', (req, res) => {
    const data = [req.body.firstname, req.body.lastname, req.body.email, req.body.number, req.params.userid];
    con.query('UPDATE users SET firstname=?,lastname=?,email=?,number=? WHERE userid =? ', data, (err, results, fields) => {
        if (err) {
            throw err
        }
        else {
            res.send(results);
        }
    })
})



server.get('/users/:userid', (req, res) => {
    con.query(" SELECT * FROM users WHERE userid =" + req.params.userid, (error, results) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(results);
        }
    })

})



server.get('/', (req, res) => {
    con.query("SELECT * FROM authentication ", (err, result) => {
        if (err) {
            res.send("err");
        }
        else {
            res.send(result)
        }
    })
})



server.post('/sinup', (req, res) => {


    try {
        const product = req.body;

        jwt.sign({ product }, JWtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                res.send({ product: "the token was not found" });
            }
            else {

                res.send({ product, auth: token });

            }


        })


        console.log(product);


    }
    catch (err) {
        res.send(err.message);
    }

})


server.post('/login', (req, res) => {


    try {
        const product = req.body;
        con.query("SELECT * FROM authentication",product);

        

        jwt.sign({ product }, JWtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                res.send({ product: "the token was not found" });
            }
            else {

                res.send({ product, auth: token });

            }


        })


        console.log(product);


    }
    catch (err) {
        res.send(err.message);
    }

})



// server.post('/login', (req, res) => {


//     try {
//         const product =  req.body;

//         jwt.sign({ product }, JWtKey, { expiresIn: "2h" }, (err, token) => {
//             if (err) {
//                 res.send({ product: "the token was not found" });
//             }
//             else {

//                 res.send({ product, auth: token });

//             }


//         })


//         console.log(product);


//     }
//     catch (err) {
//         res.send(err.message);
//     }

// })

// exports.Login = async (req, res) => {
//     if (req.body.email && req.body.password) {
//         const User = await con.findOne(req.body).select('-password');
//         if (User) {


//             jwt.sign({ User }, JWtKey, { expiresIn: "2h" }, (err, token) => {

//                 if (err) {
//                     res.send({ User: "somthing went wrong" });
//                 }
//                 else {
//                     res.send({ User, auth: token });

//                 }

//             })






//         }
//         else {
//             res.send('user not found')
//         }
//     }
//     else {
//         console.log('you are not right a correct emial& password')
//         res.send("you are not right a correct emial& password")
//     }






// }




    server.listen(8080, () => {
        console.log('server is running on 8080');
    })