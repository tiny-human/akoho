

-- 3 races
INSERT INTO race (name) VALUES ('borboneze');      -- id=1
GO

-- Configuration des prix par race
--   PU_sakafo = prix unitaire du kilo de nourriture
--   PV        = prix de vente par kilo de poulet vivant
--   PV_oeuf   = prix de vente par oeuf
INSERT INTO conf_prix (idRace, PU_sakafo, PV, PV_oeuf) VALUES (1, 5, 15, 500);


-- Configuration poids par race et semaine
-- poids = poids moyen en kg à cette semaine
-- sakafo = consommation de nourriture en kg pour la semaine entière
-- Race 1 : Akoho Gasy (petits poulets locaux, croissance lente)
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 0,  50, 0);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 1, 20, 75);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 2, 25, 80);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 3, 30, 100);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 4, 40, 150);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 5, 80, 170);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 6, 85, 190);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 7, 100, 200);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 8, 100, 250);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 9, 90, 270);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 10, 140, 290);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 11, 200, 300);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 12, 220, 370);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 13, 265, 390);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 14, 285, 350);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 15, 300, 300);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 16, 350, 450);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 17, 400, 500);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 18, 420, 400);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 19, 430, 500);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 20, 500, 500);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 21, 530, 650);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 22, 600, 600);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 23, 400, 750);
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1,  24, 100, 750);    
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 25, 0, 600);

-- Vérification rapide
SELECT 'race' AS tbl, COUNT(*) AS nb FROM race
UNION ALL SELECT 'lot', COUNT(*) FROM lot
UNION ALL SELECT 'conf_prix', COUNT(*) FROM conf_prix
UNION ALL SELECT 'conf_poids', COUNT(*) FROM conf_poids
UNION ALL SELECT 'oeuf', COUNT(*) FROM oeuf
UNION ALL SELECT 'lot_oeuf', COUNT(*) FROM lot_oeuf
UNION ALL SELECT 'mort', COUNT(*) FROM mort;
GO

IF COL_LENGTH('race', 'jours_incubation') IS NULL
    ALTER TABLE race ADD jours_incubation INT NULL;
IF COL_LENGTH('race', 'taux_eclosion') IS NULL
    ALTER TABLE race ADD taux_eclosion DECIMAL(5,2) NULL;
IF COL_LENGTH('race', 'taux_femelle') IS NULL
    ALTER TABLE race ADD taux_femelle DECIMAL(5,2) NULL;
IF COL_LENGTH('race', 'taux_mort_femelle') IS NULL
    ALTER TABLE race ADD taux_mort_femelle DECIMAL(5,2) NULL;
IF COL_LENGTH('race', 'taux_mort_male') IS NULL
    ALTER TABLE race ADD taux_mort_male DECIMAL(5,2) NULL;
IF COL_LENGTH('race', 'capacite_ponte') IS NULL
    ALTER TABLE race ADD capacite_ponte INT NULL;
GO

IF COL_LENGTH('lot', 'nb_femelles') IS NULL
    ALTER TABLE lot ADD nb_femelles INT NULL;
IF COL_LENGTH('lot', 'nb_males') IS NULL
    ALTER TABLE lot ADD nb_males INT NULL;
IF COL_LENGTH('lot', 'potentiel_oeufs_total') IS NULL
    ALTER TABLE lot ADD potentiel_oeufs_total INT NULL;
IF COL_LENGTH('lot', 'perte_eclosion') IS NULL
    ALTER TABLE lot ADD perte_eclosion DECIMAL(12,2) NULL;
GO

IF COL_LENGTH('mort', 'nb_femelles') IS NULL
    ALTER TABLE mort ADD nb_femelles INT NULL;
IF COL_LENGTH('mort', 'nb_males') IS NULL
    ALTER TABLE mort ADD nb_males INT NULL;
GO

/* 2) UPDATE de ta race existante (id = 1) */
UPDATE race
SET
    name = 'borboneze',
    jours_incubation = 21,
    taux_eclosion = 100.00,
    taux_femelle = 50.00,
    taux_mort_femelle = 30.00,
    taux_mort_male = 70.00,
    capacite_ponte = 5
WHERE id = 1;
GO

/* 3) UPDATE de ton lot existant (id = 1)
   lot actuel: 1 | idRace=1 | quantite=500 | age=0 | 2026-01-01 | 250000.00
*/
UPDATE lot
SET
    nb_femelles = ROUND(quantite * 0.50, 0),              -- 250
    nb_males = quantite - ROUND(quantite * 0.50, 0),      -- 250
    potentiel_oeufs_total = ROUND(quantite * 0.50, 0) * 5,-- 1250 (250 femelles * capacité 5)
    perte_eclosion = ISNULL(perte_eclosion, 0)            -- parent: pas de perte d'éclosion
WHERE id = 1;
GO

/* 4) UPDATE de ton mort existant (id = 1)
   mort actuel: 1 | idLot=1 | quantite=15 | 2026-02-01
   répartition selon taux_mort_femelle de la race du lot
*/
UPDATE m
SET
    nb_femelles = ROUND(m.quantite * ISNULL(r.taux_mort_femelle, 30) / 100.0, 0),
    nb_males = m.quantite - ROUND(m.quantite * ISNULL(r.taux_mort_femelle, 70) / 100.0, 0)
FROM mort m
JOIN lot l  ON l.id = m.idLot
JOIN race r ON r.id = l.idRace
WHERE m.id = 1;
GO