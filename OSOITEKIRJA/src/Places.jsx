import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Button, Card , IconButton} from 'react-native-paper'
import { useState } from 'react';
import { useDatabase, saveItem , deleteItem} from './db';



function Places({navigation}) {
    const [address, setAddress] = useState("");
    const [testAddress, setTestAddress] = useState([{id: 1, address: "Asemakuja 2", city:"Espoo"},{id: 2, address: "Mannerheimintie 10", city:"Helsinki"}]);

    const handleSave= () => {
        // console.log("Tallenna");
        // console.log(testAddress[1].address);
        saveItem(address, address);
        // console.log(dbData);
    }
    const handleDelete = (id) => {
        console.log("poista", id);
        deleteItem(id);
    }
    
    const { dbData } = useDatabase();     
    // console.log(dbData);
    // console.log(testAddress)
 
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
        style={{ marginTop: 10, width: '90%'}}
      
        // keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) =>
          <TouchableOpacity onLongPress={()=> handleDelete(item.id)}>
            <Card  >
              <Card.Content >
                <Card.Title
                
                 title={item.address + " " + item.city}
                //  subtitle={item.city}
                 right={(props) => (
                    <IconButton
                      {...props}
                      // onLongPress={handleDelete}
                      iconColor="red"
                      icon="trash-can"
                    //   onPress={() => handleDelete(address)}
                        onPress={()=> navigation.navigate("Map")}
                      />
                    
                 )}/>
                 
              </Card.Content >
            </Card >
          </TouchableOpacity>
          }
          data={dbData} />
    

    </>
    
  )
}

export default Places