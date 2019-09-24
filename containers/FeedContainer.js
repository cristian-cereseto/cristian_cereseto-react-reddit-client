import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import {Button} from 'react-native-paper';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import {bindActionCreators} from 'redux';
import Feed from '../components/Feed';

class FeedContainer extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        },
    }
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
                {this.renderContent()}
                <View styles={styles.deleteButtonWrapper}>
                    {(!this.props.loading) ?
                        <Button icon={'delete'} color="#655560" onPress={this.dismissAll}>
                            DISMISS ALL
                        </Button> :
                    null}
                </View>
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
        flex: 1,
        marginTop: 20,
    },
    containerLoading: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentWrapper: {
        flex: 1
    },
    deleteButtonWrapper: {
        flex: 0,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
