# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Install app dependencies by copying package.json and package-lock.json first
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of your application code
COPY . .

# Build your Next.js application
RUN npm run build

# Start the Next.js application in production mode
CMD ["npm", "start"]
