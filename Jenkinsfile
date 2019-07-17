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
      withDockerRegistry([credentialsId: "${Creds}", url: 'localhost:5000']) {
        sh "docker build -t ${ImageName}:${imageTag} ."
        sh "docker push ${ImageName}"
      }
    }

  } catch (err) {
    currentBuild.result = 'FAILURE'
  }
}
