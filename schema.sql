DROP TABLE IF EXISTS movie;
CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(255),
    poster_path VARCHAR(1000),
    overview VARCHAR(10000),
    feedback VARCHAR(1000)
);