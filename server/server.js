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

app.post("/api/insereConta", (req, res) => {
  sql.close();
  var postData = req.body;
  sql.connect(config, err => {
    if (err) console.log("Erro! " + err);
    console.log(postData.nome)
    var request = new sql.Request();
    request.query(
      "insert into usuarios (id, permissao, nome, sobrenome, email, cidade, cep, estado, senha) values (2,1," +
        postData.nome +
        "," +
        postData.sobrenome +
        "," +
        postData.email +
        "," +
        postData.cidade +
        "," +
        postData.cep +
        "," +
        postData.estado +
        "," +
        postData.senha +
        ")",
      (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
        console.log("Success!");
      }
    );
  });
});
