# sql to google cloud
https://cshiva.medium.com/connecting-to-gcps-cloud-sql-postgressql-from-pgadmin-3-simple-steps-2f4530488a4c

# local
uvicorn app.main:app --reload

# docker
```
docker build . -t finance-backend

docker network create microNetwork

# docker run --rm --name finance-backend --network microNetwork -p 8000:8000 finance-backend

docker run --rm --name finance-backend -p 8000:8000 finance-backend

# access docker shell
docker exec -it finance-backend bash

# check exists
docker image ls
```

# gcloud deploy
```
gcloud builds submit --tag gcr.io/cloud-run-install/finance-frontend

gcloud run deploy --image gcr.io/cloud-run-install/finance-frontend --platform managed --port=3000
```
```

# db
```
### ensure correct project
gcloud config set project cloud-run-install

### initialise DB Instance (takes some time  - take a break and let it process)
gcloud sql instances create expenses-instance-0 \
    --project cloud-run-install \
    --database-version POSTGRES_13 \
    --tier db-f1-micro \
    --region europe-west2

Created [https://sqladmin.googleapis.com/sql/v1beta4/projects/cloud-run-install/instances/expenses-instance-0].

NAME                 DATABASE_VERSION  LOCATION        TIER         PRIMARY_ADDRESS  PRIVATE_ADDRESS  STATUS
expenses-instance-0  POSTGRES_13       europe-west2-c  db-f1-micro  34.142.57.35     -                RUNNABLE

gcloud sql databases create expenses-db-0 \
    --instance expenses-instance-0

gcloud sql users create expenses-user-0 \
    --instance expenses-instance-0 \
    --password GJaUUsg_%RYnXVCB

```

## db url
```
postgresql://api-user-0:GJaUUsg_%RYnXVCB@//cloudsql/cloud-run-install:europe-west2:api-instance-0/api-db-0
```

## service account(s)
```
PROJECT: cloud-run-install
ID: cloud-run-install

'IAM & ADMIN'->Service Accounts
expenses-svc@cloud-run-install.iam.gserviceaccount.com
-
edit principal
-

# add ROLES to allow access to DB & 'secrets'
--
Cloud SQL Admin
--
```

generate & install KEY file
```
'IAM & ADMIN'->Service Accounts->'3 dots'->Manage Keys
'ADD KEY'->JSON
# Download & install json file
' copy to local project/app directory'
/home/heidless/LIVE/pfolio/WORKING/backend-LIVE-WORKING/app/config
```
# pgadmin4
tut:
https://cshiva.medium.com/connecting-to-gcps-cloud-sql-postgressql-from-pgadmin-3-simple-steps-2f4530488a4c

use local pgadmin4
http://localhost/pgadmin4

```
INSTANCE
expenses-instance-0
PWD:
havana11

USER
postgres
postgres

expenses-user-0
GJaUUsg_%RYnXVCB
```

# docker
```
docker build -t api-live-backend

docker network create microNetwork

docker run --rm --name api-live-backend --network microNetwork -p 8000:8000 api-live-backend

# docker run --rm --name micro-frontend -p 3000:3000 micro-frontend

# access docker shell
docker exec -it micro-frontend bash

# check exists
docker image ls
```