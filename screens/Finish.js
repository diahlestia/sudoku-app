import React from 'react';
import { useDispatch } from 'react-redux'
import { fetchBoard, validate, autoSolving } from '../screens/store/action'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

export default function Finish({ navigation, route }) {

    const name = route.params.username 
    const level = route.params.difficulty 
    const capitalName = name.charAt(0).toUpperCase() + name.slice(1)
    let dispatch = useDispatch()

    const toPlayAgain = () => {
        dispatch(fetchBoard(level))
        navigation.navigate('Game', {
            username: name,
            difficulty: level
          })
      }

    return (
        <>
        <Container>
            <Header></Header>
                <View style={{
                position: 'absolute', 
                top: 0, left: 0, 
                right: 0, bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                    <Text style={{fontSize: 25}}>
                        Finish!
                    </Text>
                    <Text style={{fontSize: 15}}>
                        congrats sweetie, {capitalName}
                    </Text>
                    <View>
                        <Image 
                        style={{width: 200, height: 200}}
                        source={{uri: 'https://i.pinimg.com/originals/fe/5e/68/fe5e68978d60b4d939f4c836ef7d8158.gif'}}/>
                    </View>
                    <Button
                    onPress={toPlayAgain}
                    style={styles.btn}
                    ><Text style={{color: 'white'}}>Play again? Click here~</Text></Button>
                </View>
        </Container>
        </>
    )
}

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
        marginTop:10,
        marginLeft: 20
      }
  });