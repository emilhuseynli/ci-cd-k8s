node {
  def Namespace = "default"
  def ImageName = "ci-cd-k8s"
  def Registry  = "localhost:5000"
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
      withDockerRegistry([credentialsId: "${Creds}", url: "http://${Registry}"]) {
        sh "docker build -t ${ImageName}:${imageTag} ."
        sh "docker tag ${ImageName}:${imageTag} ${Registry}/${ImageName}:${imageTag}"
        sh "docker push ${Registry}/${ImageName}:${imageTag}"
        sh "docker rmi ${Registry}/${ImageName}:${imageTag}"
        sh "docker rmi ${ImageName}:${imageTag}"
      }
    }

    stage('Deploy on K8s'){
     sh "ansible-playbook $HOME/${ImageName}/deploy/ansible/deploy.yml  --user=jenkins --extra-vars ImageRepository=${Registry} --extra-vars ImageName=${ImageName} --extra-vars imageTag=${imageTag} --extra-vars Namespace=${Namespace}"
    }

  } catch (err) {
    echo "Exception thrown:\n ${err}"
    currentBuild.result = 'FAILURE'
  }
}
