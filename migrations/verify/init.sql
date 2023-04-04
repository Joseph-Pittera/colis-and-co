-- Verify colisandco:init on pg
BEGIN;

SELECT
    "id",
    "email",
    "password",
    "first_name",
    "last_name",
    "address",
    "zipcode",
    "birth_date",
    "phone_number",
    "carrier",
    "identity_verified",
    "role"
FROM
    "users"
WHERE
    false;

SELECT
    "id",
    "type_of_marchandise",
    "quantity",
    "volume",
    "length",
    "width",
    "height",
    "departure_address",
    "city",
    "arrival_address",
    "departure_date",
    "arrival_date",
    "price",
    "creator_id",
    "carrier_id"
FROM
    "delivery"
WHERE
    false;

ROLLBACK;