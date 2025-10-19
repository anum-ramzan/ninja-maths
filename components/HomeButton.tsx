// import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/assets/colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface NavigationButtonProps {
    title: string;
    path: string;
    iconName?: React.ComponentProps<typeof FontAwesome5>['name']; // Add icon name prop
    color?: string;
}

export default function NavigationButton({ title, path, iconName, color}: NavigationButtonProps) {

    const router = useRouter();

    return (
        <Pressable style={styles.buttonStyle} onPress={() => router.push(`${path}` as never)} >
            <FontAwesome5
            name={iconName}
            size={100}
            color={color} />
            <Text style={styles.buttonText && {color:color}}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.isabelline,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        minWidth: 200,
        borderColor: Colors.black,
        borderStyle: 'solid',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: '700',
    },
    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }]
    }
});