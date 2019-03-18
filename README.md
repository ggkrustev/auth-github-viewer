# NodeJS/Angular coding interview

## General information
The repo contains the following projects:
- **server/** - an Express.js application that serves information for VMWare pinned repos
- **ui/** - an Angular application that fetches details from the server API and displays it using VMware Clarity components

## Requirements
- a command line tool
- [install Docker](https://docs.docker.com/docker-for-mac/install/)

## How to run it

- execute `docker-compose up -d`
- browse the UI at [http://localhost:4200](http://localhost:4200)
- browse the server at [http://localhost:3000/api-docs/swagger/](http://localhost:3000/api-docs/swagger/)

## How to interact with it

### UI
1. Navigate to `http://localhost:4200`
2. Enter default credentials and login
3. UI navigates to `/main` route where the pinned repos are listed

Once logged in you can:
- filter the pinned repos
- navigate to specific repo clicking the repo name
- see repo information or last 100 commits
- download a `commit-sha.patch` when click on *Download* button

### Server
1. Navigate to API swagger documentation at `http://localhost:3000/api-docs/swagger/`
2. Generate an authorization JSON web token in order to use github related endpoints

TOKEN (valid 7d from 2019-03-18)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5Adm13YXJlLmNvbSIsImlhdCI6MTU1MjkyMzkzMSwiZXhwIjoxNTUzNTI4NzMxLCJhdWQiOiJodHRwczovL3d3dy52bXdhcmUuY29tIiwiaXNzIjoiVk1XYXJlIiwic3ViIjoiYWRtaW5Adm13YXJlLmNvbSJ9.QMh3ZV4br0XvbXqJjwMkyejb5zu1BXgucZp1tfOQBog
```

- **repos** - `http://localhost:3000/api/repos`
- **repo details** - `http://localhost:3000/api/generalInfo/:repoName`
- **repo commits** - `http://localhost:3000/api/commits/:repoName`
- **commit patch** - `http://localhost:3000/api/commits/:repoName/:patchId`

## Tech stack

### Server
- Node.js 9+
- Express.js
- Inversify (IoC)
- Typescript
- TSLint
- Prettier
- Husky git hooks
- Mocha, Chai, Sinon
- Bluebird
- node-cache
- request && graphql-request
- querystring
- jsonwebtoken
- check `./server/package.json` for the other deps/devDeps

### UI
- Angular 7
- Clarity
- angular-jwt
- querystring

## TODO
This project is far from finished. The following tasks should be addressed before hit a QA/UAT stage:

### Server
**Must**
- [ ] Improve test coverage, plus integration-test
- [ ] Improve linting/prettier
- [ ] Add `helmet` to secure api
- [ ] Add `correleation-id` express middleware
- [ ] Status/health check
- [ ] Proper error handling / typed errors
- [ ] Extend Github endpoints to support filter, sorting, paging
- [ ] Fix bugs or defectmets (100% sure that there are any)
- [ ] Find a way to overcome missing credentials to fetch contributors' data

**Should**
- [ ] Improve Swagger definitions
- [ ] Add api versioning
- [ ] Benchmark
- [ ] Refactor models naming
- [ ] Unify models with UI
- [ ] Rename tests to include type (service, controller, etc.)

### UI
**Must**
- [ ] Improve test coverage, plus integration-test
- [ ] Support filtering by multiple columns
- [ ] Find a way to put filter popup outside the grid (Clarity issue?)
- [ ] Fix bugs or defectmets (100% sure that there are any)