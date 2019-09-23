import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
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
                <Card.Content styles={styles.container}>
                    <Title>{this.props.title}</Title>
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
