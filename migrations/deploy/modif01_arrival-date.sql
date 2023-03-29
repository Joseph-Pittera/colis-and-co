-- SQLBook: Code
-- Deploy colisandco:modif01_arrival-date to pg
BEGIN;

ALTER TABLE
    "delivery"
ALTER COLUMN
    "arrival_date" TYPE TIMESTAMPTZ ;
    COMMIT;