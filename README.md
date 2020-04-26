# Projeto NodeJS para Google Cloud (FULL)

O objetivo deste projeto é explorar todos a grande maioria dos recursos do Google Cloud, para consumir uma aplicação completa (CRUD). Considerando recursos de **Backend** e **Frontend**, assim como explorar o uso de **GC SQL** e upload de arquivos para um **GC Storage**.

Bem como documentar detalhadamente todos os passos e códigos executados em cada etapa do Projeto.

> Contribuições sempre serão bem vindas.

## Stack Inicial do Projeto
##### Backend
> Express + Knex

##### Frontend
> ReactJS

## BACKEND
### Pacotes
| Código                     | Descrição                                    |
|--------------------------- |----------------------------------------------|
|```npm init -y ```          | Inicializando o projeto                      |
|```npm install express ```  | Instalando pacote Express                    |
|```npm install nodemon -D```| Instalando pacote Nodemon (ambiente dev)     |
|```npm install knex ```     | Instalando pacote Knex (BD)                  |
|```npm install mysql ```    | Instalando o pacote do MySQL para Knex       |
|```npx knex init ```        | Executando pacote Knex                       |
|```npm install dotenv ```   | Pacote para trabalhar com parametros config  |
|```npm install cors ```     | Pacote Middleware para rotas                 |
|```npm install express-validator```| Pacote para validações                 |


### Estrutura do Banco de Dados
```
-- -----------------------------------------------------
-- Create Database
-- -----------------------------------------------------
CREATE DATABASE `gc_projeto_01` /*!40100 COLLATE 'utf8_general_ci' */


-- -----------------------------------------------------
-- Table  `niveisacesso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS  `niveisacesso` (
  `id` INT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table  `usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS  `usuarios` (
  `id` INT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `login` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `nivel_id` INT NOT NULL,
  `foto` VARCHAR(250) NULL,
  `per_ler` VARCHAR(3) NULL,
  `per_salvar` VARCHAR(3) NULL,
  `per_atualizar` VARCHAR(3) NULL,
  `per_deletar` VARCHAR(3) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_niveisacesso1_idx` (`nivel_id` ASC),
  CONSTRAINT `fk_usuarios_niveisacesso1`
    FOREIGN KEY (`nivel_id`)
    REFERENCES  `niveisacesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table  `menus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS  `menus` (
  `id` INT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NULL,
  `link` VARCHAR(250) NULL,
  `icone` VARCHAR(250) NULL,
  `tipo` VARCHAR(3) NULL,
  `menu_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table  `menus_niveis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS  `menus_niveis` (
  `id` INT NULL AUTO_INCREMENT,
  `nivelacesso_id` INT NOT NULL,
  `menu_id` INT NOT NULL,
  `ordem` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_niveisacesso_has_menus_menus1_idx` (`menu_id` ASC),
  INDEX `fk_niveisacesso_has_menus_niveisacesso1_idx` (`nivelacesso_id` ASC),
  CONSTRAINT `fk_niveisacesso_has_menus_niveisacesso1`
    FOREIGN KEY (`nivelacesso_id`)
    REFERENCES  `niveisacesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_niveisacesso_has_menus_menus1`
    FOREIGN KEY (`menu_id`)
    REFERENCES  `menus` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

```


## FRONTEND
### Pacotes
| Código                     | Descrição                                    |
|--------------------------- |----------------------------------------------|
|```npx create-react-app ``` | Inicializando o projeto React                |
|```npm install react-icons``` | Instalando o pacote de icones do React     |
|```npm install react-router-dom``` | Instalando o pacote de Rotas do React |

