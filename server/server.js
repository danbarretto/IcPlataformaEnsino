var express = require("express");
var app = express();
var sql = require("mssql");
var bodyParser = require("body-parser");
const config = {
  user: "sa",
  password: "Surubafoda98",
  server: "localhost",
  database: "plataforma"
};
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

app.get("/api/mensagem", (req, res) => {
  sql.close();
  sql.connect(config, err => {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from usuarios", (err, recordset) => {
      if (err) console.log(err);
      res.send(recordset);
    });
  });
});

app.get("/api/getId", (req, res) => {
  sql.close();
  sql.connect(config, err => {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select id from usuarios", (err, recordset) => {
      if (err) console.log(err);
      res.send(recordset);
    });
  });
});

app.get("/api/login", (req, res) => {
  sql.close();
  sql.connect(config, err => {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from usuarios where email='"+req.body.email+"' and senha='"+req.body.senha+"'", (err, recordset) => {
      if (err) console.log(err);
      res.send(recordset);
    });
  });
});

app.post("/api/insereConta", (req, res) => {
  sql.close();
  var postData = req.body;
  sql.connect(config, err => {
    if (err) console.log("Erro! " + err);
    var request = new sql.Request();
    var queryStr =
      "insert into usuarios (id, permissao, nome, sobrenome, email, cidade, cep, estado, senha) values (" +
      postData.id +
      ",1,'" +
      postData.nome +
      "','" +id
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
      "')";
    request.query(queryStr, (error, results, fields) => {
	  if (error) throw error;
	  res.send(200);
      res.end(JSON.stringify(results));
    });
  });
});
