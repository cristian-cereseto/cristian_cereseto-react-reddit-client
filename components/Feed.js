import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Entry from './Entry';

class Feed extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View styles={styles.container}>
                <ScrollView>
                    {this.props.entries.map((entry, index) => (<Entry {...entry} key={index} />))}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
});

export default Feed
