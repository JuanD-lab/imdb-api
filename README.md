# IMDB REST API
[![IMDB](https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg)](https://imdb3.herokuapp.com/api-docs/)

[![build status](https://img.shields.io/circleci/project/github/PokeAPI/pokeapi/master.svg)](https://imdb-lab.herokuapp.com/) [![data status](https://img.shields.io/circleci/build/github/PokeAPI/api-data?label=data)](https://imdb-lab.herokuapp.com/api-docs)

## API for data movies, TV series, actors, and directors.

This API  uses some open-source projects to work properly:

 evented I/O for the backend
 ![node][node.js] 
 ORM for javascript apps
 ![sequelize][sequelize] 
 fast node.js network app framework
 ![ex][express]

## Purpose
The purpose of this repo is to demonstrate some SQL modeling and querying techniques and decisions when using Sequelize ORM as a database.

## Installation

Requires [Node.js](https://nodejs.org/) v13+ to run.

Install the dependencies and devDependencies and start the server.

### Development
```sh
cd imdb-api
npm i
Create a database named imdb CREATE DATABASE IMDB;
npx sequelize-cli db:migrate
sequelize-cli db:seed:all
npm run dev
```

### Production
```sh
npm install --production
NODE_ENV=production
npm start
```

## Plugins

| Plugin | README |
| ------ | ------ |
| Json Web Token | [plugins/jsonwebtoken/README.md][PlJw] |
| Bcryptjs | [plugins/bcryptjs/README.md][PlBc] |
| Sequelize | [plugins/googledrive/README.md][PlSq] |
| Helmet | [plugins/googledrive/README.md][PlSq] |
| Multer | [plugins/googledrive/README.md][PlSq] |
| Googleapis | [][PlSq] |
| Nodemailer | [][PlSq] |
| Supertest | [][PlSq] |
| Supertest | [][PlSq] |

## Docker

By default, the Docker will expose port 8000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd api-node
docker build -t <youruser>/api-node .
```

This will create the class center image and pull in the necessary dependencies.


Once done, you need to create a file called **env.list**

```sh
touch env.list
```

write your env vars into the file **env.list**, you might copy them from .env.example 

Finally run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8000 of the Docker (or whatever port was exposed in the Dockerfile):

**Note:** You must run the following command where the env.list file is located

```sh
docker run -d -p 8000:8000 --env-file ./env.list --name=classcenter <youruser>/api-node
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <https://img.icons8.com/color/96/000000/nodejs.png>
   [sequelize]: <https://raw.githubusercontent.com/JuanD-lab/icons/main/file_type_sequelize_icon_130173.png>
   [express]: <https://raw.githubusercontent.com/JuanD-lab/icons/main/express.png>

   [PlJw]: <https://github.com/auth0/node-jsonwebtoken/blob/master/README.md>
   [PlBc]: <https://github.com/dcodeIO/bcrypt.js/blob/master/README.md>
   [PlSq]: <https://github.com/sequelize/sequelize/blob/main/README.md>
