properties([pipelineTriggers([githubPush()])])

pipeline {
    agent any

    tools {
        //jdk "openjdk-9"
        //maven "maven 3"
    }
        
    stages {
        stage('Cloning Git') {
            steps {
                git url:'git@github.com:PayeTonKawa/api-webshop.git', 
                    credentialsId: 'GitSSH', 
                    branch:'main'
            }
        }
        stage('Build') {
            steps {
                sh "npm install"
            } 
        }
        stage('Run') {
            steps {
                sh "npm run prod"
            }
        }
        stage('Tests') {
            steps {
                sh "npm run test"
            }
        }
    post { 
        always { 
            cleanWs()
        }
    }
}
