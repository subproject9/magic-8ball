import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Particles from './components/Particles'
import RippleEffect from './components/RippleEffect'

const ANSWERS = [
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

const POSITIVE_ANSWERS = ANSWERS.slice(0, 10);
const THEME_KEY = 'magic8ball_theme';

const THEMES = [
  { 
    id: 'classic', 
    icon: '🌠', 
    tooltip: 'Classic Theme',
    color: '#004e92' 
  },
  { 
    id: 'mystical', 
    icon: '🔮', 
    tooltip: 'Mystical Theme',
    color: '#2c0337' 
  },
  { 
    id: 'neon', 
    icon: '⚡', 
    tooltip: 'Neon Theme',
    color: '#ff0080' 
  },
  { 
    id: 'cosmic', 
    icon: '🌌', 
    tooltip: 'Cosmic Theme',
    color: '#1a237e' 
  },
  { 
    id: 'retro', 
    icon: '🕹️', 
    tooltip: 'Retro Theme',
    color: '#ff4081' 
  },
  { 
    id: 'dark', 
    icon: '✨', 
    tooltip: 'Dark Theme',
    color: '#1a1a1a' 
  }
];

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Ask a question...')
  const [isShaking, setIsShaking] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'classic'
  })
  const ballControls = useAnimation()

  useEffect(() => {
    document.body.className = `theme-${theme}`
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    ballControls.start({
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }, [])

  const shakeBall = () => {
    if (!question.trim() || isShaking) return
    
    setIsShaking(true)
    setAnswer('...')
    
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
    
    setTimeout(() => {
      const randomAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)]
      setAnswer(randomAnswer)
      setIsShaking(false)
    }, 1000)
  }

  return (
    <div className={`container theme-${theme}`}>
      <div className="header">
        <h1 className="title">Magic 8-Ball</h1>
        <motion.p 
          className="tagline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Seek wisdom from the mystical sphere
        </motion.p>
      </div>

      <motion.input
        type="text"
        className="question-input"
        placeholder="Enter your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && shakeBall()}
        whileFocus={{ scale: 1.02 }}
      />
      
      <div className="ball-container">
        <Particles isShaking={isShaking} />
        <motion.div
          className="eight-ball"
          onClick={shakeBall}
          animate={ballControls}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          drag
          dragConstraints={{
            top: -10,
            right: 10,
            bottom: 10,
            left: -10,
          }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{ perspective: 1000 }}
        >
          <motion.div 
            className="eight-ball-content"
            animate={isShaking ? {
              rotateX: [0, 10, -10, 8, -8, 0],
              rotateY: [0, -10, 10, -8, 8, 0],
            } : {}}
            transition={{ 
              duration: 1,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="answer-window"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={answer}
            >
              {answer === '...' ? (
                <motion.div
                  className="loading-dots"
                  animate={{ 
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {answer}
                </motion.div>
              ) : (
                <motion.p 
                  className={`answer ${POSITIVE_ANSWERS.includes(answer) ? 'positive' : 'negative'}`}
                  initial={{ 
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  {answer}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
          <RippleEffect />
        </motion.div>
      </div>

      <p className="shake-instruction">
        Click, drag, or shake the ball for an answer
      </p>

      <div className="theme-selector-container">
        {THEMES.map((themeOption) => (
          <motion.button
            key={themeOption.id}
            className={`theme-option ${theme === themeOption.id ? 'active' : ''}`}
            data-theme={themeOption.id}
            data-tooltip={themeOption.tooltip}
            onClick={() => setTheme(themeOption.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: THEMES.indexOf(themeOption) * 0.1
            }}
          >
            <span className="theme-icon">{themeOption.icon}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default App
