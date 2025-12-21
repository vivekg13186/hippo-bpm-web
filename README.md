## How to run the application

 - Need local docker or podman
 - Download latest release,unzip and run the following command


Run this one time to build the image
```bash 
docker build -t hippo-bpm .
```

To run command run the follwing
```bash
docker run -p 8080:8080 hippo-bpm
```

Now application running in http://localhost:8080