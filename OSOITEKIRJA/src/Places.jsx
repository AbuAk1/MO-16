import React from 'react'
import { TextInput, Button } from 'react-native-paper'

function Places() {

    
    const [address, setAddress] = useState("");

  return (
    <>
    <TextInput
        style={{ width: '90%', marginBottom: 10 }} 
        label="PLACEFINDER"
        value={address}
        onChangeText={text => setAddress(text)}
    />
    <Button mode="contained" icon="content-save" title="Save" onPress={handleSave} >Save</Button>
    </>
    
  )
}

export default Places