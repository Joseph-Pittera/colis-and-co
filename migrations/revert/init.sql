-- Revert colisandco:init from pg
BEGIN;

DROP TABLE "user",
"delivery";

COMMIT;