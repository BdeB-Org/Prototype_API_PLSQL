--d�but tp
--cr�ation de la table 
CREATE TABLE clients (
    client_id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    nom VARCHAR2(50) NOT NULL,
    prenom VARCHAR2(50) NOT NULL,
    email VARCHAR2(100) UNIQUE,
    telephone VARCHAR2(20),
    adresse VARCHAR2(200),
    PRIMARY KEY (client_id)
);
--peupler la table
INSERT INTO clients (nom, prenom, email, telephone, adresse) VALUES 
('Martin', 'Jean', 'jean.martin@example.com', '5141234567', '123 rue Saint-Laurent, Montr�al, QC'),
('Lefebvre', 'Marie', 'marie.lefebvre@example.com', '5149876543', '456 avenue Mont-Royal, Montr�al, QC'),
('Dubois', 'Luc', 'luc.dubois@example.com', '4381112222', '789 rue Sherbrooke, Laval, QC'),
('Tremblay', 'Julie', 'julie.tremblay@example.com', '4503334444', '321 boulevard de Maisonneuve, Longueuil, QC'),
('Gagnon', 'Pierre', 'pierre.gagnon@example.com', '5145556666', '654 rue Saint-Denis, Montr�al, QC');


BEGIN
    ut.run('test_client_api'); --ut.run() pour tous les tests
END;




