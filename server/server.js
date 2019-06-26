var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var session = require("express-session");

const con = mysql.createConnection({
  user: "plataforma",
  password: "Plataforma!123",
  host: "localhost",
  database: "plataforma"
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.post("/api/fileReceive", (req, res)=>{
  if(req.body){
    //ARQUIVO RECEBIDO COM SUCESSO
    res.sendStatus(200)
  }else{
    res.send("Erro de arquivo!")
  }
})

app.get("/api/login", (req, res)=>{
  
  con.connect(err => {
    if(err) console.log("Erro login: " +err)
    var selectStr = "SELECT * FROM usuarios WHERE email='"+req.query.email+"' AND senha='"+req.query.senha+"'";
    con.query(selectStr, (errorQuery, result,fields)=>{
      if(errorQuery) console.log("Erro sql login: "+errorQuery)
      res.send(JSON.stringify(result[0]))
    })
  })
})

app.post("/api/insereConta", (req, res) => {
  var postData = req.body;
  con.connect(err => {
    if (err) console.log("Erro! " + err);
    
    var queryStr =
      "insert into usuarios (permissao, nome, sobrenome, email, cidade, cep, estado, senha, cpf) values (" +
      "1,'" +
      postData.nome +
      "','" +
      postData.sobrenome +
      "','" +
      postData.email +
      "','" +
      postData.cidade +
      "','" +
      postData.cep +
      "','" +
      postData.estado +
      "','" +
      postData.senha +
      "','"+
      postData.cpf+"')";
    con.query(queryStr, (error) => {
      if (error) throw error;
      res.send(200);
      console.log("Conta criada com sucesso!");
    });
  });
});
