import React from 'react'
import { FlatList } from 'react-native';
import { TextInput, Button, Card , IconButton} from 'react-native-paper'
import { useState } from 'react';

function Places() {
    const [address, setAddress] = useState("");
    const [testAddress, setTestAddress] = useState([{id: 1, address: "Asemakuja 2", city:"Espoo"},{id: 2, address: "Mannerheimintie 10", city:"Helsinki"}]);

    const handleSave= () => {
        console.log("Tallenna");
        console.log(testAddress[1].address);
    }
    const handleDelete = (address) => {
        // const itemRef = ref(database, `items/${item.id}`);
        // remove(itemRef);
        console.log("poista", address);
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
         renderItem={({ item }) =>
            <Card  >
              <Card.Content >
                <Card.Title
                
                 title={item.address}
                 subtitle={item.city}
                 right={(props) => (
                    <IconButton
                      {...props}
                      iconColor="red"
                      icon="trash-can"
                    //   onPress={() => handleDelete(address)}
                      />
                 )}/>
                 
              </Card.Content >
            </Card >
          }
          data={testAddress} />
    

    </>
    
  )
}

export default Places