var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var sha512 = require("js-sha512").sha512
const multer = require("multer")
const fs = require('fs')


//Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    fileName = new Date().toISOString() + file.originalname
    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage
}).single('file')


//Receives and stores file
app.post('/api/fileReceive', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("Erro no upload", err)
    } else {
      res.send(req.file.filename)
    }
  })
})


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

//Header set
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


//Login
app.get("/api/login", (req, res) => {

  var selectStr = "SELECT * FROM usuarios WHERE email='" + req.query.email + "' AND senha='" + sha512(req.query.senha) + "'";
  con.query(selectStr, (errorQuery, result, fields) => {
    if (errorQuery) console.log("Erro sql login: " + errorQuery)
    res.send(JSON.stringify(result[0]))
  })
})


//insert user into database
app.post("/api/insereConta", (req, res) => {

  var postData = req.body;
  con.query(`select * from usuarios where email='${postData.email}' OR cpf='${postData.cpf}';`, (error, result) => {
    if (error) throw error
    if (JSON.stringify(result).length > 2) {
      res.sendStatus(403)
    } else {
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
        sha512(postData.senha) +
        "','" +
        postData.cpf + "')";
      con.query(queryStr, (error) => {
        if (error) throw error;
        res.sendStatus(200);
        //console.log("Conta criada com sucesso!");
      });
    }
  })
});


//Insert aula into database
app.post("/api/insereAula", (req, res) => {
  let postData = req.body
  let path = "''"
  if (postData.fileName !== "") {
    path = `'${postData.fileName}'`
  }
  var queryStr = `INSERT INTO aula
    (idUsuarioCriador, titulo, materia, assunto, tipo, conteudoTexto, caminhoArquivo)
    VALUES(${postData.idCriador}, '${postData.titulo}', '${postData.materia}',
    '${postData.assunto}','${postData.tipo}', '${postData.text}',
     ${path});`
  con.query(queryStr, (error) => {
    if (error) {
      console.log("SQL ERROR")
      throw error
    }
    res.sendStatus(200)
    //console.log("Aula criada com sucesso")
  })

})

app.get("/api/getLectures", (req, res) => {
  let selectStr = `SELECT * FROM aula where idUsuarioCriador=${req.query.id}`
  con.query(selectStr, (sqlErr, result, fields) => {
    if (sqlErr) console.log("Select aula error", sqlErr)
    res.send(JSON.stringify(result))
  })

})

app.get("/api/pdfAula", (req, res) => {
  let filePath = `./uploads/${req.query.fileName}`
  fs.readFile(filePath, (err, data)=>{
    if(err) console.log(err)
    res.contentType("application/pdf")
    res.send(data);
  })
})

app.get('/api/downloadzip', (req, res)=>{
  let filePath = `./uploads/${req.query.fileName}`
  fs.readFile(filePath, (err, data)=>{
    if (err) console.log(err)
    res.contentType("application/octet-stream")
    res.send(data)
  })
})