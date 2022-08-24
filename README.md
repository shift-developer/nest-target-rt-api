<div align="center">
  <p>
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  <h1>Rootstrap Induction Project - Nest Target API</h1>
  <p>Coded by @shift-developer</p>
</div>


## General description
All RS new members should do a training project before they join an official project. In this case, Target Project is an geolocation platform that lets you find people with similar interests in a specific area using a shared map in real time.
This is an agnostic high-level description of a project intended to be build using any language/framework.

<div align="center" style="margin: 30px">
  <img 
    style="width: 250px" 
    src="https://user-images.githubusercontent.com/61192769/186020115-14b6c8c2-3243-4f34-96f0-8020ee230475.png"
  />
  <img 
    style="width: 250px" 
    src="https://user-images.githubusercontent.com/61192769/186020404-1e568124-ecb9-42b4-b304-7b7fdb8ed646.png"
  />
  <img 
    style="width: 250px" 
    src="https://user-images.githubusercontent.com/61192769/186020897-bb7def92-fb82-47e3-81ca-d72358890082.png"
  />
  
</div>

## Installation

```bash
$ npm install
```

## Running the app

Before running the app you must create .env file with these config variables:


Variable Name | Description | Example
-- | -- | --
NODE_ENV | Node Environment | production
PORT | App port | 3000
DB_HOST | Database host name | localhost
DB_PORT | Database port. | 5432
DB_DATABASE | Database name. | postgres
DB_MIGRATE | Migrate database when the app is runing. | true
DB_USERNAME | Username used to establish the connection. | postgres
DB_PASSWORD | Password used to establish the connection. | pass123
JWT_SECRET | Secret JWT string | 76aHGSG&^H^gdkasd
JWT_EXPIRES_IN | Seconds to expire JWT token | 3600
TYPEORM_ATTEMPTS | Number of times to retry connecting db | 10
TYPEORM_DELAY | Delay between connection retry attempts (ms) | 3000
TYPEORM_SYNCHRONIZE | Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production - otherwise you can lose production data. This option is useful during debug and development. Alternative to it, you can use CLI and run schema:sync command. | true


<br class="Apple-interchange-newline">

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
