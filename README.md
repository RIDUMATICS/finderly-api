# Finderly API
Design a RESTful API which can collect the information on the different locations for us and also determine the distance between the locations and a configurable location which can be changed or supplied. The formula for calculating distance between two points can be gotten here https://en.wikipedia.org/wiki/Great-circle_distance.

## Documentation
https://documenter.getpostman.com/view/6765162/TzeZES2H

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.

- install nestJs global

  ```bash
    - npm i -g @nestjs/cli
  ```

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/RIDUMATICS/finderly-api.git
    - cd finderly-api
    - npm install
  ```

- Create a PostgreSQL database by running the command below in `psql`

  ```bash
    createdb -h localhost -p 5432 -U postgres finderly_db
  ```

- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.

- Run `npm run start:dev` to start the server and watch for changes

### Testing

- Run `npm run test` to performs a single full test suite run

### API ENDPOINTS

| URI                                     | HTTP Method | Description                    |
| --------------------------------------- | ----------- | ------------------------------ |
| <code>/api/v1/locations</code>          | `POST`      | Create a new location          |
| <code>/api/v1/locations</code>          | `GET`       | Fetch all locations            |
| <code>/api/v1/locations/:id</code>      | `GET`       | Fetch a single location by id  |
| <code>/api/v1/locations/distance?locationA=New York&locationB=London</code> | `GET`       | Calculate distance             |
| <code>/api/v1/locations/:id</code>      | `UPDATE`    | Update a single location by id |
| <code>/api/v1/locations/:id</code>      | `DELETE`    | Delete a single location by id |

## Misc😏

If for some reason you find this repo useful, please give me a star🙏
