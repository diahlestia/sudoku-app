import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoard, validate, autoSolving } from '../screens/store/action'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { setBoard, setInitialBoard, updateBoard } from '../screens/store/actionCreator'


const numColumns = 9

export default function Game({ navigation, route }) {

    const name = route.params.username 
    const level = route.params.difficulty 
    const capitalName = name.charAt(0).toUpperCase() + name.slice(1)

  let dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const initialBoard = useSelector(state => state.initialBoard)
  const status = useSelector(state => state.status)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(fetchBoard(level.charAt(0).toLowerCase() + level.slice(1)))
  }, [])

  const toUpdateBoard = (rowIndex, colIndex, value) => {
    dispatch(updateBoard(rowIndex, colIndex, value))
  }
  // console.log(initialBoard[0], "<<<initial")
  // console.log(board[0], "<<<board")


  const toSolve = (board) => {
    dispatch(autoSolving(board))
    alert('Your sugoku board has been solved by system, click submit to continue')
  }

  const toValidate = () => {
    const data = {board: initialBoard}
    dispatch(validate(data))
    alert(status)
  }
  // console.log(status, "status val current")
  
  const toSubmit = () => {
    if (status === "solved") {
      navigation.replace('Finish', {
        username: name,
        difficulty: level
      })
    }
    else {
      alert('Oops your game is not finished yet')
    }
  }


  return (
    <>
    <Container>
    <Header></Header>
    <Content>
      <View style={styles.container}>
      <View><Text style={{fontSize: 40}}>Sudoku Board</Text></View>
      <View style={{flexDirection: "row"}}>
        <Text style={{marginRight: 50}}>Hi, {capitalName}!</Text>
      </View>
        <View
          style={{flexDirection: "row"}}>
          <Text style={{marginRight: 50}}>Your game level is: {level}</Text>
        </View>

      {loading? 
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size='large' color='#0000ff'/>
        </View> 
        :
        initialBoard?.map((row, rowIndex) => {
          return (
              <View 
              key={rowIndex}
              style={{flexDirection: "row"}}
              >
              {
                row?.map((col, colIndex) => {
                        return (
                          <View key={colIndex} style={styles.box}>
                          {board[rowIndex][colIndex] != 0 ? <Text style={styles.containText}>{col}</Text> :
                            <TextInput
                                key={colIndex}
                                keyboardType="numeric"
                                maxLength = {1}
                                style={styles.inputText}
                                onChangeText={value => toUpdateBoard(rowIndex, colIndex, value)}
                            ></TextInput>
                          }
                          </View>
                        )
                })
        }
    </View>
)
})
}


        <View 
          style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            padding: 10
          }}
        >
          <Button
          onPress={toValidate}
          style={styles.btn}
          >
            <Text style={{color: "white"}}>Validate</Text>
          </Button>
          <Button
          onPress={() => toSolve(board)}
          style={styles.btn}
          >
            <Text style={{color: "white"}}>Surrender? Yes!</Text>
          </Button>
        </View>
        <View>
        <Button
          onPress={toSubmit}
          style={styles.btn}
        >
            <Text style={{color: "white"}}>Submit</Text>
          </Button>
        </View>
      </View>
      </Content>
      </Container>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
  box: {
    flexDirection: "row",
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    borderWidth: 1
  },
  containText: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width / numColumns,
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
