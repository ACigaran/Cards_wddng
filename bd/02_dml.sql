INSERT INTO usuarios(
    username,
    password_hash
)
VALUES(
    'admin',
    crypt(
        'boda',
        gen_salt('bf')
    )
);