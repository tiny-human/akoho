-- =============================================
-- Script de création + données de test
-- Base: akoho (élevage de poulets)
-- =============================================

-- Créer la base si elle n'existe pas
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'akoho')
  CREATE DATABASE akoho;
GO

USE akoho;
GO

-- =============================================
-- SUPPRESSION des tables (ordre inverse des FK)
-- =============================================
IF OBJECT_ID('mort', 'U') IS NOT NULL DROP TABLE mort;
IF OBJECT_ID('lot_oeuf', 'U') IS NOT NULL DROP TABLE lot_oeuf;
IF OBJECT_ID('oeuf', 'U') IS NOT NULL DROP TABLE oeuf;
IF OBJECT_ID('conf_poids', 'U') IS NOT NULL DROP TABLE conf_poids;
IF OBJECT_ID('conf_prix', 'U') IS NOT NULL DROP TABLE conf_prix;
IF OBJECT_ID('lot', 'U') IS NOT NULL DROP TABLE lot;
IF OBJECT_ID('race', 'U') IS NOT NULL DROP TABLE race;
GO

-- =============================================
-- CRÉATION DES TABLES
-- =============================================
CREATE TABLE race (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL
);
GO

CREATE TABLE lot (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idRace INT NOT NULL,
    quantite INT NOT NULL,
    age INT,
    date_enregistrement DATE NOT NULL,
    prix_achat DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_lot_race FOREIGN KEY (idRace) REFERENCES race(id)
);
GO

CREATE TABLE conf_prix (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idRace INT NOT NULL,
    PU_sakafo DECIMAL(10,2) NOT NULL,
    PV DECIMAL(10,2) NOT NULL,
    PV_oeuf DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_conf_prix_race FOREIGN KEY (idRace) REFERENCES race(id)
);
GO

CREATE TABLE oeuf (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idLot INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    CONSTRAINT FK_oeuf_lot FOREIGN KEY (idLot) REFERENCES lot(id)
);
GO

CREATE TABLE conf_poids (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idRace INT NOT NULL,
    semaine INT NOT NULL,
    poids DECIMAL(10,2) NOT NULL,
    sakafo DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_conf_poids_race FOREIGN KEY (idRace) REFERENCES race(id)
);
GO

CREATE TABLE lot_oeuf (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idOeuf INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    quantite INT NOT NULL,
    CONSTRAINT FK_lot_oeuf_oeuf FOREIGN KEY (idOeuf) REFERENCES oeuf(id)
);
GO

CREATE TABLE mort (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idLot INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    CONSTRAINT FK_mort_lot FOREIGN KEY (idLot) REFERENCES lot(id)
);
GO

-- =============================================
-- DONNÉES DE TEST
-- =============================================

-- 3 races
INSERT INTO race (name) VALUES ('Akoho Gasy');      -- id=1
INSERT INTO race (name) VALUES ('Brahma');           -- id=2
INSERT INTO race (name) VALUES ('Rhode Island');     -- id=3
GO

-- Configuration des prix par race
--   PU_sakafo = prix unitaire du kilo de nourriture
--   PV        = prix de vente par kilo de poulet vivant
--   PV_oeuf   = prix de vente par oeuf
INSERT INTO conf_prix (idRace, PU_sakafo, PV, PV_oeuf) VALUES (1, 1500, 12000, 500);
INSERT INTO conf_prix (idRace, PU_sakafo, PV, PV_oeuf) VALUES (2, 2000, 18000, 800);
INSERT INTO conf_prix (idRace, PU_sakafo, PV, PV_oeuf) VALUES (3, 1800, 15000, 600);
GO

-- Configuration poids par race et semaine
-- poids = poids moyen en kg à cette semaine
-- sakafo = consommation de nourriture en kg pour la semaine entière
-- Race 1 : Akoho Gasy (petits poulets locaux, croissance lente)
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 0,  0.05, 0);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 1, 0.08, 0.10);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 2, 0.15, 0.18);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 3, 0.25, 0.28);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 4, 0.38, 0.40);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 5, 0.52, 0.55);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 6, 0.68, 0.70);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 7, 0.85, 0.85);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 8, 1.00, 1.00);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 9, 1.15, 1.10);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 10, 1.30, 1.20);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 11, 1.42, 1.25);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 12, 1.50, 1.30);

-- Race 2 : Brahma (gros poulets, croissance rapide)
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 0,  0.05, 0);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 1, 0.12, 0.15);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 2, 0.25, 0.30);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 3, 0.45, 0.50);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 4, 0.70, 0.75);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 5, 1.00, 1.05);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 6, 1.35, 1.40);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 7, 1.75, 1.80);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 8, 2.15, 2.10);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 9, 2.55, 2.40);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 10, 2.90, 2.70);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 11, 3.20, 2.90);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (2, 12, 3.50, 3.00);

-- Race 3 : Rhode Island (taille moyenne, bonne pondeuse)
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 0,  0.05, 0);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 1, 0.10, 0.12);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 2, 0.20, 0.24);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 3, 0.35, 0.38);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 4, 0.55, 0.58);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 5, 0.78, 0.80);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 6, 1.00, 1.00);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 7, 1.25, 1.20);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 8, 1.50, 1.40);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 9, 1.72, 1.55);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 10, 1.90, 1.70);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 11, 2.05, 1.80);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (3, 12, 2.20, 1.85);
GO

-- 4 Lots de poulets
-- Lot 1: 100 Akoho Gasy, acheté il y a 8 semaines (poussins age=0)
INSERT INTO lot (idRace, quantite, age, date_enregistrement, prix_achat)
VALUES (1, 100, 0, '2026-01-12', 50000);

-- Lot 2: 50 Brahma, acheté il y a 5 semaines (poussins age=0)
INSERT INTO lot (idRace, quantite, age, date_enregistrement, prix_achat)
VALUES (2, 50, 0, '2026-02-02', 75000);

-- Lot 3: 80 Rhode Island, acheté il y a 3 semaines à age=2 semaines
INSERT INTO lot (idRace, quantite, age, date_enregistrement, prix_achat)
VALUES (3, 80, 2, '2026-02-16', 120000);

-- Lot 4: 30 Akoho Gasy, acheté il y a 1 semaine (poussins age=0)
INSERT INTO lot (idRace, quantite, age, date_enregistrement, prix_achat)
VALUES (1, 30, 0, '2026-03-02', 15000);
GO

-- Mortalités
-- Lot 1: 5 morts semaine 3, 2 morts semaine 6
INSERT INTO mort (idLot, quantite, date_enregistrement) VALUES (1, 5, '2026-02-02');
INSERT INTO mort (idLot, quantite, date_enregistrement) VALUES (1, 2, '2026-02-23');

-- Lot 2: 3 morts semaine 2
INSERT INTO mort (idLot, quantite, date_enregistrement) VALUES (2, 3, '2026-02-16');

-- Lot 3: 1 mort semaine 1 (après achat)
INSERT INTO mort (idLot, quantite, date_enregistrement) VALUES (3, 1, '2026-02-23');

-- Lot 4: pas de mort encore
GO

-- Oeufs pondus (surtout lot 1 et lot 3 qui sont les plus vieux)
-- Lot 1 : commence à pondre vers semaine 6-7
INSERT INTO oeuf (idLot, quantite, date_enregistrement) VALUES (1, 12, '2026-02-23');   -- id=1
INSERT INTO oeuf (idLot, quantite, date_enregistrement) VALUES (1, 18, '2026-03-02');   -- id=2
INSERT INTO oeuf (idLot, quantite, date_enregistrement) VALUES (1, 22, '2026-03-07');   -- id=3

-- Lot 3 : Rhode Island bonne pondeuse, commence tôt
INSERT INTO oeuf (idLot, quantite, date_enregistrement) VALUES (3, 15, '2026-03-02');   -- id=4
INSERT INTO oeuf (idLot, quantite, date_enregistrement) VALUES (3, 20, '2026-03-07');   -- id=5

-- Lot 2 et 4 : pas encore de ponte
GO

-- Oeufs éclos (lot_oeuf) — certains oeufs du lot 1 ont éclos
-- 8 oeufs du lot d'oeufs id=1 (12 oeufs pondus le 23/02) ont éclos
INSERT INTO lot_oeuf (idOeuf, date_enregistrement, quantite) VALUES (1, '2026-03-06', 8);

-- 5 oeufs du lot d'oeufs id=2 (18 oeufs pondus le 02/03) ont éclos
INSERT INTO lot_oeuf (idOeuf, date_enregistrement, quantite) VALUES (2, '2026-03-09', 5);
GO

-- Vérification rapide
SELECT 'race' AS tbl, COUNT(*) AS nb FROM race
UNION ALL SELECT 'lot', COUNT(*) FROM lot
UNION ALL SELECT 'conf_prix', COUNT(*) FROM conf_prix
UNION ALL SELECT 'conf_poids', COUNT(*) FROM conf_poids
UNION ALL SELECT 'oeuf', COUNT(*) FROM oeuf
UNION ALL SELECT 'lot_oeuf', COUNT(*) FROM lot_oeuf
UNION ALL SELECT 'mort', COUNT(*) FROM mort;
GO

SELECT * FROM race;