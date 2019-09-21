import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import {bindActionCreators} from 'redux';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.props.setLoadingEntries(true);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Reddit Client</Text>
                <TouchableHighlight onPress={() => this.toggleLoadingState(true)}>
                    <Text>Enable Loading State</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.toggleLoadingState(false)}>
                    <Text>Disable Loading State</Text>
                </TouchableHighlight>
                <Text>Loading: {this.props.loading}</Text>
                {this.renderSpinner()}
            </View>
        );
    }

    renderSpinner() {
        return (this.props.loading) ? <ActivityIndicator size='small' color='#00f' /> : null;
    }

    toggleLoadingState(loadingState) {
        this.props.setLoadingEntries(loadingState);
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = (state) => {
    return {
        loading: state.loadingEntries
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
