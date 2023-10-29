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

        stage('Burp Suite Scan') {
            steps {
                script {
                    def burpScanner = tool name: 'BURP_SCANNER_NAME', type: 'BurpSuiteScannerInstallation'
                    sh '''
                        ${burpScanner}/burpsuite_pro.cli --config-file=burp_config.yml
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
