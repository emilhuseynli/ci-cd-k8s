node {

  try{
    stage('Checkout') {
      git 'https://github.com/emilhuseynli/ci-cd-k8s.git'
        sh "git rev-parse --short HEAD > .git/commit-id"
        imageTag= readFile('.git/commit-id').trim()
    }


    stage('RUN Unit Tests') {
      sh "npm install"
        sh "npm test"
    }

  } catch (err) {
    currentBuild.result = 'FAILURE'
  }
}
