# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy frontend and backend package.json if they exist
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/

# Install dependencies for root, frontend, and backend
RUN npm install
RUN npm install --prefix frontend
RUN npm install --prefix backend

# Copy entire project
COPY . .

# Expose frontend (Vite) and backend (Node) ports
EXPOSE 5173
EXPOSE 5000

# Start both servers
CMD ["npm", "run", "dev"]
