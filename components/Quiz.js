import React, {Component} from 'react'
import {connect} from "react-redux";
import Card from "./Card";
import {Button, Text, View} from "react-native";
import styles from "../styles";

class Quiz extends Component {
    state = {
        cardIndex: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
    }

    setScore = (answerCorrect)=>{
        this.setState((currentState)=>{
            let newState = {cardIndex:currentState.cardIndex+1};
            (answerCorrect)
                ?newState.correctAnswers=currentState.correctAnswers+1
                :newState.incorrectAnswers=currentState.incorrectAnswers+1;
            return newState
        })
    }

    render(){

        const {cardIndex,correctAnswers,incorrectAnswers} = this.state
        const {decks,navigation,route} = this.props
        const {deckTitle} = route.params

        if(decks[deckTitle].questions.length===0){
            return (
                <View style={styles.centerView}>
                    <Text style={styles.splashMessage}>
                        There are no cards in this Deck
                    </Text>
                    <Button title="New Card" onPress={()=>navigation.replace('New Card',{deckTitle})} />
                </View>
            )
        }

        if(cardIndex===decks[deckTitle].questions.length){
            navigation.replace('Quiz Results',{deckTitle,correctAnswers,incorrectAnswers})
            return (<Text></Text>)
        }

        return (
            <Card
                deckTitle={deckTitle}
                cardIndex={cardIndex}
                setScore={this.setScore}
            />
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))(Quiz)
