node {
  def ImageName = "ci-cd-k8s"
  def Creds	= "docker-registry-user"
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

    stage('Docker Build, Push'){
      withDockerRegistry([credentialsId: "${Creds}", url: 'http://localhost:5000']) {
        sh "docker build -t ${ImageName}:${imageTag} ."
        sh "docker push localhost:5000/${ImageName}"
      }
    }

  } catch (err) {
    echo "Exception thrown:\n ${err}"
    currentBuild.result = 'FAILURE'
  }
}
