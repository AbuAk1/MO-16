import React from 'react'
import { Button } from 'react-native-paper'

function Map({navigation}) {
  return (
    <>
    <div>Map</div>
    <Button title="Go back" onPress={() => navigation.navigate('Places')} />
    
    </>
  )
}

export default Map