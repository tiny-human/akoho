CREATE DATABASE akoho;
USE akoho;
GO

CREATE TABLE race (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(255) NOT NULL
);

CREATE TABLE lot(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idRace INT NOT NULL,
    quantite INT NOT NULL,
    age INT ,
    date_enregistrement DATE NOT NULL,
    prix_achat DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idRace) REFERENCES race(id)
);

CREATE TABLE conf_prix(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idRace INT NOT NULLL,
    PU_sakafo DECIMAL(10, 2) NOT NULL,
    PV DECIMAL(10, 2) NOT NULL,
    PV_oeuf DECIMAL(10, 2) NOT NULL
    FOREIGN KEY (idRace) REFERENCES race(id)
);

CREATE TABLE oeuf(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idLot INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    FOREIGN KEY (idLot) REFERENCES lot(id)
);

CREATE TABLE conf_poids(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idRace INT NOT NULL,
    semaine INT NOT NULL,
    poids DECIMAL(10, 2) NOT NULL,
    sakafo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idRace) REFERENCES race(id)
);  

CREATE TABLE lot_oeuf(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idOeuf INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    FOREIGN KEY (idOeuf) REFERENCES oeuf(id)
);

CREATE TABLE mort(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idLot INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    FOREIGN KEY (idLot) REFERENCES lot(id)
);