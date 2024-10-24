import React from 'react'
import { Button } from 'react-native-paper'
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';

function Map({ navigation , route }) {

    const [data, setData] = useState(null);
    const { address } = route.params;

    //https://geocode.maps.co/search?q=address&api_key=api_key
    const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY;
    // const testAddress = "Mannerheimintie 10"


    useEffect(() => {

        console.log(address)
        getAddressRegion();
        // console.log(data)

    }, [])

    const getAddressRegion = async () => {
        try {
            const response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${EXPO_PUBLIC_API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            const boundingBox = json[0]["boundingbox"];
            setData({
                latitude: parseFloat(boundingBox[0]), 
                longitude: parseFloat(boundingBox[2]),
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            });

            setRegion({
                latitude: parseFloat(boundingBox[0]), 
                longitude: parseFloat(boundingBox[2]),
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            });


            //   setData(json[0]["boundingbox"][0],json[0]["boundingbox"][2],2,2);
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    }

    // console.log(data);
    // console.log(EXPO_PUBLIC_API_KEY);

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
            {/* <Button mode="contained" onPress={getAddressRegion}>
                test fetch
            </Button> */}


            <MapView
                style={{ width: '100%', height: '100%' }}
                region={region}
            >
                <Marker
                    // coordinate={{
                    //     latitude: 60.201373,
                    //     longitude: 24.934041
                    // }}

                    coordinate={region}
                    title='Haettu osoite'
                />
            </MapView>

        </View>
    )
}

export default Map