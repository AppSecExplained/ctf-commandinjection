pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup and Run App') {
            steps {
                script {
                    sh '''
                        npm install
                        node server.js &
                    '''
                    sleep(time: 10, unit: 'SECONDS')
                }
            }
        }

        stage ("Docker Run Example Scan") {
            steps {
                sh '''
                    docker run --rm --pull=always \
                    -u $(id -u) -v ${WORKSPACE}:${WORKSPACE}:rw -w ${WORKSPACE} \
                    -e BURP_CONFIG_FILE_PATH=${WORKSPACE}/burp_config.yml \
                    public.ecr.aws/portswigger/enterprise-scan-container:latest
                '''
                }
            }
        }
    }

    post {
        always {
            sh '''
                pkill -f "node server.js"
            '''
        }
    }
}
