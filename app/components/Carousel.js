import React from 'react';
import { View, Text } from 'react-native';
import {Image} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

export default function CarouselImages(props)  {
    const { images, height, width } = props;

    const renderImage = ({item}) => {
        return <Image style={{ width, height }} source={{ uri: item}} />
    };

    return(
        <Carousel
            layout={'default'}
            data={images}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderImage}
        />
    )
};
