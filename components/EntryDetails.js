import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import moment from 'moment';

export default class EntryDetails extends Component {
    constructor(props) {
        super(props);
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
                <Card>
                    <Card.Content styles={styles.container}>
                        <Title>{entry.title} DETAILS</Title>
                        <Paragraph>{entry.author} - {moment(entry.created_utc).fromNow()}</Paragraph>
                    </Card.Content>
                    {this.renderImage(entry.thumbnail)}
                    <Card.Actions styles={styles.actionsContainer}>
                        <Text>{entry.num_comments} comments</Text>
                    </Card.Actions>
                </Card>
            </View>
        )
    }

    renderImage(thumbnail) {
        return (thumbnail) ? <Card.Cover source={{uri: thumbnail}} /> : null;
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
