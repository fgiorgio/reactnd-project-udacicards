import React, {Component} from 'react'
import {View, Text, Button} from "react-native";
import styles from "../styles";
import {connect} from "react-redux";
import {clearLocalNotification} from "../utils/notification";

class QuizResult extends Component {
    componentDidMount() {
        clearLocalNotification()
    }

    render(){

        const {decks,route,navigation} = this.props
        const {deckTitle,correctAnswers,incorrectAnswers} = route.params
        const totalQuestions = decks[deckTitle].questions.length

        return (
            <View style={styles.centerView}>
                <Text style={{fontSize:22}}>{deckTitle}</Text>
                <Text style={{marginBottom:40}}>{totalQuestions} cards</Text>
                <Text style={{fontSize:22,marginBottom:20}}>Results:</Text>
                <Text style={{fontSize:18}}>Correct: {correctAnswers} ({Math.round(correctAnswers*100/totalQuestions)}%)</Text>
                <Text style={{fontSize:18}}>Incorrect: {incorrectAnswers} ({Math.round(incorrectAnswers*100/totalQuestions)}%)</Text>
                <View style={{marginTop:40}}>
                    <Button title="Restart" onPress={()=>navigation.replace('Quiz',{deckTitle})}/>
                </View>
                <View style={{marginTop:20}}>
                    <Button title="Back to Deck" onPress={()=>navigation.goBack()}/>
                </View>
            </View>
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))(QuizResult)
