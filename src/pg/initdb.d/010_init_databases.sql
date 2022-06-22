CREATE DATABASE keycloak;

\connect fedactiv;

CREATE TABLE "public"."users" (
  "sub" varchar,
  "id" varchar,
  "given_name" varchar,
  "family_name" varchar,
  "summary" varchar NULL,
  "icon" varchar NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."dropbox" (
  "userId" varchar,
  "tokens" json,
  PRIMARY KEY ("userId")
);

-- INSERT INTO public.users
--     (id, "name", summary, icon)
-- VALUES
--     ('schmic', 'Michael', 'someone trying ActivityPub stuff', NULL);
