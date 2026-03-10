CREATE DATABASE akoho;
GO

USE akoho;
GO

CREATE TABLE race (id INT IDENTITY(1,1) PRIMARY KEY,name NVARCHAR(255) NOT NULL);
GO

CREATE TABLE lot(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idRace INT NOT NULL,
    quantite INT NOT NULL,
    age INT,
    date_enregistrement DATE NOT NULL,
    prix_achat DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_lot_race FOREIGN KEY (idRace) REFERENCES race(id)
);

CREATE TABLE conf_prix(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idRace INT NOT NULL,
    PU_sakafo DECIMAL(10,2) NOT NULL,
    PV DECIMAL(10,2) NOT NULL,
    PV_oeuf DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_conf_prix_race FOREIGN KEY (idRace) REFERENCES race(id)
);

CREATE TABLE oeuf(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idLot INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    CONSTRAINT FK_oeuf_lot FOREIGN KEY (idLot) REFERENCES lot(id)
);

CREATE TABLE conf_poids(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idRace INT NOT NULL,
    semaine INT NOT NULL,
    poids DECIMAL(10,2) NOT NULL,
    sakafo DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_conf_poids_race FOREIGN KEY (idRace) REFERENCES race(id)
);

CREATE TABLE lot_oeuf(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idOeuf INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    quantite INT NOT NULL,
    CONSTRAINT FK_lot_oeuf_oeuf FOREIGN KEY (idOeuf) REFERENCES oeuf(id)
);

CREATE TABLE mort(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idLot INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    CONSTRAINT FK_mort_lot FOREIGN KEY (idLot) REFERENCES lot(id)
);
