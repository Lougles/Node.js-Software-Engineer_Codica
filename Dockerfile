FROM postgres:13.3

RUN apt-get update
RUN apt-get install -y postgresql-13-cron

ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=bankTransactions

# initialization scripts executed automatically by image from this directory
WORKDIR prepare-scripts/

COPY . .