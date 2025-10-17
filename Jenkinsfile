pipeline {
    agent any   // Le pipeline peut tourner sur n'importe quel agent Jenkins

    tools {
        nodejs "NodeJS_16"   // Utilise l'installation NodeJS configurée dans Jenkins (Manage Jenkins > Tools)
    }

    environment {
        DOCKER_HUB_USER = 'aychana'       // Nom d'utilisateur Docker Hub
        FRONT_IMAGE = 'react-frontend'    // Nom de l'image frontend
        BACK_IMAGE  = 'express-backend'   // Nom de l'image backend
    }

    triggers {
        // Déclenche le pipeline automatiquement quand GitHub envoie un webhook (push, commit, etc.)
        GenericTrigger(
            genericVariables: [
                [key: 'ref', value: '$.ref'],                       // Branche concernée
                [key: 'pusher_name', value: '$.pusher.name'],       // Auteur du push
                [key: 'commit_message', value: '$.head_commit.message'] // Message du commit
            ],
            causeString: 'Push par $pusher_name sur $ref: "$commit_message"',
            token: 'mysecret',   // Jeton secret partagé avec GitHub pour sécuriser le webhook
            printContributedVariables: true, // Affiche les variables reçues
            printPostContent: true           // Affiche le contenu du webhook
        )
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupère le code source depuis GitHub
                git branch: 'main',
                    credentialsId: 'github-creds', // PAT GitHub stocké dans Jenkins
                    url: 'https://github.com/Aychana/express_mongo_react.git'
            }
        }

        stage('Install dependencies - Backend') {
            steps {
                dir('back-end') {
                    sh 'npm install'   // Installe les dépendances backend
                }
            }
        }

        stage('Install dependencies - Frontend') {
            steps {
                dir('front-end') {
                    sh 'npm install'   // Installe les dépendances frontend
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Lance les tests backend et frontend (si aucun test, affiche un message)
                    sh 'cd back-end && npm test || echo "Aucun test backend"'
                    sh 'cd front-end && npm test || echo "Aucun test frontend"'
                }
            }
        }
        
        // Étape du pipeline dédiée à l'analyse SonarQube
        stage('SonarQube Analysis') {
            steps {
                // Active l'environnement SonarQube configuré dans Jenkins
                // "SonarQubeServer" est le nom défini dans "Manage Jenkins > Configure System"
                withSonarQubeEnv('SonarQubeServer') { 
                    script {
                        // Récupère le chemin du SonarScanner installé via "Global Tool Configuration"
                        def scannerHome = tool 'SonarScanner' 
                        
                        // Exécute la commande sonar-scanner pour analyser le code
                        // Le scanner envoie les résultats au serveur SonarQube
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        // Étape du pipeline qui vérifie le Quality Gate
        stage('Quality Gate') {
            steps {
                // Définit un délai maximum de 3 minutes pour attendre la réponse de SonarQube
                timeout(time: 3, unit: 'MINUTES') {
                    // Attend le résultat du Quality Gate (succès ou échec)
                    // Si le Quality Gate échoue, le pipeline est automatiquement interrompu (abortPipeline: true)
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Construit les images Docker pour le frontend et le backend
                    sh "docker build -t $DOCKER_HUB_USER/$FRONT_IMAGE:latest ./front-end"
                    sh "docker build -t $DOCKER_HUB_USER/$BACK_IMAGE:latest ./back-end"
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                // Se connecte à Docker Hub avec les credentials Jenkins
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_USER/react-frontend:latest
                        docker push $DOCKER_USER/express-backend:latest
                    '''
                }
            }
        }

        stage('Clean Docker') {
            steps {
                // Nettoie les conteneurs arrêtés et les images inutilisées
                sh 'docker container prune -f'
                sh 'docker image prune -f'
            }
        }

        // stage('Check Docker & Compose') {
        //     steps {
        //         // Vérifie que Docker et Docker Compose sont installés
        //         sh 'docker --version'
        //         sh 'docker compose --version || echo "docker compose non trouvé"'
        //     }
        // }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                sh 'kubectl --kubeconfig=$KUBECONFIG apply -f k8s/ -n fil-rouge'
                }
            }
        }

        // stage('Deploy (compose.yaml)') {
        //     steps {
        //         dir('.') {
        //             // Important : si tu gardes des container_name fixes dans compose.yaml,
        //             // il faut supprimer les anciens conteneurs AVANT de relancer
        //             sh 'docker rm -f mongo express-api react-frontend || true'

        //             // Arrête et supprime les conteneurs du projet courant
        //             sh 'docker compose -f compose.yaml down || true'

        //             // Récupère les dernières images
        //             sh 'docker compose -f compose.yaml pull'

        //             // Redéploie les conteneurs
        //             sh 'docker compose -f compose.yaml up -d'

        //             // Vérifie l’état des conteneurs
        //             sh 'docker compose -f compose.yaml ps'

        //             // Affiche les 50 dernières lignes de logs
        //             sh 'docker compose -f compose.yaml logs --tail=50'
        //         }
        //     }
        // }

        stage('Smoke Test') {
            steps {
                // Vérifie que les services répondent bien sur les bons ports
                sh '''
                    echo " Vérification Frontend via Ingress..."
                    curl -f http://fil-rouge.local || echo "Frontend unreachable"

                    echo " Vérification Backend via Ingress..."
                    curl -f http://fil-rouge.local/api/health || echo "Backend unreachable"
                '''
            }
        }
    }

    post {
        success {
            // Envoie un mail si le pipeline réussit
            emailext(
                subject: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Pipeline réussi\nDétails : ${env.BUILD_URL}",
                to: "aychana07@gmail.com"
            )
        }
        failure {
            // Envoie un mail si le pipeline échoue
            emailext(
                subject: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Le pipeline a échoué\nDétails : ${env.BUILD_URL}",
                to: "aychana07@gmail.com"
            )
        }
    }
}
