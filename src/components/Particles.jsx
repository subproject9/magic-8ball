import React from 'react'
import { motion } from 'framer-motion'

const Particles = ({ isShaking }) => {
  const particles = Array.from({ length: 12 })

  return (
    <div className="particles-container">
      {isShaking && particles.map((_, index) => (
        <motion.div
          key={index}
          className="particle"
          initial={{ 
            x: 0, 
            y: 0, 
            scale: 0,
            opacity: 1 
          }}
          animate={{ 
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: Math.random() * 1.5,
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 0.8 + 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

export default Particles
