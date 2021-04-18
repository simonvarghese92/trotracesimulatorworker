# TROT RACE SIMULATOR WORKER

## Overview

Trot race simulator runs a new race with six horses every minute of every day. When a horse starts or finishes, an event is sent out in real time via a REST API. This worker application subscribes to these events and saves them in a MongoDB database.

## Instructions to run worker

### Run using docker compose

1. Clone the repository
2. Run docker compose
```bash
docker-compose up --build
```
3. Stop the running docker containers using
```bash
docker-compose down
```

### Run using npm script

1. Clone the repository
2. Start Mongo DB
3. Install dependencies
```bash
npm install
```
4. Start the worker
```bash
npm start
```