import { setBoard, setInitialBoard, setStatus, setLoading } from './actionCreator'

export const fetchBoard = (level) => {
    return (dispatch) => {
      dispatch(setLoading(true))  
      fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`, 
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then((result) => {
            dispatch(setBoard(result.board))
            dispatch(setInitialBoard(result.board))
        })
        .catch(err => {
            console.log(err)
        })
        .finally(_ => {
          dispatch(setLoading(false))
        })
    } 
}

export const validate = (data) => {
    return (dispatch, getState) => {
      dispatch(setLoading(true))
      console.log('validating..')
  
        return fetch(`https://sugoku.herokuapp.com/validate`, 
        {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => response.json())
        .then(response => {
            dispatch(setStatus(response.status))
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          dispatch(setLoading(false))
        })
    } 
}

export const autoSolving = (board) => {
    return (dispatch, getState) => {
      dispatch(setLoading(true))
      console.log('solving...')
    
    const data = {
      board
    }

    return fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(result => {
        dispatch(setInitialBoard(result.solution))
        dispatch(setStatus(result.status))
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {
        dispatch(setLoading(false))
      })
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object
    .keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');