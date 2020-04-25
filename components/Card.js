import React, {Component} from 'react'
import {View, Text, Button, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import styles from "../styles";

class Card extends Component {
    state = {
        showAnswer: false,
    }

    toggleShowAnswer = ()=>this.setState((currentState)=>{
        return {
            showAnswer:!currentState.showAnswer
        }
    })

    render(){

        const {showAnswer} = this.state
        const {decks,deckTitle,cardIndex,setScore} = this.props
        const deck = decks[deckTitle]
        const card = deck.questions[cardIndex]

        return (
            <View style={styles.centerView}>
                <Text style={{margin:10}}>{cardIndex+1}/{deck.questions.length}</Text>
                <Text style={styles.splashMessage}>{showAnswer?card.answer:card.question}</Text>
                <TouchableOpacity style={{marginBottom:40}} onPress={this.toggleShowAnswer}>
                    <Text>{showAnswer?'Show question':'Show answer'}</Text>
                </TouchableOpacity>
                <View style={{marginTop:20}}>
                    <Button title="Correct" color="#0C0" onPress={()=>setScore(true)}/>
                </View>
                <View style={{marginTop:20}}>
                    <Button title="Incorrect" color="#C00" onPress={()=>setScore(false)}/>
                </View>
            </View>
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))(Card)
