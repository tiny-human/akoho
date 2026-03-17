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

CREATE TABLE oeuf_dechet(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idOeuf INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    CONSTRAINT FK_oeuf_dechet_oeuf FOREIGN KEY (idOeuf) REFERENCES oeuf(id)
);


-- Colonnes supplémentaires pour race (snake_case)
IF COL_LENGTH('race','jours_incubation') IS NULL
    ALTER TABLE race ADD jours_incubation INT NULL;
IF COL_LENGTH('race','taux_eclosion') IS NULL
    ALTER TABLE race ADD taux_eclosion DECIMAL(5,2) NULL;
IF COL_LENGTH('race','taux_femelle') IS NULL
    ALTER TABLE race ADD taux_femelle DECIMAL(5,2) NULL;
IF COL_LENGTH('race','taux_mort_femelle') IS NULL
    ALTER TABLE race ADD taux_mort_femelle DECIMAL(5,2) NULL;
IF COL_LENGTH('race','taux_mort_male') IS NULL
    ALTER TABLE race ADD taux_mort_male DECIMAL(5,2) NULL;
IF COL_LENGTH('race','capacite_ponte') IS NULL
    ALTER TABLE race ADD capacite_ponte INT NULL;
GO

-- Colonnes supplémentaires pour lot (snake_case)
IF COL_LENGTH('lot','nb_femelles') IS NULL
    ALTER TABLE lot ADD nb_femelles INT NULL;
IF COL_LENGTH('lot','nb_males') IS NULL
    ALTER TABLE lot ADD nb_males INT NULL;
IF COL_LENGTH('lot','potentiel_oeufs_total') IS NULL
    ALTER TABLE lot ADD potentiel_oeufs_total INT NULL;
IF COL_LENGTH('lot','perte_eclosion') IS NULL
    ALTER TABLE lot ADD perte_eclosion DECIMAL(5,2) NULL;
GO

-- Colonnes supplémentaires pour mort (snake_case)
IF COL_LENGTH('mort','nb_femelles') IS NULL
    ALTER TABLE mort ADD nb_femelles INT NULL;
IF COL_LENGTH('mort','nb_males') IS NULL
    ALTER TABLE mort ADD nb_males INT NULL;
GO