CREATE DATABASE jogos_db;

USE jogos_db;

CREATE TABLE genero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_genero VARCHAR(100) NOT NULL,
    descricao TEXT
);

INSERT INTO genero (nome_genero, descricao) VALUES
('RPG', 'Jogos de interpretação de personagens.'),
('Ação', 'Jogos focados em combate e desafios físicos.'),
('Aventura', 'Jogos focados em exploração e narrativa.');

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    desenvolvedora VARCHAR(150) NOT NULL,
    sinopse TEXT,
    genero_id INT NOT NULL,

    CONSTRAINT fk_jogos_genero
        FOREIGN KEY (genero_id)
        REFERENCES genero(id)
);

INSERT INTO jogos (nome, desenvolvedora, sinopse, genero_id) VALUES
('The Witcher 3', 'CD Projekt Red','Um bruxo procura sua filha adotiva em um mundo de fantasia.', 1),
('God of War', 'Santa Monica Studio','Kratos e seu filho enfrentam desafios na mitologia nórdica.', 2),
('Tomb Raider', 'Crystal Dynamics','Lara Croft explora locais antigos e enfrenta perigos.', 3);