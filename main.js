import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', () => {
  const responses = [
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

  const WEBSITE_URL = 'https://magic-8ball.subproject9.com';
  const WEBSITE_TAGLINE = 'Seek wisdom from the mystical Magic 8 Ball - Your digital fortune teller';

  const ball = document.querySelector('.magic-8ball');
  const answerText = document.querySelector('.answer-text');
  const shakeButton = document.querySelector('#shake');
  const questionInput = document.querySelector('#question');
  const shareButton = document.querySelector('#share');
  const shareOptions = document.querySelector('.share-options');
  const predictionDisplay = document.querySelector('.prediction-display');
  const shakeSound = document.getElementById('shakeSound');

  let isShaking = false;
  let canPlaySound = false;

  // Initialize sound on first interaction
  function initializeSound() {
    shakeSound.volume = 0.5;
    canPlaySound = true;
    document.removeEventListener('click', initializeSound);
  }

  document.addEventListener('click', initializeSound);

  function getRandomResponse() {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function showAnswer(answer) {
    answerText.textContent = answer;
    answerText.classList.add('visible');
    predictionDisplay.textContent = `Question: "${questionInput.value}"`;
  }

  function hideAnswer() {
    answerText.classList.remove('visible');
    predictionDisplay.textContent = '';
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
    
    if (canPlaySound) {
      shakeSound.currentTime = 0;
      shakeSound.play().catch(error => {
        console.log('Sound play failed:', error);
      });
    }
    
    ball.classList.add('shake');
    
    setTimeout(() => {
      ball.classList.remove('shake');
      showAnswer(getRandomResponse());
      shareButton.style.display = 'block';
      isShaking = false;
    }, 1000);
  }

  // Event Listeners
  shakeButton.addEventListener('click', shakeBall);
  ball.addEventListener('click', shakeBall);
  questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') shakeBall();
  });

  shareButton.addEventListener('click', (e) => {
    e.stopPropagation();
    shareOptions.classList.toggle('show');
  });

  // Add mute button
  const muteButton = document.createElement('button');
  muteButton.className = 'mute-button';
  muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  document.querySelector('.container').appendChild(muteButton);

  muteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    canPlaySound = !canPlaySound;
    muteButton.innerHTML = canPlaySound ? 
      '<i class="fas fa-volume-up"></i>' : 
      '<i class="fas fa-volume-mute"></i>';
  });

  // Share functionality
  document.querySelectorAll('.share-option').forEach(button => {
    button.addEventListener('click', async () => {
      const platform = button.dataset.platform;
      const prediction = answerText.textContent;
      const question = questionInput.value;
      
      const shareText = `Question: "${question}"\nMagic 8 Ball says: "${prediction}"\n\n${WEBSITE_TAGLINE}\n`;
      
      switch(platform) {
        case 'twitter':
          const twitterText = `${shareText}Try your luck at ${WEBSITE_URL}`;
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, '_blank');
          break;
          
        case 'facebook':
          const fbText = `${shareText}Try your luck at ${WEBSITE_URL}`;
          window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(fbText)}&u=${encodeURIComponent(WEBSITE_URL)}`, '_blank');
          break;
          
        case 'image':
          const imageData = await generateImage();
          if (imageData) {
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'magic-8ball-prediction.png';
            link.click();
          }
          break;
          
        case 'download':
          const element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(shareText));
          element.setAttribute('download', 'magic-8ball-prediction.txt');
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          break;
      }
    });
  });

  // Image generation
  async function generateImage() {
    const loadingDiv = document.querySelector('.loading');
    loadingDiv.classList.add('visible');
    
    try {
      const captureArea = document.querySelector('.capture-area');
      const canvas = await html2canvas(captureArea, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      loadingDiv.classList.remove('visible');
    }
  }

  // Add loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  loadingDiv.appendChild(spinner);
  document.body.appendChild(loadingDiv);
});
