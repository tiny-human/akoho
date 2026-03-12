CREATE TABLE oeuf_dechet(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idOeuf INT NOT NULL,
    quantite INT NOT NULL,
    date_enregistrement DATE NOT NULL,
    CONSTRAINT FK_oeuf_dechet_oeuf FOREIGN KEY (idOeuf) REFERENCES oeuf(id)
);
GO