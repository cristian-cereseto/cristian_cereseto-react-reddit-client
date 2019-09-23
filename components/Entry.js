import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
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
            <Card onPress={this.handlePress}>
                <Card.Title title={this.props.title} right={(props) => this.renderIsReadStatus(props, this.props.isRead)} />
                <Card.Content styles={styles.container}>
                    <Paragraph>{this.props.author} - {moment(this.props.created_utc).fromNow()}</Paragraph>
                </Card.Content>
                {this.renderImage()}
                <Card.Actions styles={styles.actionsContainer}>
                    <Button icon="delete" onPress={this.handleDeleteButtonClick}>Dismiss Post</Button>
                    <Text>{this.props.num_comments} comments</Text>
                </Card.Actions>
            </Card>
        )
    }

    renderIsReadStatus(props, isRead) {
        return (!isRead) ? <Avatar.Icon size={24} icon="announcement" /> : null;
    }

    renderImage() {
        return (this.props.thumbnail) ? <Card.Cover source={{uri: this.props.thumbnail}} /> : null;
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionsContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    }
});
