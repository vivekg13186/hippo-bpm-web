## How to run the application

Clone the repo

## Run locally

```bash 
cd ../app
npm run start
```


## Run in **Docker**
 
To run command run the following
```bash
cd app
docker compose up -d --build
```

or **Podman**

To run command run the following
```bash 
cd app
podman compose build
podman compose up
```
 

Now application running in http://localhost:8080

![Homepage](/wiki/Accounts.PNG)
![Appexplorer](/wiki/AppExplorer.PNG)


## Build and run locally

```bash 
cd ui
npm run build
# copy file to app/public folder
cd ../app
npm run start
```