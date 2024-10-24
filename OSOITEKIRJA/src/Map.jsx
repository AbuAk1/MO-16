import React from 'react'
import { Button } from 'react-native-paper'
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

function Map({ navigation }) {

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

    return (
        <View>
            <Text>Map</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Places')}>
                Go back
            </Button>


            <MapView
                style={{ width: '100%', height: '100%' }}
                region={region}
            >
                <Marker
                    coordinate={{
                        latitude: 60.201373,
                        longitude: 24.934041
                    }}
                    title='Haaga-Helia'
                />
            </MapView>

        </View>
    )
}

export default Map