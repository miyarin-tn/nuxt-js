# Clone version node
FROM node:latest

# Directory app run
WORKDIR /usr/local/app/nuxt

# Grant ownership for node group
COPY --chown=node . .

# Expose host and port
ENV HOST 0.0.0.0
EXPOSE 3000

# Keep run server if not run by docker compose
# CMD [ "./start.sh" ]
