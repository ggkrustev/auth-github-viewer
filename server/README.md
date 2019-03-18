# Server

## Start locally

Navigate to parent folder and run `docker-compose run api`

## Development

Run `npm run start:dev`. Navigate to `http://localhost:3000/api-docs/swagger`. The app will automatically reload if you change any of the source files.

# Run API Server

## Requirements

1. Node 9+ (LTS) https://nodejs.org

## Install and run API

1. Install dependencies: `npm install`
2. Run api: `npm run start:dev`
3. API should start on `https://localhost:3000`, documentation should be available at `https://localhost:8000/api-docs/swagger`

### Call endpoints

1. Navigate to endpoint, e.g. 'http://localhost:3000/api/repos?access_token={token}' with valid auth JWT.

## Tests

1. Run unit tests: `npm test`
