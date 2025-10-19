import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

const audioSource = require('../assets/kids-background-music.mp3');

export default function useBackgroundAudio(control: boolean) {
  const sound = useAudioPlayer(audioSource);

  useEffect(() => {
    if (control) {
      try {
        sound.play();
        sound.loop = true;
        console.log("playing");
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    } else {
      sound.pause();
      console.log("pause");
    }
  }, [control, sound]); // Add dependencies here

  // Optional: Cleanup on unmount
  useEffect(() => {
    return () => {
      sound.pause();
      // sound.isLoaded = false;
    };
  }, [sound]);
}