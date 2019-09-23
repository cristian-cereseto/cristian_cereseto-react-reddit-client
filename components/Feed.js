import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Entry from './Entry';

class Feed extends Component {
    static getDerivedStateFromProps(props, state) {
        return {
            currentPage: state.currentPage,
            entries: props.entries
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            entries: props.entries
        };
        this.handleEndReached = this.handleEndReached.bind(this);
        this.dismissEntry = this.dismissEntry.bind(this);
    }

    render() {
        return (
            <SafeAreaView styles={styles.container}>
                <FlatList
                    data={this.getEntries()}
                    renderItem={({item, index}) => <Entry {...item} onDelete={this.dismissEntry.bind(this, index)}/>}
                    keyExtractor={(item) => item.id}
                    onEndReached={this.handleEndReached}
                />
            </SafeAreaView>
        )
    }

    handleEndReached() {
        if (this.state.currentPage < 5) {
            this.setState(state => ({currentPage: state.currentPage + 1}));
        }
    }

    dismissEntry(entryIndex) {
        this.setState(state => {
            const entries = state.entries;
            const newEntries = entries.splice(entryIndex, 1);
            return ({
                ...state,
                entries: newEntries
            });
        });
    }

    getEntries() {
        return this.state.entries.slice(0, 5 + this.state.currentPage * 5);
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
