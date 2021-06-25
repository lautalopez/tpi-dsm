import React, {Component, useEffect, useState} from 'react';
import {ScrollView, Text, View, SafeAreaView, FlatList, StyleSheet, StatusBar} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

function AlbumList({navigation}) {
    const [photoset, setPhotoset] = useState(null);

    useEffect(() => {
        async function getAlbumList() {
            try {
                const albumResponse = await axios
                    .get(
                        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
                    )
                setPhotoset(albumResponse.data.photosets.photoset);

            } catch (e) {

            }
        }

        getAlbumList();

        return () => {

        }
    }, [])

    const renderAlbum = ({item}) => {
        return <AlbumDetail
            navigation={navigation}
            key={item.id}
            title={item.title._content}
            albumId={item.id}
        />
    }

    return (
        <div>
            {photoset ? (<View style={styles.container}>
                    <FlatList
                        data={photoset}
                        renderItem={renderAlbum}
                        keyExtractor={album => album.id}
                    />
                </View>) :
                (<View style={{flex: 1}}>
                    <Text>Loading...</Text>
                </View>)}
        </div>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

class AlbumList1 extends Component {
    state = {photoset: null};

    componentWillMount() {
        axios
            .get(
                'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
            )
            .then((response) =>
                this.setState({photoset: response.data.photosets.photoset}),
            );
    }

    renderAlbums() {
        return this.state.photoset.map((album) => (
            <AlbumDetail
                navigation={this.props.navigation}
                key={album.id}
                title={album.title._content}
                albumId={album.id}
            />
        ));
    }

    render() {
        console.log(this.state);

        if (!this.state.photoset) {
            return <Text>Loading...</Text>;
        }

        return (
            <View style={{flex: 1}}>
                <ScrollView>{this.renderAlbums()}</ScrollView>
            </View>
        );
    }
}

export default AlbumList;
