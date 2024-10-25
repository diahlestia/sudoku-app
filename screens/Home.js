import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import {Picker} from '@react-native-picker/picker';


function Home ({navigation}) {

    const [name, setName] = useState('');
    const [level, setLevel] = useState('Easy');

    const toScreen = () => {
        if (name !== '') {
            navigation.navigate('Game', { username: name, difficulty: level })
        }
        else {
            alert('Oops, name is required')
        }
    }


    return (
        <> 
        <Container>
            <Header></Header>
            <Content>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{fontSize: 30}}>Welcome to sudoku</Text>
            </View>
            <View>
                <Image 
                style={{width: 200, height: 200, alignSelf: 'center'}}
                source={{uri: 'https://c.tenor.com/Tesa8yYh04QAAAAj/play-games-games.gif'}} />
            </View>
            <Form>
                <Item floatingLabel>
                <Label>Username</Label>
                <Input 
                placeholder="Type your name"
                onChangeText={value => setName(value)}
                />
                </Item>
                <Item picker style={{marginLeft: 17}}>
                <Label>Level</Label>
                <Picker
                    level={level}
                    style={{ height: 50, width: 150}}
                    onValueChange={value => setLevel(value)}
                >
                    <Picker.Item label="Easy" value="Easy" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Hard" value="Hard" />
                    <Picker.Item label="Random" value="Random" />
                </Picker>
                </Item>
                <Button style={styles.btn}
                onPress={() => toScreen()}
                >
                    <Text style={{color: 'white'}}>Play Game!</Text>
                </Button>
            </Form>
            </Content>
        </Container>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft:40,
        paddingRight:40,
        marginTop:25
    }
});