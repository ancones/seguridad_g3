```markdown
# My App - Docker Setup

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. **Build and start the application:**

```bash
sudo docker compose up --build
```

3. **Access the application:**

Open your browser and navigate to:

```
http://localhost
```

## Admin Setup

1. Register a new user via the frontend (e.g., http://localhost).

2. Access the MongoDB instance:

```bash
sudo docker exec -it mongodb mongosh
```

3. Update the user to have admin roles:

```js
use myapp

db.users.updateOne(
  { username: "admin" },
  {
    $set: {
      roles: {
        Admin: 5150,
        Editor: 1984,
        User: 2001
      }
    }
  }
)
```

## Expected Running Containers

If the build is successful, you should see the following containers running:

```bash
sudo docker ps
```

Example output:

```
CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS                    PORTS                                 NAMES
3d706329ecd8   nginx:alpine           "/docker-entrypoint.…"   11 minutes ago   Up 11 minutes             0.0.0.0:80->80/tcp, [::]:80->80/tcp   nginx
d24a893610c2   dev-client             "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes             3000/tcp                              dev-client-1
7f42f2615e18   dev-auth               "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes             3500/tcp                              dev-auth-1
1e8620e1af1c   dev-soli               "uvicorn main:app --…"   11 minutes ago   Up 11 minutes             8000/tcp                              dev-soli-1
5f6fb780e224   mongo:7.0              "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes (healthy)   27017/tcp                             mongodb
f3c7af316476   postgres:17.6-trixie   "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes (healthy)   5432/tcp                              dev-db-1
```
```
