# Serverless Fullstack Application

This is a template of serverless fullstack application. It aims to be the
simplest possible way to build a serverless fullstack application, including a
Vue.js application on the front-end bundled with Parcel and back-end API using
postgresql.

This template includes:

- **Serverless RESTful API**: Using
  [@serverless/tencent-express](https://github.com/serverless-components/tencent-express)
  component, it contains a Servelress Cloud Function and a single API Gateway
  endpoint.

- **Serverless website using Vue.js**:
  [@serverless/tencent-website](https://github.com/serverless-components/tencent-website),
  it deploys all static files to Cloud Object Storage.

- **Serverless Postgresql**:
  [@serverless/tencent-postgresql](https://github.com/serverless-components/tencent-postgresql),
  it auto create a postgresql database for backend using.

&nbsp;

1. [Prepare](#Prepare)
2. [Download](#Download)
3. [Bootstrap](#Bootstrap)
4. [Deploy](#Deploy)
5. [Development](#Development)

&nbsp;

### Prepare

Before all below steps, you should install
[Serverless Framework](https://www.github.com/serverless/serverless) globally:

```console
$ npm i serverless -g
```

### Download

Severless cli is very convenient, it can download templates in any github
project which should contain `serverless.yml` file.

```console
$ serverless create --template-url https://github.com/yugasun/fullstack-application-postgres
```

### Bootstrap

Copy `.env.example` file to `.env` in project root:

Add the access keys of a
[Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with
`AdministratorAccess` in the `.env` file, like below:

```
# .env
TENCENT_SECRET_ID=xxx
TENCENT_SECRET_KEY=xxx
```

Install the NPM dependencies:

```console
$ npm run bootstrap
```

### Deploy

Deploy via the `serverless` command:

```console
$ serverless
```

Use the `--debug` flag if you'd like to learn what's happening behind the
scenes:

```console
$ serverless --debug
```

### Development

After your first deployment, you will be able to run the frontend locally and
have it communicate to the live backend in the cloud.

```console
$ cd frontend && npm run start
```

### License

MIT
