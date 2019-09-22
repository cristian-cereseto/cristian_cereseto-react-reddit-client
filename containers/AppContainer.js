import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import {bindActionCreators} from 'redux';
import Feed from '../components/Feed';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getEntries();
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
            <Feed entries={this.getEntries()} />;
    }

    getEntries() {
        return this.props.entries.slice(0,5);
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
