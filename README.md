## How to run the application

 - Need local docker or podman
 - Download latest release,unzip and run the following command
 
 
For **Docker**

Run this one time to build the image
```bash 
docker build -t hippo-bpm .
```

To run command run the following
```bash
docker run -d  -p 8080:8080  -v hippo-h2-data:/data --name hippo-bpm hippo-bpm
```

or **Podman**

Run this one time to build the image
```bash 
podman build -t hippo-bpm .
```

To run command run the following
```bash
podman run -d  -p 8080:8080  -v hippo-h2-data:/data --name hippo-bpm hippo-bpm
```

Now application running in http://localhost:

![Homepage](/wiki/Accounts.PNG)
![Appexplorer](/wiki/AppExplorer.PNG)