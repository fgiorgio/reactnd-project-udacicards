import React, {Component} from 'react'
import {View, Text, Button} from "react-native";
import styles from "../styles";
import {connect} from 'react-redux'

class Deck extends Component {
    render(){

        const {deckTitle} = this.props.route.params
        const {decks,navigation} = this.props

        return (
            <View style={styles.centerView}>
                <Text style={{fontSize:22}}>{deckTitle}</Text>
                <Text style={{marginBottom:40}}>{decks[deckTitle].questions.length} cards</Text>
                <View style={{marginBottom:20}}>
                    <Button title="Add Card" style={{marginBottom:20}} onPress={()=>navigation.navigate('New Card',{deckTitle})}/>
                </View>
                <View>
                    <Button title="Start Quiz" onPress={()=>alert()}/>
                </View>
            </View>
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))(Deck)
