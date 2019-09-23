import React, { Component } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import moment from 'moment';

export default class EntryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
    }

    render() {
        const { navigation } = this.props;
        const entry = navigation.getParam('entry');

        return(
            <View>
                <Button
                    title='Go back'
                    onPress={() => this.props.navigation.goBack()}
                />
                <View styles={styles.container}>
                    <Title>{entry.title} DETAILS {entry.isRead}</Title>
                    <Paragraph>{entry.author} - {moment(entry.created_utc).fromNow()}</Paragraph>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View style={{marginTop: 22}}>
                            <View style={styles.modalContent}>
                                <Image source={{uri:  entry.thumbnail}} style={{width: 400, height: 400}} />
                                <TouchableHighlight
                                    onPress={this.toggleModalVisibility.bind(false)}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
                {this.renderImage(entry.thumbnail)}
                <View styles={styles.actionsContainer}>
                    <Text>{entry.num_comments} comments</Text>
                </View>
            </View>
        )
    }

    renderImage(thumbnail) {
        return (thumbnail) ?
            (
                <TouchableHighlight onPress={this.toggleModalVisibility.bind(this, true)}>
                    <Image source={{uri: thumbnail}} style={{width: 200, height: 200}} />
                </TouchableHighlight>
            ) :
            null;
    }

    toggleModalVisibility(visible) {
        this.setState({modalVisible: visible});
        console.log('toggleModalVisibility?', this.state.modalVisible);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionsContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    },
    modalContent: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }
});
