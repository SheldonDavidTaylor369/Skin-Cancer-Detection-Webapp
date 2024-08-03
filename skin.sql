CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,  -- Adjusted length to accommodate bcrypt hashes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
