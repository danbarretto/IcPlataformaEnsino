var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var sha512 = require("js-sha512").sha512
const multer = require("multer")
const fs = require('fs')
//const https = require('https')
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

  var selectStr = `SELECT 
  id, permissao,nome,sobrenome,
  email,cidade, estado,
  cep, cpf, dataNasc, pontuacao
  FROM usuarios WHERE email='${req.query.email}' AND senha='${sha512(req.query.senha)}';`
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
        "insert into usuarios (permissao, nome, sobrenome, email, cidade, cep, estado, senha, cpf, dataNasc, pontuacao) values (" +
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
        postData.cpf + "','" + postData.data + "',0)";
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
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err)
    res.contentType("application/pdf")
    res.send(data);
  })
})

app.get('/api/downloadzip', (req, res) => {
  let filePath = `./uploads/${req.query.fileName}`
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err)
    res.contentType("application/octet-stream")
    res.send(data)
  })
})

app.get('/api/searchLect', (req, res) => {
  let selectStr = ` SELECT aula.*, usuarios.nome, usuarios.sobrenome,complecaoAula.completada
  FROM aula
  LEFT JOIN usuarios 
  ON aula.idUsuarioCriador=usuarios.id
  LEFT JOIN complecaoAula
  ON complecaoAula.idUsuario = usuarios.id AND complecaoAula.idAula = aula.id
  WHERE materia LIKE '%${req.query.materia}%' 
  AND tipo LIKE '%${req.query.tipo}%' 
  AND titulo LIKE '%${req.query.titulo}%'
  AND assunto LIKE '%${req.query.assunto}%'
  ORDER BY aula.id;`

  con.query(selectStr, (err, result) => {
    if (err) console.log("Busca aula err: ", err)

    res.send(JSON.stringify(result))
  })
})

app.post('/api/completeLect', (req, res) => {
  let postData = req.body
  const insertString = `INSERT INTO complecaoAula(idAula, idUsuario, completada) VALUES (${postData.idAula}, ${postData.idUser}, 1)`
  con.query(insertString, (err) => {
    if (err) {
      console.log(err)
      return err
    }
    res.sendStatus(200)
  })
})

app.post('/api/updateInfo', (req, res) => {
  let postData = req.body
  let updateStr = ''
  if (postData.senha === 'default') {
    updateStr = `UPDATE usuarios SET 
  nome='${postData.nome}', sobrenome='${postData.sobrenome}',
  dataNasc='${postData.data}', cep='${postData.cep}',
  cidade='${postData.cidade}', estado='${postData.estado}' WHERE id=${postData.id}`
  } else {
    updateStr = `UPDATE usuarios SET 
  nome='${postData.nome}', sobrenome='${postData.sobrenome}',
  dataNasc='${postData.data}', cep='${postData.cep}',
  cidade='${postData.cidade}', estado='${postData.estado}',
  senha='${sha512(postData.senha)}' WHERE id=${postData.id}`
  }
  con.query(updateStr, err => {
    if (err) {
      console.log(err)
      return err
    }
    res.sendStatus(200)
  })


})


app.post('/api/insereAtividade', (req, res) => {
  let postData = req.body
  const insertStr = `INSERT INTO atividade
    (idUsuarioCriador,
    titulo,materia,
    assunto,tipo,jsonAtividade,pontuacao) VALUES
    (${postData.id}, '${postData.titulo}',
    '${postData.materia}', '${postData.assunto}',
    '${postData.tipo}', '${postData.activitieJson}',
    ${postData.pontuacao});`
  con.query(insertStr, err => {
    if (err) {
      console.log(err)
      return err
    }
    res.sendStatus(200)
  })
})

app.get('/api/getActivities', (req, res) => {
  const selectStr = `SELECT * FROM atividade WHERE idUsuarioCriador=${req.query.id}`
  con.query(selectStr, (err, results) => {
    if (err) {
      console.log(err)
      return err
    }
    res.send(JSON.stringify(results))
  })
})

app.post('/api/updateScore', (req, res) => {
  const postData = req.body
  const checkCompletionStr = `SELECT * FROM complecaoAtividade WHERE idUsuario=${postData.idUser} AND idAtividade=${postData.id}`
  con.query(checkCompletionStr, (err, result1) => {
    if (err) {
      console.log(err)
      return err
    }
    if (result1.length === 0) {
      let insertStr = ''
      if (postData.resposta === undefined) {
        insertStr = `INSERT INTO complecaoAtividade
        (idUsuario,idAtividade,statusAtividade) VALUES (${postData.idUser}, ${postData.id}, '${postData.status}');`
      } else {
        insertStr = `INSERT INTO complecaoAtividade
        (idUsuario,idAtividade,statusAtividade, resposta) VALUES (${postData.idUser}, ${postData.id}, '${postData.status}', '${postData.resposta}');`

      }
      con.query(insertStr, (errInsert) => {
        if (errInsert) {
          console.log(errInsert)
          return errInsert
        }
        let points = 0
        if (postData.status === 'Finalizada') {
          points = postData.points
        }
        const updateStr = `UPDATE usuarios SET pontuacao = pontuacao + ${points} WHERE id=${postData.idUser};`
        con.query(updateStr, updateErr => {
          if (updateErr) {
            console.log(updateErr)
            return updateErr
          }
          res.sendStatus(200)
        })
      })
    } else {
      res.sendStatus(403)
    }
  })
})

app.get('/api/getSubmissions', (req, res) => {
  const selectStr = `SELECT c.*,
   a.jsonAtividade,
   a.titulo,
   a.pontuacao,
   u.nome,
   u.sobrenome
   FROM complecaoAtividade AS c
   LEFT JOIN atividade AS a ON a.id=c.idAtividade
   LEFT JOIN usuarios AS u ON u.id=c.idUsuario 
   WHERE a.idUsuarioCriador=${req.query.id} AND c.statusAtividade='Pendente';`
  con.query(selectStr, (err, result) => {
    if (err) {
      console.log(err)
      return err
    }
    res.send(JSON.stringify(result))
  })
})

app.post('/api/updateSubmit', (req, res) => {
  let postData = req.body
  const updateStr = `UPDATE complecaoAtividade 
  SET statusAtividade='Finalizada', feedback='${postData.feedback}'
  WHERE idAtividade=${postData.idAtividade} AND idUsuario=${postData.idAluno};`
  con.query(updateStr, (err) => {
    if (err) {
      console.log(err)
      return err
    }
    const updatePoints = `UPDATE usuarios SET pontuacao = pontuacao + ${postData.pontuacaoFinal}
    WHERE id=${postData.idAluno};`
    con.query(updatePoints, errPoints => {
      if (err) {
        console.log(err)
        return err
      }
      res.sendStatus(200)
    })
  })
})

app.get('/api/searchActivities', (req, res) => {
  const selectStr = `SELECT a.*, u.nome, u.sobrenome, c.statusAtividade FROM atividade AS a 
  LEFT JOIN usuarios AS u ON a.idUsuarioCriador = u.id
  LEFT JOIN complecaoAtividade as c ON c.idUsuario = u.id AND a.id = c.idAtividade 
  WHERE a.titulo LIKE '%${req.query.titulo}%' AND a.materia LIKE'%${req.query.materia}%'
  AND a.assunto LIKE '%${req.query.assunto}%'`

  con.query(selectStr, (err, result) => {
    if (err) {
      console.log(err)
      return (err)
    }
    //res.send(JSON.stringify(result))
    res.send(JSON.stringify(result))
  })
})