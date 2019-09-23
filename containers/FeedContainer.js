import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import {bindActionCreators} from 'redux';
import Feed from '../components/Feed';

class FeedContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getEntries();
        this.onFeedItemPressed = this.onFeedItemPressed.bind(this);
    }

    render() {
        return (
            <View style={(this.props.loading) ? [styles.container, styles.containerLoading] : styles.container}>
                {this.renderContent()}
            </View>
        );
    }

    renderContent() {
        return (this.props.loading) ?
            <ActivityIndicator size='large' color='#00f' /> :
            <Feed entries={this.props.entries} onItemPress={this.onFeedItemPressed} />;
    }

    onFeedItemPressed() {
        this.props.navigation.navigate('EntryDetails')
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
        marginTop: 25
    },
    containerLoading: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
