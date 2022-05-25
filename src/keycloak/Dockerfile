ARG KC_VERSION

FROM quay.io/keycloak/keycloak:${KC_VERSION} as builder

# ENV KC_METRICS_ENABLED=true
# ENV KC_FEATURES=token-exchange
ENV KC_DB=postgres
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=passthrough
RUN /opt/keycloak/bin/kc.sh build


FROM quay.io/keycloak/keycloak:${KC_VERSION}

ARG KC_ADMIN
ARG KC_ADMIN_PASSWORD
ARG DB_USER
ARG DB_PASS
ARG HOSTNAME

COPY --from=builder /opt/keycloak/lib/quarkus/ /opt/keycloak/lib/quarkus/
WORKDIR /opt/keycloak

ENV KEYCLOAK_ADMIN=${KC_ADMIN}
ENV KEYCLOAK_ADMIN_PASSWORD=${KC_ADMIN_PASSWORD}
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://db:5432/keycloak?ssl=allow
ENV KC_DB_USERNAME=${DB_USER}
ENV KC_DB_PASSWORD=${DB_PASS}
ENV KC_HOSTNAME=${HOSTNAME}
ENV KC_HOSTNAME_STRICT=false
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=passthrough

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]