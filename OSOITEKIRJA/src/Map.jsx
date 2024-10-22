import React from 'react'
import { Button } from 'react-native-paper'
import { View, Text } from 'react-native';

function Map({ navigation }) {
    return (
        <View>
            <Text>Map</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Places')}>
                Go back
            </Button>
        </View>
    )
}

export default Map