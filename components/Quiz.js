import React, {Component} from 'react'
import {View, Text} from "react-native";
import {connect} from "react-redux";
import Card from "./Card";

class Quiz extends Component {
    state = {
        cardIndex: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
    }

    render(){

        const {cardIndex,correctAnswers,incorrectAnswers} = this.state
        const {deckTitle} = this.props.route.params

        return (
            <Card
                deckTitle={deckTitle}
                cardIndex={cardIndex}
            />
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))(Quiz)
