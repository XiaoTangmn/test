
var express = require("express")
var app = express();
var querystring = require('querystring');
var mysql = require("mysql");


var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// app.use(parser.json())


var conn = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"123",
    database:"test"
})

conn.connect();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
// var addUser = 'insert into user value(?,?,?,?,?)';
// var addUser01 =[]

app.get("/data01",(err,res)=>{
    conn.query('select * from user',function(error,res2,fields){
        if (error) throw error;
      console.log('The solution is: ', res2);
        res.json(res2);
    })


})
app.post("/add",urlencodedParser,(req,res)=>{

   
    response={
        id:req.body.id,
        name:req.body.name,
        age:req.body.age,
        sex:req.body.sex,
        birth:req.body.birth,
        addr:req.body.addr,
       


    }
    console.log(JSON.stringify(response));
    var data=JSON.stringify(response);
    var sql = "insert into user(id,name,age,addr,birth,sex) value(?,?,?,?,?,?)";
    var sqlParams=[response.id,response.name,response.age,response.addr,response.birth,response.sex];

    conn.query(sql,sqlParams,(res)=>{
        console.log("insert sucess",res);
    })
})
app.post("/del",urlencodedParser,(req,res)=>{

   
    response={
        id:req.body.id,
      
       


    }
    console.log(JSON.stringify(response));
    var data=JSON.stringify(response);
    var sql = "delete from user where id=?";
    var sqlParams=[response.id];

    conn.query(sql,sqlParams,(res)=>{
        console.log("delete sucess",res);
    })
})
app.listen(5000,function () {
    console.log('欢迎访问：5000');
});
