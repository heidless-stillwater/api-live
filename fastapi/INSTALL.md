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
gcloud builds submit --tag gcr.io/pfolio-deploy-1/finance-frontend

gcloud run deploy --image gcr.io/pfolio-deploy-1/finance-frontend --platform managed --port=3000
```
```

# db
```
### ensure correct project
gcloud config set project pfolio-deploy-1

### initialise DB Instance (takes some time  - take a break and let it process)
# MANUALLY create instance using info below (particularly PASSWORD - havana11)
gcloud sql instances create expenses-instance-0 \
    --project pfolio-deploy-1 \
    --database-version POSTGRES_15 \
    --tier db-f1-micro \
    --region europe-west2

IP: 
34.147.216.97

CONNECTION NAME:
pfolio-deploy-1:europe-west2:expenses-instance-0

gcloud sql databases create expenses-db-0 \
    --instance expenses-instance-0

gcloud sql users create expenses-user-0 \
    --instance expenses-instance-0 \
    --password GJaUUsg_%RYnXVCB

```

## db url
```
postgresql://expenses-user-0:GJaUUsg_%RYnXVCB@//cloudsql/pfolio-deploy-1:europe-west2:expenses-instance-0/expenses-db-0
```

## service account(s)
```
PROJECT: pfolio-deploy-1
ID: pfolio-deploy-1

'IAM & ADMIN'->Service Accounts->Creates
pfolio-svc-0@pfolio-deploy-1.iam.gserviceaccount.com
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
' copy to local project/app working directory'
```
# pgadmin4
tut:
https://cshiva.medium.com/connecting-to-gcps-cloud-sql-postgressql-from-pgadmin-3-simple-steps-2f4530488a4c

## configure
sudo /usr/pgadmin4/bin/setup-web.sh

use local pgadmin4
http://localhost/pgadmin4

```
INSTANCE
<set password>
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