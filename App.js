import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const ScrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            index * +1 * width,
          ];
          const opacity = ScrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: item}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={10}
            />
          );
        })}
      </View>
      <View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: ScrollX}}}],
            {useNativeDriver: true},
          )}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          pagingEnabled={true}
          renderItem={({item}) => (
            <View
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  marginTop: height * 0.1,
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 10,
                  shadowOpacity: 0.5,
                  shadowOffset: {width: 0, height: 5},
                  shadowColor: '#000',
                  shadowRadius: 20,
                }}
                source={{uri: item}}
              />
            </View>
          )}></Animated.FlatList>
      </View>
    </View>
  );
};
