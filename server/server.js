const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/mensagem", (req, res) => {
  var sql = require("mssql");
  const config = {
    user: "sa",
    password: "Surubafoda98",
    server: "localhost",
    database: "plataforma"
  };
  sql.close()
  sql.connect(config, err => {
    if (err) console.log("Erro!: " + err);

    var request = new sql.Request();
    request.query("select * from usuarios", (err, recordset) => {
      if (err) console.log(err);
      //Resposta do db encontrada
      res.send(recordset);
    });
  });
});

app.post("/api/insereConta", (req, res)=>{
  var postData = req.body
  sql.close()
  sql.connect(config, err =>{
    if(err) console.log("Erro! "+err)

    var request = new sql.Request()
    request.query("insert into usuarios (id, permissao, nome, sobrenome, email, cidade, cep, estado, senha) values (2,1,"+postData.nome+","+postData.sobrenome+
    ","+postData.email+","+postData.cidade+","+postData.cep+","+postData.estado+","+postData.senha+")", (error, results, fields)=>{
      if(error) throw error
      res.end(JSON.stringify(results))
    })
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
