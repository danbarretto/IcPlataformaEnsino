var express = require("express");
var app = express();
var sql = require("mssql");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
var localStrategy = require("passport-local").Strategy;

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
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new localStrategy(
    { passReqToCallback: true, usernameField: "email" },
    (req, email, password, done) => {
		console.log('called local');
		sql.close();
		sql.connect(config, (err, client)=>{
			console.log("called local - sql");
			var user = {};
			var query = client.query("SELECT * FROM usuarios WHERE email='"+email+"'");
			query.on('row', (row)=>{
				console.log('User obj: ', row);
				console.log("Password: ", password);
				user = row;
				if(password == user.password){
					console.log('MATCH!');
					done(null, user);
				}else{
					done(null, false, {message:"Email ou senha incorretos"})
				}
			})
			query.on('end', ()=>{
				client.end();
			})
			if(err){
				console.log(err);
			}
		})
	}
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("called deserializedUser");
  sql.close();
  sql.connect(config, function(err, client) {
    var user = {};
	console.log("called deserializeUser - pg");
    var query = client.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    query.on("row", function(row) {
      console.log("User row", row);
      user = row;
      done(null, user);
    });

    // After all data is returned, close connection and return results
    query.on("end", function() {
      client.end();
    });

    // Handle Errors
    if (err) {
      console.log(err);
    }
  });
});



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

app.post("/api/login", (req, res)=>{
	passport.authenticate('local', {
		successRedirect:'/aulas',
		failureRedirect:'/'
	})
})

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
      "','" +
      id;
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
