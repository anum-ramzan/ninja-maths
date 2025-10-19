import React from 'react'
import { View } from 'react-native'

export default function Wrapper(props: any) {
  return (
    <View style={props.styleName}>
        {props.children}
    </View>
  )
}
