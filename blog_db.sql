CREATE DATABASE IF NOT EXISTS blog_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog_db;

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS autores;

CREATE TABLE autores (
  id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email  VARCHAR(150) NOT NULL,
  imagen VARCHAR(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_autores_email (email)
) ENGINE=InnoDB;

CREATE TABLE posts (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo         VARCHAR(200) NOT NULL,
  descripcion    TEXT NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoria      VARCHAR(80) NOT NULL,
  autor_id       INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_posts_autor FOREIGN KEY (autor_id)
    REFERENCES autores (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

INSERT INTO autores (nombre, email, imagen) VALUES
  ('Laura Gómez', 'laura@blog.com', 'https://i.pravatar.cc/150?img=1'),
  ('Carlos Ruiz', 'carlos@blog.com', 'https://i.pravatar.cc/150?img=2');

INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES
  ('Primeros pasos con Express', 'Introducción a ExpressJS.', 'Backend', 1),
  ('SQL para principiantes', 'SELECT, JOIN e INSERT.', 'Bases de datos', 1),
  ('Relaciones en MySQL', 'Claves primarias y externas.', 'Bases de datos', 2);