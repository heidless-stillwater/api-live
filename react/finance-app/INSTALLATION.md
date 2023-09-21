
# install
npm install bootstrap react-bootstrap

App.js
```
import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
```

# build & run
```
npm install
npm start
```

# docker
```
docker build . -t finance-frontend

docker network create microNetwork

# docker run --rm --name finance-frontend --network microNetwork -p 3000:3000 finance-frontend

docker run --rm --name finance-frontend -p 3000:3000 finance-frontend

# access docker shell
docker exec -it finance-frontend bash

# check exists
docker image ls
```

# deploy Google Cloud Run
gcloud builds submit --tag gcr.io/cloud-run-install/finance-frontend

gcloud run deploy --image gcr.io/cloud-run-install/finance-frontend --platform managed --port=3000

