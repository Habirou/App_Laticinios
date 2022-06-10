drop database if exists bd_laticinios;
create database bd_laticinios;
use bd_laticinios;

DROP TABLE IF EXISTS logins;
CREATE TABLE logins (
  loginId int NOT NULL AUTO_INCREMENT,
  email varchar(50) UNIQUE NOT NULL ,
  password varchar(256) UNIQUE NOT NULL,
  PRIMARY KEY (loginId)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  userId int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  typePerson tinyint(1) NOT NULL,
  loginId int NOT NULL,
  PRIMARY KEY (userId),
  FOREIGN KEY (loginId) REFERENCES logins(loginId)
);

DROP TABLE IF EXISTS addresses;
CREATE TABLE addresses (
  addressId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  zipCode varchar(9) NOT NULL,
  city varchar(50) NOT NULL,
  district varchar(50) NOT NULL,
  street varchar(50) NOT NULL,
  estate varchar(2) NOT NULL,
  numero varchar(6) NOT NULL,
  complement varchar(50) NOT NULL,
  phone varchar(12) NOT NULL,
  PRIMARY KEY (addressId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);


DROP TABLE IF EXISTS typepersons;
CREATE TABLE typepersons (
  typePersonId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  typePerson int NOT NULL,
  activeUser tinyint(1) NOT NULL,
  PRIMARY KEY (typePersonId),
  FOREIGN KEY (userId) REFERENCES addresses (addressId)
);


DROP TABLE IF EXISTS acess;
CREATE TABLE acess (
  acessId int NOT NULL AUTO_INCREMENT,
  typePersonId int NOT NULL,
  loginId int NOT NULL,
  TimestampLogin timestamp NOT NULL,
  TimestampLogout timestamp NOT NULL,
  PRIMARY KEY (acessId),
  FOREIGN KEY (typePersonId) REFERENCES typepersons (typePersonId),
  FOREIGN KEY (loginId) REFERENCES logins (loginId)
);



DROP TABLE IF EXISTS checklists;
CREATE TABLE checklists (
  checklistId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  Title varchar(500) NOT NULL,
  dateTimeResponse timestamp NOT NULL,
  latitude decimal(10,8) NOT NULL,
  longitude decimal(11,8) NOT NULL,
  PRIMARY KEY (checklistId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  questionId int NOT NULL AUTO_INCREMENT,
  checklistId int NOT NULL,
  questionContext varchar(50) NOT NULL,
  questinText varchar(1500) NOT NULL,
  PRIMARY KEY (questionId),
  FOREIGN KEY (checklistId) REFERENCES checklists (checklistId)
);

DROP TABLE IF EXISTS responses;
CREATE TABLE responses (
  responseId int NOT NULL AUTO_INCREMENT,
  questionId int NOT NULL,
  userId int NOT NULL,
  observation varchar(1500) NOT NULL,
  PRIMARY KEY (responseId),
  FOREIGN KEY (userId) REFERENCES users (userId),
  FOREIGN KEY (questionId) REFERENCES questions (questionId)
);




DROP TABLE IF EXISTS responseImages;
CREATE TABLE responseImages (
  responseImagesId int NOT NULL AUTO_INCREMENT,
  responseId int NOT NULL,
  imageFileName varchar(500) NOT NULL,
  PRIMARY KEY (responseImagesId),
  FOREIGN KEY (responseId) REFERENCES responses (responseId)
);



DROP TABLE IF EXISTS consultancys;
CREATE TABLE consultancys (
  consultancyId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  crmv varchar(20) NOT NULL,
  PRIMARY KEY (consultancyId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);


DROP TABLE IF EXISTS legalpersons;
CREATE TABLE legalpersons (
  legalPersonId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  corporateName varchar(255) NOT NULL,
  fantasyName varchar(255) NOT NULL,
  cnpj varchar(30) NOT NULL,
  stateRegistration varchar(30) NOT NULL,
  municipalRegistration varchar(30) NOT NULL,
  PRIMARY KEY (legalPersonId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);



DROP TABLE IF EXISTS naturalpersons;
CREATE TABLE naturalpersons (
  naturalPersonId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  cpf varchar(15) NOT NULL,
  rg varchar(15) NOT NULL,
  PRIMARY KEY (naturalPersonId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);


DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
  notificationId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  description varchar(255) NOT NULL,
  PRIMARY KEY (notificationId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);


DROP TABLE IF EXISTS rtqc;
CREATE TABLE rtqc (
  responsibleId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  councilNumber varchar(30) NOT NULL,
  bossQualityControl tinyint(1) NOT NULL,
  crq varchar(20) NOT NULL,
  PRIMARY KEY (responsibleId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);


DROP TABLE IF EXISTS rtqccrmv;
CREATE TABLE rtqccrmv (
  responsibleId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  councilNumber varchar(30) NOT NULL,
  bossQualityControl tinyint(1) NOT NULL,
  crmv varchar(20) NOT NULL,
  PRIMARY KEY (responsibleId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);


DROP TABLE IF EXISTS taxauditors;
CREATE TABLE taxauditors (
  taxAuditorId int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  registrationNumber varchar(20) NOT NULL,
  PRIMARY KEY (taxAuditorId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);




