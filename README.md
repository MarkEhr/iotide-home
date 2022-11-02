# tide-nodejs-skeleton

This is a skeleton for a Tide Node.js application.

## Getting started
To initialize a new project, run the following commands, remember to change your project name:

```bash 
export PROJECT_NAME=your-project-name
git clone git@bitbucket.org:tidemx/tide-nodejs-skeleton.git $PROJECT_NAME
cd $PROJECT_NAME
rm -rf .git
git init
git add .
git commit -m "Initial commit from tide-nodejs-skeleton"
yarn install
```

## Running the application
To run the application, use yarn which will run the application using nodemon:

```bash
yarn dev
```
