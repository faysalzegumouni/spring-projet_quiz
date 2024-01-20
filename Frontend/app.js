const loginForm = document.getElementById('loginForm');
const quizListSection = document.getElementById('quizListSection');
const quizList = document.getElementById('quizList');
const quizQuestionsSection = document.getElementById('quizQuestionsSection');
const questionContainer = document.getElementById('questionContainer');

document.addEventListener('DOMContentLoaded', function() {
    loadQuizList();
});
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginRequest = {
        username: username,
        password: password
    };

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
    })
    .then(response => response.json())
    .then(loginResponse => {
        console.log(loginResponse);
        if (loginResponse.authenticated) {
            quizListSection.style.display = 'block';
            loginSection.style.display = 'none';
        } else {
            alert('Échec de la connexion. Veuillez vérifier vos informations d\'identification.');
        }
    })
    .catch(error => console.error('Erreur lors de la connexion:', error));
}
function loadQuizList() {
    fetch('http://localhost:8080/Allquizzes')
        .then(response => response.json())
        .then(quizzes => {
            const quizList = document.getElementById('quizList');

            quizzes.forEach(quiz => {
                const li = document.createElement('li');
                const startButton = document.createElement('button');

                li.textContent = quiz.title;
                li.dataset.quizId = quiz.id;

                startButton.textContent = 'Start Quiz';
                startButton.addEventListener('click', () => startQuiz(quiz.id));

                li.appendChild(startButton);
                quizList.appendChild(li);
            });
            const quizListSection = document.getElementById('quizListSection');
            quizListSection.style.display = 'block';
        })
        .catch(error => console.error('Erreur lors du chargement de la liste des quiz:', error));
}


function startQuiz(quizId) {
    // Appeler l'API pour obtenir les détails du quiz spécifique par son ID
    fetch(`http://localhost:8080/quizzes/${quizId}`)
        .then(response => response.json())
        .then(quiz => {
            const quizListSection = document.getElementById('quizListSection');
            quizListSection.style.display = 'none';
            const quizQuestionsSection = document.getElementById('quizQuestionsSection');
            quizQuestionsSection.style.display = 'block';
            const questionContainer = document.getElementById('questionContainer');
            questionContainer.innerHTML = ''; 

            quiz.questions.forEach(question => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                const questionText = document.createElement('p');
                questionText.textContent = question.text;
                questionElement.appendChild(questionText);
                const optionsList = document.createElement('ul');
                question.options.forEach(option => {
                    const optionItem = document.createElement('li');
                    optionItem.textContent = option;
                    optionsList.appendChild(optionItem);
                });
                questionElement.appendChild(optionsList);

                questionContainer.appendChild(questionElement);
            });
          
        })
        .catch(error => console.error('Erreur lors du chargement des questions du quiz:', error));
}

