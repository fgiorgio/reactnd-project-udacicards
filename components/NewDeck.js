import React, {Component} from 'react'
import {View, Text, TextInput, Button, Keyboard} from "react-native";
import styles, {colorPrimary} from "../styles";
import {connect} from 'react-redux'
import {handleNewDeck} from "../actions/Decks";

class NewDeck extends Component {
    state = {
        titleInput: '',
    }

    setTitle = (titleInput)=>this.setState({titleInput})

    submitDeck = () => {
        const {dispatch,navigation} = this.props
        const {titleInput} = this.state
        dispatch(handleNewDeck(titleInput.trim()))
        this.setState({titleInput:''})
        Keyboard.dismiss()
        navigation.navigate('Deck',{deckTitle:titleInput.trim()})
    }

    render(){

        const {titleInput} = this.state

        return (
            <View style={styles.centerView}>
                <Text style={styles.splashMessage}>
                    What's the title of your new Deck?
                </Text>
                <TextInput
                    placeholder="My Deck"
                    maxLength={20}
                    textAlign="center"
                    underlineColorAndroid={colorPrimary}
                    style={styles.textInput}
                    value={titleInput}
                    onChangeText={this.setTitle}
                />
                <Button
                    title="Submit"
                    onPress={this.submitDeck}
                    disabled={titleInput===''}
                />
            </View>
        )
    }
}

export default connect()(NewDeck)
