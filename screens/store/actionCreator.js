import {
    BOARD_FETCH,
    BOARD_INITIAL_FETCH,
    BOARD_STATUS,
    BOARD_UPDATE,
    SET_LOADING,
    SET_ERROR
} from './actionTypes'

export function setBoard(input) {
    return {
        type: BOARD_FETCH,
        payload: input
    }
}

export function setLoading(input) {
    return {
        type: SET_LOADING,
        payload: input
    }
}


export function setInitialBoard(input) {
    return {
        type: BOARD_INITIAL_FETCH,
        payload: input
    }
}

export function setStatus(input) {
    return {
        type: BOARD_STATUS,
        payload: input
    }
}

export function updateBoard(rowIndex, colIndex, value) {
    return {
        type: BOARD_UPDATE,
        payload: {
            rowIndex,
            colIndex,
            value
        }
    }
}
