CREATE TABLE IF NOT EXISTS agents
(
    agent_id   BIGSERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name  VARCHAR NOT NULL,
    email      VARCHAR NOT NULL,
    phone      VARCHAR,
    address    VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS estates(
    estate_id BIGSERIAL,
    agent_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    property_type TEXT NOT NULL,
    address TEXT NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    garages INTEGER NOT NULL,
    land_sqm INTEGER NOT NULL,
    price INTEGER NOT NUll,
    images TEXT,
    "open" BOOLEAN NOT NULL,

    PRIMARY KEY(estate_id),
    FOREIGN KEY(agent_id) REFERENCES agents(agent_id)
);

CREATE TABLE IF NOT EXISTS inspections(
    inspection_id BIGSERIAL,
    estate_id BIGINT NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,

    FOREIGN KEY(estate_id) REFERENCES estates(estate_id)
);