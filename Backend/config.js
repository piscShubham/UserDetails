const mysql=require('mysql');

const con =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userdetails'
})

con.connect((err)=>{
    if(err){
        console.log('err in connection')
    }
})

module.exports=con;