# Use an official Python runtime as a parent image  
FROM python:3.10-slim-buster  
  
# Set the working directory in the container to /app  
WORKDIR /app  
  
# Add the current directory contents into the container at /app  
ADD . /app  
  
# Install Poetry  
RUN pip install poetry  
  
# Install any needed packages specified in pyproject.toml  
RUN poetry lock && poetry install  
  
# Make port 8080 available to the world outside this container  
EXPOSE 8080
  
# Run the commands from your Makefile  
CMD flask --app frappe_library.main:app create-db && gunicorn -w 4 -b 0.0.0.0:8080 frappe_library.main:app --access-logfile - --error-logfile - --reload  
