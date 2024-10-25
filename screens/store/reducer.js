import {
    BOARD_FETCH,
    BOARD_INITIAL_FETCH,
    BOARD_STATUS,
    BOARD_UPDATE,
    SET_LOADING
} from './actionTypes'

const initialState = {
    board: [],
    initialBoard: [],
    status: '',
    loading: false
}

const reducer = (state=initialState, action) => {
    const { type, payload } = action
    // console.log(payload, "ini state")
    switch(type) {
        case BOARD_FETCH :
            // console.log(payload, "ini di reducer")
            // console.log(state, "=============state")
            return {...state, board: payload}
        case BOARD_INITIAL_FETCH:
            return {...state, initialBoard: payload}
        case BOARD_UPDATE:
            let { rowIndex, colIndex, value } = payload
            let newBoard = JSON.parse(JSON.stringify(state.board))
            newBoard[rowIndex][colIndex] = Number(value)
            return { ...state, initialBoard: newBoard }
        case BOARD_STATUS:
            return {...state, status: payload}
        case SET_LOADING:
            return { ...state, loading: payload }
        default:
            return state
    }
}

export default reducer