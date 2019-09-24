import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';
import moment from 'moment';

export default class Entry extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    render() {
        return(
            <TouchableHighlight onPress={this.handlePress}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.title} - {this.props.isRead.toString()}</Text>
                        {this.renderIsReadStatus()}
                    </View>
                    {this.renderImage()}
                    <View styles={styles.infoContainer}>
                        <Paragraph style={[styles.title, styles.text]}>{this.props.author} - {moment(this.props.created_utc).fromNow()}</Paragraph>
                        <Paragraph style={[styles.title, styles.text]}>{this.props.num_comments} comments</Paragraph>
                    </View>
                    <View styles={styles.actionsContainer}>
                        <Button icon="delete" color="#FCF7FF" onPress={this.handleDeleteButtonClick}>Dismiss Post</Button>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    renderIsReadStatus() {
        console.log('renderIsReadStatus', this.props.title, this.props.isRead);
        return (this.props.isRead) ? null : <Avatar.Icon color="#FCF7FF" size={24} icon="announcement" />;
    }

    renderImage() {
        return (this.props.thumbnail && this.props.thumbnail.length) ?
            <Image style={{height: 150}} source={{uri: this.props.thumbnail}} /> :
            null;
    }

    handlePress() {
        if (this.props.handleEntryPress) {
            this.props.handleEntryPress(this.props)
        }
    }

    handleDeleteButtonClick() {
        if (this.props.onDelete) {
            this.props.onDelete();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A4969B',
        borderBottomColor: '#878C8F',
        borderBottomWidth: 1,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    infoContainer: {
        color: '#FCF7FF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: '#FCF7FF',
        display: 'flex'
    },
    titleContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#FCF7FF',
        fontSize: 18
    }
});
