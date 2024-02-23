let currentIndex = 0;
let currentQuestion;

document.getElementById('fetchButton').addEventListener('click', fetchQuestion);

document.getElementById('result').addEventListener('click', function(event) {
  if (event.target.classList.contains('answers')) {
    handleAnswerClick(event.target);
  }
});


document.getElementById('resetButton').addEventListener('click', resetQuiz);

function fetchQuestion() {
  fetch('answers.json')
    .then(response => response.json())
    .then(data => {
      if (currentIndex < data.length) {
        currentQuestion = data[currentIndex];
        currentIndex++;
        handleQuestion(currentQuestion, data.length);
      } else {
        document.getElementById('result').innerHTML = 'No more questions to display';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


function handleQuestion(question, totalQuestions) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <p>Question ${currentIndex}/${totalQuestions}</p>
    <p>${question.question}</p>
    <article class="btns-wrapper">
      <button class="answers">${question.A}</button>
      <button class="answers">${question.B}</button>
      <button class="answers">${question.C}</button>
      <button class="answers">${question.D}</button>
    </article>
  `;
}

function handleAnswerClick(button) {

  
  const correctAnswer = currentQuestion.correct;

  if (button === correctAnswer) {
    button.style.backgroundColor = 'green';
  } else {
    button.style.backgroundColor = 'red';
  }

  // Increment the index and fetch the next question
  currentIndex++;
  fetchQuestion();
}


function resetQuiz() {
  currentIndex = 0;
  document.getElementById('result').innerHTML = '';
  fetchQuestion();
}
