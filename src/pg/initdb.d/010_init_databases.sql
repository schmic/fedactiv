CREATE DATABASE keycloak;

\connect fedactiv;

CREATE TABLE public.users (
	id varchar NULL,
	name varchar NULL,
	summary varchar NULL,
	icon varchar NULL
);

INSERT INTO public.users
    (id, "name", summary, icon)
VALUES
    ('schmic', 'Michael', 'someone trying ActivityPub stuff', NULL);
