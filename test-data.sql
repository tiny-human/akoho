USE akoho;
GO

INSERT INTO race (name, joursIncubation, tauxEclosion, tauxFemelle, tauxMortFemelle, tauxMortMale, capacitePonte)
VALUES ('borboneze', 21, 85.00, 50.00, 30,70,5);
GO

-- Configuration des prix par race
--   PU_sakafo = prix unitaire du kilo de nourriture
--   PV        = prix de vente par kilo de poulet vivant
--   PV_oeuf   = prix de vente par oeuf
INSERT INTO conf_prix (idRace, PU_sakafo, PV, PV_oeuf) VALUES (1, 5, 15, 500);
GO

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
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 24, 100, 750);    
INSERT INTO conf_poids (idRace, semaine, poids, sakafo) VALUES (1, 25, 0, 600);
GO