import { useState } from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

export default function HomeScreen() {
  const [targetSeconds, setTargetSeconds] = useState(60)
  const [currentSeconds, setCurrentSeconds] = useState(0)

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text>Let's Meditate!</Text>
      <Text>Target: {targetSeconds} seconds</Text>
      <Text>{currentSeconds} seconds</Text>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
      <StatusBar style='auto' />
    </View>
  )
}
