THIS_FILE := $(lastword $(MAKEFILE_LIST))
SERVICES := tunnel traefik db auth minio redis
.PHONY: build up start down clean stop restart logs logs-api ps login-timescale login-api db-shell api app
build:
	docker compose -f docker-compose.yml build $(c)
up:
	docker compose -f docker-compose.yml up -d $(c)
start:
	docker compose -f docker-compose.yml start $(c)
down:
	docker compose -f docker-compose.yml down $(c)
clean:
	docker compose -f docker-compose.yml down -v $(c)
stop:
	docker compose -f docker-compose.yml stop $(c)
restart:
	docker compose -f docker-compose.yml stop $(c)
	docker compose -f docker-compose.yml up -d $(c)
logs:
	docker compose -f docker-compose.yml logs --tail=100 -f $(c)
logs-api:
	docker compose -f docker-compose.yml logs --tail=100 -f api
ps:
	docker compose -f docker-compose.yml ps
db-shell:
	docker compose -f docker-compose.yml exec timescale psql -Upostgres
mw:
	docker compose -f docker-compose.yml up -d ${SERVICES} 
	docker compose -f docker-compose.yml logs -f --tail 100 ${SERVICES} 
api:
	docker compose -f docker-compose.yml up api 
app:
	docker compose -f docker-compose.yml up app
