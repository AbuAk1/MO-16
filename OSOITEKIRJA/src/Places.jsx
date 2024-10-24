import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { TextInput, Button, Card, IconButton } from 'react-native-paper'
import { useState } from 'react';
import { useDatabase, saveItem, deleteItem } from './db';



function Places({ navigation }) {

  const { dbData, setDbData } = useDatabase();
  const [address, setAddress] = useState("");

  const handleSave = () => {
    saveItem(address, address, setDbData);
  }

  const handleDelete = (id) => {
    console.log("poista", id);
    deleteItem(id, setDbData);
  }


  return (
    <>
      <TextInput
        style={{ width: '90%', marginBottom: 10 }}
        label="PLACEFINDER"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <Button mode="contained" icon="content-save" title="Save" onPress={handleSave} >Save</Button>

      <FlatList
        style={{ marginTop: 10, width: '90%' }}
        renderItem={({ item }) =>
          <TouchableOpacity onLongPress={() => handleDelete(item.id)}>
            <Card  >
              <Card.Content >
                <Card.Title
                  title={item.address + " " + item.city}
                  right={(props) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text variant="bodyMedium">Show on map</Text>
                      <IconButton
                        {...props}
                        iconColor="grey"
                        mode="outlined"
                        icon="arrow-right"
                        onPress={() => navigation.navigate("Map", { address: item.address })}
                      />

                    </View>
                  )}
                />

              </Card.Content >
            </Card >
          </TouchableOpacity>
        }
        data={dbData} />


    </>

  )
}

export default Places