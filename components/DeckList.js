import React, {Component} from 'react'
import {View, Text, Button, ScrollView} from "react-native";
import styles from '../styles'
import {connect} from 'react-redux'
import DeckItem from "./DeckItem";

class DeckList extends Component {
    render(){

        const {decks,navigation} = this.props

        if(Object.keys(decks).length===0){
            return (
                <View style={styles.centerView}>
                    <Text style={styles.splashMessage}>
                        Create a new Deck first
                    </Text>
                    <Button title="New Deck" onPress={()=>navigation.navigate('New Deck')} />
                </View>
            )
        }

        return (
            <ScrollView style={{paddingTop:20}}>
                { Object.keys(decks)
                    .sort((a,b)=>{
                        return (b<a)?1:-1
                    })
                    .map((key) => (
                        <DeckItem key={key} deckTitle={key} />
                    ))
                }
            </ScrollView>
        )
    }
}

export default connect((state)=>({
    decks: state.decks
}))(DeckList)
