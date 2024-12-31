import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RippleEffect = () => {
  const [ripples, setRipples] = useState([])

  const createRipple = () => {
    const newRipple = {
      id: Date.now(),
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10
    }
    setRipples(prev => [...prev, newRipple])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
  }

  return (
    <div className="ripple-container">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="ripple"
            initial={{ 
              scale: 0.3,
              opacity: 0.8,
              x: ripple.x,
              y: ripple.y
            }}
            animate={{ 
              scale: 1.5,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default RippleEffect
