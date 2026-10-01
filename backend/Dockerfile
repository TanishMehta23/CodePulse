FROM node:20-bookworm-slim

# Install OpenJDK (Java 17), GCC / G++ (C++), and Python 3
RUN apt-get update --fix-missing && apt-get install -y --no-install-recommends \
    openjdk-17-jdk-headless \
    g++ \
    make \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME so child_process.exec() can resolve javac / java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

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
