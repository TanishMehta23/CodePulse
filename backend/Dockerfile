FROM node:20-bookworm-slim

# Install Java 17 (full JDK), complete C/C++ toolchain, Python 3
# Note: No --no-install-recommends so gcc/g++ deps are fully satisfied
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk-headless \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Detect JAVA_HOME dynamically — works on both amd64 AND arm64 hosts
RUN JAVA_BIN=$(dirname $(readlink -f $(which javac))) && \
    echo "JAVA_HOME=$(dirname $JAVA_BIN)" >> /etc/environment

# Make javac / java / g++ / python3 available to child_process.exec()
ENV PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

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
