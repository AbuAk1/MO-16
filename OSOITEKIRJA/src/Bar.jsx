import React from 'react'
import { Appbar } from 'react-native-paper'

export default function Bar({ navigation, previous}) {

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      {/* <Appbar.BackAction onPress={() => {() => navigation.goBack()}} /> */}

        <Appbar.Content title="My Places"/>
    </Appbar.Header>
  )
}
