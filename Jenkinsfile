// Jenkinsfile for integration of a Burp Suite Enterprise Edition CI-driven scan.

pipeline {
  agent any
  stages {
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
  post {
    always {
      junit testResults: 'burp_junit_report.xml', skipPublishingChecks: true, skipMarkingBuildUnstable: true, allowEmptyResults: true
        cleanWs()
    }
  }
}
