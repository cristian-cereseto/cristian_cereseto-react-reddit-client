import React, { Component } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Button, Paragraph, Title } from 'react-native-paper';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../redux/actions';
import { connect } from 'react-redux';

class EntryDetails extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        }
    }

    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
        this.handleNavigationBack = this.handleNavigationBack.bind(this);
    }

    render() {
        const { navigation } = this.props;
        const entry = navigation.getParam('entry');

        return(
            <TouchableHighlight onPress={this.toggleModalVisibility.bind(this, true)}>
                <View style={styles.content}>
                    <Button icon="arrow-back" color="#878C8F" onPress={this.handleNavigationBack}>
                        Go back to feed
                    </Button>
                    <Title style={styles.text}>{entry.title} DETAILS {entry.isRead}</Title>
                    <Paragraph style={styles.text}>{entry.author} - {moment(entry.created_utc).fromNow()}</Paragraph>
                    {this.renderImage(entry.thumbnail)}
                    <View styles={styles.actionsContainer}>
                        <Text style={styles.text}>{entry.num_comments} comments</Text>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View style={styles.modalContent}>
                            <Image source={{uri:  entry.thumbnail}} style={{width: 250, height: 250}} />
                            <TouchableHighlight
                                onPress={this.toggleModalVisibility.bind(false)}>
                                <Button icon="close" color="#FCF7FF" onPress={this.toggleModalVisibility.bind(this, false)}>
                                    Hide Modal
                                </Button>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>
            </TouchableHighlight>
        )
    }

    renderImage(thumbnail) {
        return (thumbnail) ?
            (
                <Image source={{uri: thumbnail}} style={{width: 250, height: 150}} />
            ) :
            null;
    }
    
    handleNavigationBack() {
        const { navigation } = this.props;
        const entry = navigation.getParam('entry');
        this.props.markEntryAsRead(entry.id);
        this.props.navigation.navigate('Feed');
    }

    toggleModalVisibility(visible) {
        this.setState({modalVisible: visible});
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch);

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 50,
    },
    actionsContainer: {
        justifyContent: 'space-between',
    },
    modalContent: {
        alignItems: 'center',
        backgroundColor: '#A4969B',
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#878C8F',
        fontSize: 18
    },
    text: {
        color: '#878C8F'
    },
});

export default connect(() => ({}), mapDispatchToProps)(EntryDetails);

