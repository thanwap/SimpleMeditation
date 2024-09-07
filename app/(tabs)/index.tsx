import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, TextInput, Text } from 'react-native-paper'
import { Audio } from 'expo-av'

export default function HomeScreen() {
  const [targetMinutes, setTargetMinutes] = useState(30)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [meditateInterval, setMeditateInterval] = useState<NodeJS.Timeout | undefined>()

  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/mixkit-relaxing-bell-chime-3109.wav')
      )
      await sound.playAsync()
    }

    if (currentSeconds >= targetMinutes * 60) {
      clearTimeout(meditateInterval)
      setMeditateInterval(undefined)
      playSound().catch(console.error)
    }
  }, [currentSeconds])

  const handleTargetSecondsChange = (text: string) => {
    const seconds = parseInt(text)
    if (isNaN(seconds)) {
      setTargetMinutes(0)
    } else {
      setTargetMinutes(seconds)
    }
  }

  const startMeditate = () => {
    clearTimeout(meditateInterval)
    setCurrentSeconds(0)
    setMeditateInterval(
      setInterval(() => {
        setCurrentSeconds((prev) => prev + 1)
      }, 1000)
    )
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <View className='flex-1 gap-5 justify-center p-5 bg-white'>
      <Text variant='displayLarge' className='text-center'>
        Let's Meditate
      </Text>
      <TextInput
        keyboardType='number-pad'
        label='Target (Minutes)'
        value={targetMinutes.toString()}
        onChangeText={handleTargetSecondsChange}
      />
      <Button mode='contained' onPress={startMeditate}>
        Let Go
      </Button>
      <Text className='text-center'>{formatTime(currentSeconds)}</Text>
      <StatusBar style='auto' />
    </View>
  )
}
