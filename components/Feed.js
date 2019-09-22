import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Entry from './Entry';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.handleEndReached = this.handleEndReached.bind(this);
    }
    render() {
        return (
            <SafeAreaView styles={styles.container}>
                <FlatList
                    data={this.props.entries}
                    renderItem={({item}) => <Entry {...item}/>}
                    keyExtractor={(item) => item.id}
                    onEndReached={this.handleEndReached}
                />
            </SafeAreaView>
        )
    }

    handleEndReached() {
        if (this.props.handleEndReached) {
            this.props.handleEndReached();
        }
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
