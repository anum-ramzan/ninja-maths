import Colors from '@/assets/colors';
import useBackgroundAudio from '@/hooks/useBackgroundAudio';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";

// Define the type for operations
type MathOperation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export default function Layout() {

  const [volume, setVolume] = useState(true);

  useBackgroundAudio(volume);  
  
  return (
    <Stack screenOptions={() => ({
      headerRight: () => (
        <>
          <Pressable onPress={() => {
            setVolume(prev => !prev);
            console.log(volume)
          }}>
            <FontAwesome
              name={volume ? "volume-up" : "volume-off"}
              size={30}
              color={volume ? Colors.black : Colors.trukeyRed} />
          </Pressable>
        </>
      )
    })} >
      <Stack.Screen
        name="index"
        options={{
          title: "Math Practice",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="calculate"
        options={({ route }) => {
          // Cast the operation parameter to our defined type
          const operation = route.params?.operation as MathOperation | undefined;
          return {
            title: getTitleFromOperation(operation),
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          };
        }}
      />

    </Stack>

  );
}
// Properly typed function with fallback
function getTitleFromOperation(operation: MathOperation | undefined): string {
  const titles: Record<MathOperation, string> = {
    addition: 'Addition Practice',
    subtraction: 'Subtraction Practice',
    multiplication: 'Multiplication Practice',
    division: 'Division Practice'
  };

  // Check if operation is valid before using it as a key
  if (operation && Object.keys(titles).includes(operation)) {
    return titles[operation as MathOperation];
  }

  return 'Math Practice';
}