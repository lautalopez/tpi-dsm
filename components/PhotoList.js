import React, {Component, useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import AlbumDetail from "./AlbumDetail";

function PhotoList({route}) {
    const albumId = route.params.albumId;
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        async function getPhotos() {
            try {
                const resPhotos = await axios
                    .get(
                        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
                    );
                setPhotos(resPhotos.data.photoset.photo);
            } catch (e) {

            }
        }

        getPhotos();

        return () => {
        }
    }, []);

    const renderPhotoDetail = ({item}) => {
        return <PhotoDetail
            key={item.title}
            title={item.title}
            imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}
        />
    }

    return (
        <div>
            {photos ? (<View style={{flex: 1}}>
                    <FlatList
                        data={photos}
                        renderItem={renderPhotoDetail}
                        keyExtractor={photo => photo.id}
                    />
                </View>) :
                (<View style={{flex: 1}}>
                    <Text>Loading...</Text>
                </View>)}
        </div>
    );
}


class PhotoList1 extends Component {
    state = {photos: null};

    componentWillMount() {
        axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
            )
            .then((response) =>
                this.setState({photos: response.data.photoset.photo}),
            );
    }

    renderAlbums() {
        return this.state.photos.map((photo) => (
            <PhotoDetail
                key={photo.title}
                title={photo.title}
                imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            />
        ));
    }

    render() {
        console.log(this.state);

        if (!this.state.photos) {
            return (
                <View style={{flex: 1}}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={{flex: 1}}>
                <ScrollView>{this.renderAlbums()}</ScrollView>
            </View>
        );
    }
}

export default PhotoList;
