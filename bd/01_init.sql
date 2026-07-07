CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE invitados(
    id_invitado SERIAL PRIMARY KEY,

    codigo UUID NOT NULL DEFAULT gen_random_uuid(),

    nombre VARCHAR(150) NOT NULL,

    cupos INTEGER NOT NULL DEFAULT 1,

    confirmado BOOLEAN DEFAULT NULL,

    cantidad_confirmada INTEGER,

    restricciones_alimentarias TEXT,

    observaciones TEXT,

    fecha_confirmacion TIMESTAMP,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_invitados_codigo
        UNIQUE(codigo),

    CONSTRAINT chk_cupos
        CHECK(cupos > 0),

    CONSTRAINT chk_cantidad_confirmada
        CHECK(
            cantidad_confirmada IS NULL
            OR cantidad_confirmada >= 0
        )
);