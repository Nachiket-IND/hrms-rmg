pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'rohit151'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/hrms-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/hrms-frontend:latest"
    }

    tools {
        maven 'Maven' // Correct Maven tool name from Jenkins Global Tools
        // nodejs 'nodejs' // Remove or configure NodeJS plugin if needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Rohit8329/hrms-rmg.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t hrms-backend ./backend'
                sh 'docker build -t hrms-frontend ./frontend'
            }
        }

        stage('Tag & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker tag hrms-backend:latest $BACKEND_IMAGE
                        docker push $BACKEND_IMAGE

                        docker tag hrms-frontend:latest $FRONTEND_IMAGE
                        docker push $FRONTEND_IMAGE

                        docker logout
                    """
                }
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                sh '''
                    docker-compose down --remove-orphans
                    docker-compose pull
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD pipeline completed successfully."
        }
        failure {
            echo "❌ Pipeline failed. Please check Jenkins logs for details."
        }
    }
}

