FROM node

WORKDIR /app
COPY package.json .

#RUN npm i --silent
#RUN npm install -g npm@10.1.0
RUN npm install
#RUN npm i -g react-scripts@5.0.0

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]