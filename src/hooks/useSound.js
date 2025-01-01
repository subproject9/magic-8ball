import { useEffect, useRef } from 'react'

export const useSound = () => {
  const shakeSound = useRef(new Audio('/sounds/shake.mp3'))
  const positiveSound = useRef(new Audio('/sounds/positive.mp3'))
  const negativeSound = useRef(new Audio('/sounds/negative.mp3'))

  useEffect(() => {
    // Preload sounds
    shakeSound.current.load()
    positiveSound.current.load()
    negativeSound.current.load()
  }, [])

  const playShake = () => {
    shakeSound.current.currentTime = 0
    shakeSound.current.play()
  }

  const playAnswer = (isPositive) => {
    const sound = isPositive ? positiveSound.current : negativeSound.current
    sound.currentTime = 0
    sound.play()
  }

  return { playShake, playAnswer }
}
