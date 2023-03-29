-- Revert colisandco:init from pg
BEGIN;

DROP TABLE "users",
"delivery";

COMMIT;