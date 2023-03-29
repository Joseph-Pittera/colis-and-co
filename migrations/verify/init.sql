-- Verify colisandco:init on pg
BEGIN;

SELECT
    "id",
    "email",
    "first_name",
    "last_name",
    "address",
    "zipcode",
    "birth_date",
    "phone_number",
    "carrier",
    "identity_verified"
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