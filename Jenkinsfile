pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/AliJabbar034/furnit-backend.git'
        DOCKER_IMAGE = 'alijabbar/assignment:latest' // Tagging the image with 'latest'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git url: "${REPO_URL}", branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}") // Builds the Docker image
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        dockerImage.push() // Pushes the Docker image to Docker Hub
                    }
                }
            }
        }
    }
}

