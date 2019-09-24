import React, { Component } from 'react';
import {FlatList, StyleSheet, TouchableHighlight, View} from 'react-native';
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
            maxReached: false,
            entries: props.entries
        };
        this.handleEndReached = this.handleEndReached.bind(this);
        this.goToEntryDetails = this.goToEntryDetails.bind(this);
        this.dismissEntry = this.dismissEntry.bind(this);
    }

    render() {
        return (
            <View styles={styles.container}>
                <FlatList
                    data={this.state.entries}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableHighlight>
                                <Entry {...this.getEntryProps(item, index)}/>
                            </TouchableHighlight>
                        );
                    }}
                    onEndReached={this.handleEndReached}
                />
            </View>
        )
    }

    handleEndReached() {
        if (this.state.entries.length === 25) {
            this.setState(state => ({maxReached: true}));
            this.props.handleEndReached();
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

    goToEntryDetails(entry) {
        if (this.props.onItemPress) {
            this.props.onItemPress(entry);
        }
    }

    getEntryProps(entry, index) {
        return {
            ...entry,
            onDelete: this.dismissEntry.bind(this, index),
            handleEntryPress: this.goToEntryDetails.bind(this, entry)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    }
});

export default Feed
