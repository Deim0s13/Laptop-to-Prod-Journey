# Use a base image
FROM ubuntu:latest

# Install any required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget

# Set the working directory
WORKDIR /app

# Copy files into the container (optional)
# COPY . /app

# Specify the command to run when the container starts
CMD ["echo", "Hello, world!"]