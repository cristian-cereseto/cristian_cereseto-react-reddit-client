import React, { Component } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Button, Paragraph, Title } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
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
            <View styles={styles.container}>
                <View style={styles.content}>
                    <NavigationEvents onWillBlur={this.handleNavigationBack} />
                    <Title style={styles.text}>{entry.title} DETAILS {entry.isRead}</Title>
                    <Paragraph>{entry.author} - {moment(entry.created_utc).fromNow()}</Paragraph>
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
                    {this.renderImage(entry.thumbnail)}
                    <View styles={styles.actionsContainer}>
                        <Text>{entry.num_comments} comments</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderImage(thumbnail) {
        return (thumbnail) ?
            (
                <TouchableHighlight onPress={this.toggleModalVisibility.bind(this, true)}>
                    <Image source={{uri: thumbnail}} style={{height: 150}} />
                </TouchableHighlight>
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
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50
    },
    content: {
        backgroundColor: '#A4969B',
        borderBottomColor: '#878C8F',
        borderBottomWidth: 1,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
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
        color: '#FCF7FF',
        fontSize: 18
    }
});

export default connect(() => ({}), mapDispatchToProps)(EntryDetails);

