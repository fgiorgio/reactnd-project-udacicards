import React, {Component} from 'react'
import {View, Text, TextInput, Button, Keyboard} from "react-native";
import styles, {colorPrimary} from "../styles";
import {handleNewCard} from "../actions/Decks";
import {connect} from 'react-redux'

class NewCard extends Component {
    state = {
        questionInput: '',
        answerInput: '',
    }

    setQuestion = (questionInput)=>this.setState({questionInput})
    setAnswer = (answerInput)=>this.setState({answerInput})

    submitCard = () => {
        const {dispatch,navigation,route} = this.props
        const {questionInput,answerInput} = this.state
        dispatch(handleNewCard(route.params.deckTitle,questionInput.trim(),answerInput.trim()))
        this.setState({
            questionInput: '',
            answerInput: '',
        })
        Keyboard.dismiss()
        navigation.navigate('Deck',{deckTitle:route.params.deckTitle})
    }

    render(){

        const {questionInput,answerInput} = this.state

        return (
            <View style={styles.centerView}>
                <Text style={{fontSize:22}}>{this.props.route.params.deckTitle}</Text>
                <Text style={{fontSize:22,marginBottom:20}}>New Card</Text>
                <TextInput
                    placeholder="Question"
                    maxLength={50}
                    textAlign="center"
                    underlineColorAndroid={colorPrimary}
                    style={styles.textInput}
                    value={questionInput}
                    onChangeText={this.setQuestion}
                />
                <TextInput
                    placeholder="Answer"
                    maxLength={50}
                    textAlign="center"
                    underlineColorAndroid={colorPrimary}
                    style={styles.textInput}
                    value={answerInput}
                    onChangeText={this.setAnswer}
                />
                <View style={{marginTop:20}}>
                    <Button
                        title="Submit"
                        onPress={this.submitCard}
                        disabled={questionInput==='' || answerInput===''}
                    />
                </View>
            </View>
        )
    }
}

export default connect()(NewCard)
