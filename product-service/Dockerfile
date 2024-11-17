# Use an official Python image as the base image
FROM python:3.9-slim

# Set environment variables to avoid prompts during the build process
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory to the container
COPY app /app/app

# Ensure Python can find the app and config.py
ENV PYTHONPATH=/app

# Install python-dotenv
RUN pip install python-dotenv

# Expose the Flask app port
EXPOSE 5001

# Command to run the Flask application
CMD ["python", "-m", "app.__init__"]