import React, {Component} from 'react'
import {Text, TouchableOpacity} from "react-native";
import styles from "../styles";
import { useNavigation } from '@react-navigation/native';
import {connect} from 'react-redux'

class DeckItem extends Component {
    render(){

        const {decks,deckTitle,navigation} = this.props

        return (
            <TouchableOpacity style={styles.deckItem} onPress={()=>navigation.navigate('Deck',{deckTitle})}>
                <Text style={{fontSize:22}}>{deckTitle}</Text>
                <Text>{decks[deckTitle].questions.length} cards</Text>
            </TouchableOpacity>
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))((props) => {
    const navigation = useNavigation();
    return <DeckItem {...props} navigation={navigation} />;
})
