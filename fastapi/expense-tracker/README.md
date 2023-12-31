# :chart_with_upwards_trend: :moneybag: Expense Tracker (Intermediate)

Backend CRUD APIs for tracking expenses!

<p align="center">
    <img src="../docs/images/expense-tracker.png" alt="expense-tracker application">
</p>

## Before you begin

### Code Installation

Download the code for this tutorial.

1. Clone the repository using Git and change directories to `expense-tracker` folder.
```sh
git clone https://github.com/jackwotherspoon/cloud-sql-fastapi.git
cd cloud-sql-fastapi/expense-tracker
```

### Set up Cloud SQL database

1. Create a Postgres Cloud SQL Instance by following these
[instructions](https://cloud.google.com/sql/docs/postgres/create-instance).

Note the __connection string__, __database user__, and __database password__ that you create.

2. Create a database for your application by following these
[instructions](https://cloud.google.com/sql/docs/postgres/create-manage-databases).

Note the __database name__.

3. Create a service account with the `Cloud SQL Client` IAM role by following these
[instructions](https://cloud.google.com/sql/docs/postgres/connect-external-app#4_if_required_by_your_authentication_method_create_a_service_account).

Download the JSON key for the service account to authenticate your connection for local development.

## Running locally

To deploy the application locally on your machine:

1. Install the dependencies

    ```sh
    pip install -r requirements.txt
    ```

1. Fill in the `.env` file with your Cloud SQL specific values and path to service account JSON key.

    ```
    INSTANCE_CONNECTION_NAME="project-id:region:instance-name"
    DB_USER="my-db-user"
    DB_PASS="my-db-pass"
    DB_NAME="my-database"
    GOOGLE_APPLICATION_CREDENTIALS="path/to/keys.json"
    ```

1. Run the application

    ```sh
    uvicorn app.main:app --reload
    ```

The application is now running locally! Point your web browser at http://127.0.0.1:8000/docs to view the OpenAPI specs for it and to play around with making requests.

**Note:** Remember to remove the `--reload` when not in a development environment.
It helps a lot during development, but you shouldn't use it in production.

## Deploy to Cloud Run

The application can be deployed to [Cloud Run](https://cloud.google.com/run) through the following steps:

1. Build the container image

Replace `<PROJECT_ID>` with your Google Cloud Project ID.
```sh
gcloud builds submit --tag gcr.io/cloud-run-install/cloud-sql-fastapi
```

2. Deploy the service to Cloud Run
Replace environment variables with the correct values for your Cloud SQL
instance configuration as well as service account email of previously created service account.
```sh
gcloud run deploy cloud-sql-fastapi --image gcr.io/cloud-run-install/cloud-sql-fastapi \
  --service-account='expenses-svc@cloud-run-install.iam.gserviceaccount.com' \
  --set-env-vars INSTANCE_CONNECTION_NAME='cloud-run-install:europe-west2:expenses-instance-0' \
  --set-env-vars DB_USER='expenses-user-0' \
  --set-env-vars DB_PASS='GJaUUsg_%RYnXVCB' \
  --set-env-vars DB_NAME='expenses-db-0'
```

Take note of the URL output at the end of the deployment process.
This is the endpoint for your FastAPI application!

Point your browser at the `/docs` endpoint of your output URL to view the OpenAPI specs and to make requests to your application!

### Private IP Cloud SQL Connections

The application can also be deployed to Cloud Run using Private IP Cloud SQL connections.
Private IP allows your database to not be accessible from the public internet.

First make sure your Cloud SQL instance is configured to have a Private IP address.
([Configure Private IP for Cloud SQL](https://cloud.google.com/sql/docs/postgres/configure-private-ip))

Private IP Cloud SQL instance(s) should be connected to a [VPC Network](https://cloud.google.com/vpc/docs/using-vpc)
which can be accessed securely via Cloud Run using [Serverless VPC Access](https://console.cloud.google.com/networking/connectors)
which creates a VPC Connector.

The VPC Connector can be attached to your Cloud Run service to allow Private IP
connections to the Cloud SQL instance on the **same VPC Network**.

```sh
gcloud run deploy cloud-sql-fastapi --image gcr.io/<PROJECT_ID>/cloud-sql-fastapi \
  --service-account='<SERVICE_ACCOUNT_EMAIL>' \
  --vpc-connector='<VPC_CONNECTOR_NAME>' \
  --set-env-vars INSTANCE_CONNECTION_NAME='<PROJECT_ID>:<INSTANCE_REGION>:<INSTANCE_NAME>' \
  --set-env-vars DB_USER='<YOUR_DB_USER_NAME>' \
  --set-env-vars DB_PASS='<YOUR_DB_PASSWORD>' \
  --set-env-vars DB_NAME='<YOUR_DB_NAME>' \
  --set-env-vars PRIVATE_IP=True
```

The application is now deployed using Private IP database connections!
