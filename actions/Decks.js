import {AsyncStorage} from "react-native";

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

function ReceiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addNewDeck(title) {
    return {
        type: ADD_DECK,
        title,
    }
}

export function addNewCard(deck,question,answer) {
    return {
        type: ADD_CARD,
        deck,
        question,
        answer,
    }
}

export function handleInitialData() {
    return (dispatch) => {
        return AsyncStorage.getItem('@UdaciCards')
            .then((decks)=>{
                const decksObj = JSON.parse(decks)
                if(Object.keys(decksObj).length>0){
                    dispatch(ReceiveDecks(decksObj));
                }
            })
    }
}

export function handleNewDeck(title) {
    return (dispatch, getState) => {
        dispatch(addNewDeck(title));
    }
}

export function handleNewCard(deckTitle,questionInput,answerInput) {
    return (dispatch, getState) => {
        const store = getState()
        dispatch(addNewCard(store.decks[deckTitle],questionInput,answerInput));
    }
}
