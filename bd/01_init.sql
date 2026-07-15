CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,

    username VARCHAR(15) NOT NULL,

    password_hash TEXT NOT NULL,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_usuarios_username
        UNIQUE(username)
);

CCREATE TABLE invitados(
    id_invitado SERIAL PRIMARY KEY,

    codigo UUID NOT NULL DEFAULT gen_random_uuid(),

    nombre VARCHAR(150) NOT NULL,

    ciudad VARCHAR(100),

    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',

    cant_personas INTEGER NOT NULL DEFAULT 1,

    detalle TEXT,

    fecha_confirmacion TIMESTAMP,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_invitados_codigo
        UNIQUE(codigo),

    CONSTRAINT chk_estado
        CHECK(
            estado IN
            (
                'pendiente',
                'confirmado',
                'rechazado'
            )
        ),

    CONSTRAINT chk_cant_personas
        CHECK(cant_personas > 0)
);

