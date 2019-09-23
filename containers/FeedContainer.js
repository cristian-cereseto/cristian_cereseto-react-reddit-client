import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import {Button} from 'react-native-paper';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import {bindActionCreators} from 'redux';
import Feed from '../components/Feed';

class FeedContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getEntries();
        this.onFeedItemPressed = this.onFeedItemPressed.bind(this);
        this.fetchNextEntries = this.fetchNextEntries.bind(this);
        this.dismissAll = this.dismissAll.bind(this);
    }

    render() {
        return (
            <View style={(this.props.loading) ? [styles.container, styles.containerLoading] : styles.container}>
                <Button icon={'delete'} styles={styles.deleteButton} onPress={this.dismissAll}>DISMISS ALL</Button>
                {this.renderContent()}
            </View>
        );
    }

    renderContent() {
        return (this.props.loading) ?
            <ActivityIndicator size='large' color='#00f' /> :
            <Feed entries={this.props.entries} onItemPress={this.onFeedItemPressed} handleEndReached={this.fetchNextEntries}/>;
    }

    onFeedItemPressed(entry) {
        this.props.navigation.navigate('EntryDetails', { entry });
    }

    fetchNextEntries() {
        const entries = this.props.entries;
        if (entries.length === 25) {
            const lastPostId = `t3_${entries[entries.length - 1].id}`;
            this.props.getNextEntries(lastPostId);
        }
    }

    dismissAll() {
        this.props.dismissAllEntries();
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = (state) => {
    return {
        loading: state.loadingEntries,
        entries: state.entries
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        position: 'relative'
    },
    containerLoading: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteButton: {
        position: 'absolute',
        top: 15,
        right: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
