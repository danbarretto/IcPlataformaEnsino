 DROP DATABASE plataforma;

 CREATE DATABASE plataforma;
 CREATE TABLE usuarios(
     id int auto_increment not null,
     primary key(id),
     permissao smallint not null,
     nome varchar(30) not null,
     sobrenome varchar(30) not null,
     email varchar(50) not null,
     cidade varchar(50),
     estado varchar(2),
     cep varchar(10),
     senha varchar(300),
     cpf varchar(15),
     dataNasc varchar(10),
     pontuacao int
 );
 CREATE TABLE aula(
     id int auto_increment not null,
     primary key(id),
     idUsuarioCriador int not null,
     FOREIGN KEY (idUsuarioCriador) REFERENCES usuarios(id),
     titulo varchar(100),
     materia varchar(30),
     assunto varchar(50),
     tipo varchar(15),
     conteudoTexto TEXT,
     caminhoArquivo varchar(200)
 );



 CREATE TABLE atividade(
     id int auto_increment not null,
     primary key (id),
     idUsuarioCriador int not null,
     FOREIGN KEY (idUsuarioCriador) REFERENCES usuarios(id),
     titulo varchar(100),
     materia varchar(30),
     assunto varchar(50),
     tipo varchar(50),
     jsonAtividade TEXT,
     pontuacao int
 );



 CREATE TABLE complecaoAula(
     idAula int not null,
     FOREIGN KEY (idAula) REFERENCES aula(id),
     idUsuario int not null,
     FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
     completada boolean not null
 );

  CREATE TABLE complecaoAtividade(
     idAtividade int not null,
     FOREIGN KEY (idAtividade) REFERENCES atividade(id),
     idUsuario int not null,
     FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
     statusAtividade varchar(20),
     resposta TEXT
 );

