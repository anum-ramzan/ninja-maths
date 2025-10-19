import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

export default function ContainerBackground() {
    return (
        <>
            <ImageBackground
                source={require('../assets/images/background-AI.png')}
                resizeMode="cover" style={styles.backgroundImage}
            />
        </>)
}


const styles = StyleSheet.create({

    backgroundImage: {
        position: 'absolute', // This takes the image out of the normal component flow
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.3)',
    },
})