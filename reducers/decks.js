import {ADD_CARD, ADD_DECK, RECEIVE_DECKS} from "../actions/Decks";

export default function decks(state = {}, action) {
    const {type,decks,deck,title,question,answer} = action
    switch (type) {
        case RECEIVE_DECKS:
            return {...decks}
        case ADD_DECK:
            return {
                ...state,
                [title]: {
                    title,
                    questions: [],
                },
            }
        case ADD_CARD:
            return {
                ...state,
                [deck.title]: {
                    ...deck,
                    questions: deck.questions.concat({
                        question,
                        answer,
                    })
                }
            }
        default:
            return state;
    }
}
