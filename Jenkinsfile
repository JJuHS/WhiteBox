pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = "credentails-ssh"
        REMOTE_SERVER = "j11a104.p.ssafy.io"
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend/whitebox'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        GIT_REPO_URL = 'https://lab.ssafy.com/s11-ai-image-sub1/S11P21A104.git'
        CREDENTIALS_ID = 'whitebox'
    }

    stages {
        // 1. 현재 빌드가 진행 중인 브랜치 정보 출력
        stage('Print Branch Info') {
            steps {
                script {
                    echo "Current GIT_BRANCH: ${env.GIT_BRANCH}"
                    def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    echo "Current branch: ${branch}"
                    echo "REMOTE_SERVER: ${env.REMOTE_SERVER}"
                }
            }
        }

        // 2. 코드 체크아웃
        stage('Checkout') {
            steps {
                script {
                    git branch: 'master', credentialsId: CREDENTIALS_ID, url: GIT_REPO_URL
                }
            }
        }

        // 3. 디렉토리 리스트 출력
        stage('List Directory') {
            steps {
                sh 'mkdir -p frontend'
                sh 'mkdir -p backend/whitebox'
                sh 'ls -l'
                sh 'ls -l frontend'
                sh 'ls -l backend/whitebox'
            }
        }

        // 4. Docker 이미지 빌드
        stage('Build Docker Images') {
            steps {
                script {
                    // 프론트엔드 Docker 이미지 빌드
                    dir(FRONTEND_DIR) {
                        // Dockerfile.prod 사용하도록 명시
                        sh 'docker build -t geunwook/frontend1:latest -f Dockerfile.prod .'
                    }

                    // 백엔드 Docker 이미지 빌드
                    dir(BACKEND_DIR) {
                        // Gradle Wrapper 관련 파일 확인 후 빌드 진행
                        sh '''
                        if [ ! -f gradlew ]; then
                            echo "gradlew file not found. Generating Gradle Wrapper."
                            gradle wrapper
                        fi
                        chmod +x gradlew
                        ./gradlew clean build
                        '''
                        sh 'docker build -t geunwook/backend:latest .'
                    }
                }
            }
        }

        // 5. 원격 서버에 배포
        stage('Deploy to Remote Server') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh '''
                        docker save geunwook/frontend1:latest | ssh -o StrictHostKeyChecking=no ubuntu@${REMOTE_SERVER} 'docker load'
                        docker save geunwook/backend:latest | ssh -o StrictHostKeyChecking=no ubuntu@${REMOTE_SERVER} 'docker load'

                        scp -o StrictHostKeyChecking=no ${DOCKER_COMPOSE_FILE} ubuntu@${REMOTE_SERVER}:/home/ubuntu

                        ssh -o StrictHostKeyChecking=no ubuntu@${REMOTE_SERVER} << EOF
                            cd /home/ubuntu
                            docker-compose -f ${DOCKER_COMPOSE_FILE} down
                            docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build
EOF
                        '''
                    }
                }
            }
        }
    }
    post {
        always {
            // 파이프라인 실행 후 워크스페이스 정리 (불필요한 파일 삭제)
            cleanWs()
        }
    }
}
