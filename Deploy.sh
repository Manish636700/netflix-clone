#!/bin/bash

#############################################
# UPDATE SERVER
#############################################
sudo yum update -y

#############################################
# INSTALL NODE 24, GIT, NGINX
#############################################
curl -fsSL https://rpm.nodesource.com/setup_24.x | sudo bash -
sudo yum install -y nodejs git nginx

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

#############################################
# CLONE PROJECT CLEANLY
#############################################
cd /home/ec2-user
sudo rm -rf netflix-clone
git clone https://github.com/Manish636700/netflix-clone.git
cd netflix-clone

#############################################
# BACKEND DEPENDENCIES
#############################################
cd backend
npm install cors cookie-parser dotenv express@4

#############################################
# FRONTEND DEPLOYMENT
#############################################
cd ../frontend
npm install
npm run build

sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/
sudo chown -R nginx:nginx /usr/share/nginx/html

#############################################
# BACKEND DEPLOYMENT
#############################################
cd ../backend
rm -rf node_modules package-lock.json
npm install

#############################################
# CREATE PRODUCTION .env FILE
#############################################
cat <<EOT > .env
PORT=5000
MONGO_URI=mongodb+srv://manishmittal296:FkYwXnhPMj5z3TVc@cluster0.u3btjud.mongodb.net/netflix?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=MySuperSecretJWTKey123!
TMDB_API_KEY=9c9b3d7a9bfdbf7fc794cdf04a5a579b
EOT

#############################################
# PM2 BACKEND SETUP
#############################################
sudo npm install -g pm2

pm2 kill
rm -f ~/.pm2/dump.pm2
rm -rf ~/.pm2/logs/*
rm -rf ~/.pm2/pids/*

pm2 start server.js --name backend
pm2 save
pm2 startup systemd -u ec2-user --hp /home/ec2-user

#############################################
# NGINX CONFIGURATION (CORRECTED + SPA FIX)
#############################################

sudo bash -c 'cat > /etc/nginx/nginx.conf <<EOF
user nginx;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile on;

    server {
        listen 80;
        server_name _;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files \$uri \$uri/ /index.html;
        }

        location /api/ {
            proxy_pass http://127.0.0.1:5000;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        }
    }
}
EOF'



sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

#############################################
# DONE
#############################################
echo "============================================"
echo " Deployment Completed Successfully"
echo " Frontend: http://YOUR-EC2-IP/"
echo " Backend:  http://YOUR-EC2-IP/api/v1/"
echo " PM2 Status:"
pm2 list
echo "============================================"
