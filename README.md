<h1 align="center">Netflix Clone 🎬</h1>

About This Course:

-   ⚛️ Tech Stack: React.js, Node.js, Express.js, MongoDB, Tailwind
-   🔐 Authentication with JWT
-   📱 Responsive UI
-   🎬 Fetch Movies and Tv Show
-   🔎 Search for Actors and Movies
-   🎥 Watch Trailers
-   🔥 Fetch Search History
-   🐱‍👤 Get Similar Movies/Tv Shows
-   💙 Awesome Landing Page
-   🌐 Deployment
-   🚀 And Many More Cool Features


## 📁 Project Structure

```
netflix-clone/
├── backend/ # Express.js backend API
├── frontend/ # React + Vite frontend app
├── Dockerfile # Dockerfile for fullstack app
├── .env # Environment variables (not committed)
├── Jenkinsfile # CI/CD pipeline config for Jenkins
├── k8s/ # Kubernetes manifests
│ ├── deployment.yaml # K8s deployment config
│ └── service.yaml # K8s service config
└── README.md # Project documentation
```


### Setup .env file

```bash
PORT=5000
MONGO_URI=your_mongo_uri
NODE_ENV=development
JWT_SECRET=your_jwt_secre
TMDB_API_KEY=your_tmdb_api_key
```



### 🧪 Run Locally with Docker

Make sure Docker is installed and running on your system.  
Ensure that the `.env` file is created in the backend or root folder before running the container.

---

 🐳 Step 1: Build the Docker Image
     Run this command from your project root (where the Dockerfile is located):
     
     ```bash
    docker build -t netflix-clone:latest .
    ```

🚀 Step 2: Run the Docker Container
Expose both the backend and frontend ports:

```bash
=> docker run -itd -p 5000:5000 -p 5173:5173 netflix-clone:latest
```

🌐 Step 3: Access the Application

```bash
 Backend API: http://localhost:5000
 Frontend UI: http://localhost:5173
```



### 🧪 Run Locally with Docker Hub

Make sure Docker is installed and running on your system.  
Ensure that the `.env` file is created in the backend or root folder before running the container.

---

🐳 Step 1: Pull the Docker Image

Run this command to pull the image from Docker Hub:

```bash
docker pull manish857/netflix-clone:latest
```

🚀 Step 2: Run the Docker Container

Expose both the backend and frontend ports:
```bash
docker run -itd -p 5000:5000 -p 5173:5173 manish857/netflix-clone:latest
```

🌐 Step 3: Access the Application
```bash

Backend API: http://localhost:5000
Frontend UI: http://localhost:5173

```
