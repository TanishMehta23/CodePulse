FROM node:20-bullseye

# Install OpenJDK (Java 17), GCC / G++ (C++), and Python 3
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    g++ \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy source code
COPY . .

# Expose server port
EXPOSE 5000

ENV PORT=5000

CMD ["npm", "start"]
