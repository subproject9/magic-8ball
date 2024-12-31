addconst responses = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

const ball = document.querySelector('.magic-8ball');
const answerText = document.querySelector('.answer-text');
const shakeButton = document.querySelector('#shake');
const questionInput = document.querySelector('#question');
const shareButton = document.querySelector('#share');
const shareOptions = document.querySelector('.share-options');

let isShaking = false;

function getRandomResponse() {
  return responses[Math.floor(Math.random() * responses.length)];
}

function showAnswer(answer) {
  answerText.textContent = answer;
  answerText.classList.add('visible');
}

function hideAnswer() {
  answerText.classList.remove('visible');
}

function shakeBall() {
  if (isShaking || !questionInput.value.trim()) {
    if (!questionInput.value.trim()) {
      alert('Please ask a question first!');
    }
    return;
  }

  isShaking = true;
  hideAnswer();
  shareButton.style.display = 'none';
  shareOptions.classList.remove('show');
  
  ball.classList.add('shake');
  
  setTimeout(() => {
    ball.classList.remove('shake');
    showAnswer(getRandomResponse());
    shareButton.style.display = 'block';
    isShaking = false;
  }, 1000);
}

shakeButton.addEventListener('click', shakeBall);
ball.addEventListener('click', shakeBall);
questionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') shakeBall();
});

shareButton.addEventListener('click', () => {
  shareOptions.classList.toggle('show');
});

document.querySelectorAll('.share-option').forEach(button => {
  button.addEventListener('click', () => {
    const platform = button.dataset.platform;
    const text = `Question: "${questionInput.value}"\nMagic 8 Ball says: "${answerText.textContent}"`;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'download':
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'magic-8ball-prediction.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        break;
    }
  });
});
