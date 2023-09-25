
## init proxy

curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.6.1/cloud-sql-proxy.linux.amd64

chmod +x cloud-sql-proxy
```

## run proxy
./cloud-sql-proxy --credentials-file pfolio-deploy-1-7bb270ffc088.json --port 1234 pfolio-deploy-1:europe-west2:tabs-instance-0


## PostgreSQL instance

# if on LOCAL
# restart server
sudo service postgresql restart

##################################################
# if on GAE

# ensure correct project
gcloud config set project pfolio-deploy-1
```

## configure DB env
```
# initialise DB Instance (takes some time  - take a break and let it process)

# create MANUALLY to set PASSWORD on instance ('havana11')
gcloud sql instances create tabs-instance-0 \
    --project pfolio-deploy-1 \
    --database-version POSTGRES_15 \
    --tier db-f1-micro \
    --region europe-west2
	
# if asked - enable API [sqladmin.googleapis.com]
	
gcloud sql databases create tabs-db-0 \
    --instance tabs-instance-0
	
gcloud sql users create tabs-user-0 \
    --instance tabs-instance-0 \
    --password GJaUUsg_%RYnXVCB

# check status of instance
gcloud sql instances describe --project pfolio-deploy-1 tabs-instance-0
-
-

# DB URL
# assemble link from the above info
postgres://<USER>:<PWD>@//cloudsql/<PROJECT ID>:<REGION>:<INSTANCE>/<DB>
--
postgres://tabs-user-0:GJaUUsg_%RYnXVCB@//cloudsql/pfolio-deploy-1:europe-west2:tabs-instance-0/tabs-db-0
--

##################### TIPS/TRICKS ############################
###

### If need to REBUILD SQL Instance

# disable deletion protection
https://console.cloud.google.com/sql/instances/pf-pg-instance-0/edit?project=xenon-pier-390513&supportedpurview=project
EDIT->DeletionProtection

# delete instance - if it exisrs
gcloud sql instances delete tabs-instance-2
##############################################################
```

## storage bucket
```
# PROJECT: pfolio-
gcloud config set project pfolio-deploy-1

# initialise BUCKET
gsutil mb -l europe-west2 gs://tabs-bucket-0
```

### service account(s)
```
PROJECT: pfolio-deploy-1
ID: pfolio-deploy-1

'IAM & ADMIN'->Service Accounts
tabs-svc-0@pfolio-deploy-1.iam.gserviceaccount.com

-
edit principal
-

# add ROLES to allow access to DB & 'secrets'
--
Secret Manager Secret Accessor
Cloud SQL Admin
Storage Admin
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

## DEPLOY/RUN
```
uvicorn app.main:app --reload

npm install
npm start
```

# docker
```
docker build . -t tabs-api

docker network create microNetwork

# docker run --rm --name tabs-api --network microNetwork -p 3000:3000 tabs-api

export PORT=8080
docker run --rm --name tabs-api -e PORT=$PORT tabs-api

docker run --rm --name tabs-api -e PORT=$PORT -p 8080:8080 tabs-api

# access docker shell
docker exec -it tabs-api bash

# check exists
docker image ls
```

# deploy Google Cloud Run
gcloud builds submit --tag gcr.io/pfolio-deploy-1/tabs-api

gcloud run deploy --image gcr.io/pfolio-deploy-1/tabs-api --platform managed --port=8080


```