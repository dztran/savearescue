// Minimal replacement for react-native-snap-carousel (unmaintained; it relies on
// ViewPropTypes and other APIs removed from modern React Native). It covers the
// props and imperative methods AdoptView uses: currentIndex, snapToItem,
// startAutoplay and stopAutoplay.
import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export default class Carousel extends Component {
    static defaultProps = {
        firstItem: 0,
        inactiveSlideScale: 0.9,
        inactiveSlideOpacity: 0.7,
        autoplay: false,
        autoplayDelay: 1000,
        autoplayInterval: 3000,
        onEndReachedThreshold: 0.5,
        removeClippedSubviews: false,
    };

    constructor(props) {
        super(props);
        this._list = null;
        this._autoplayTimer = null;
        this._autoplayDelayTimer = null;
        this._scrollX = new Animated.Value(0);
        this.currentIndex = this._clampIndex(props.firstItem);
    }

    componentDidMount() {
        if (this.props.autoplay) {
            this.startAutoplay();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const clamped = this._clampIndex(this.currentIndex);
            if (clamped !== this.currentIndex) {
                this.currentIndex = clamped;
            }
        }
        if (prevProps.autoplay !== this.props.autoplay) {
            this.props.autoplay ? this.startAutoplay() : this.stopAutoplay();
        }
    }

    componentWillUnmount() {
        this.stopAutoplay();
    }

    _clampIndex(index) {
        const length = (this.props.data || []).length;
        if (!length) { return 0; }
        return Math.max(0, Math.min(index || 0, length - 1));
    }

    _offsetForIndex(index) {
        return index * this.props.itemWidth;
    }

    _setIndex(index) {
        if (index !== this.currentIndex) {
            this.currentIndex = index;
            if (this.props.onBeforeSnapToItem) {
                this.props.onBeforeSnapToItem(index);
            }
            if (this.props.onSnapToItem) {
                this.props.onSnapToItem(index);
            }
        }
    }

    snapToItem = (index, animated = true) => {
        const target = this._clampIndex(index);
        if (this._list) {
            this._list.scrollToOffset({ offset: this._offsetForIndex(target), animated });
        }
        this._setIndex(target);
    };

    snapToNext = (animated = true) => {
        const length = (this.props.data || []).length;
        if (!length) { return; }
        const next = this.currentIndex + 1 >= length ? 0 : this.currentIndex + 1;
        this.snapToItem(next, animated);
    };

    startAutoplay = () => {
        this.stopAutoplay();
        this._autoplayDelayTimer = setTimeout(() => {
            this._autoplayTimer = setInterval(() => this.snapToNext(true), this.props.autoplayInterval);
        }, this.props.autoplayDelay);
    };

    stopAutoplay = () => {
        clearTimeout(this._autoplayDelayTimer);
        clearInterval(this._autoplayTimer);
        this._autoplayDelayTimer = null;
        this._autoplayTimer = null;
    };

    _onMomentumScrollEnd = (event) => {
        const x = event.nativeEvent.contentOffset.x;
        this._setIndex(this._clampIndex(Math.round(x / this.props.itemWidth)));
    };

    _onScrollBeginDrag = () => {
        // Like snap-carousel, pause autoplay while the user is swiping.
        if (this.props.autoplay) { this.stopAutoplay(); }
    };

    _onScrollEndDrag = () => {
        if (this.props.autoplay) { this.startAutoplay(); }
    };

    _renderItem = ({ item, index }) => {
        const { itemWidth, inactiveSlideScale, inactiveSlideOpacity, renderItem } = this.props;
        const inputRange = [
            (index - 1) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
        ];
        const animatedStyle = {
            width: itemWidth,
            opacity: this._scrollX.interpolate({
                inputRange,
                outputRange: [inactiveSlideOpacity, 1, inactiveSlideOpacity],
                extrapolate: 'clamp',
            }),
            transform: [{
                scale: this._scrollX.interpolate({
                    inputRange,
                    outputRange: [inactiveSlideScale, 1, inactiveSlideScale],
                    extrapolate: 'clamp',
                }),
            }],
        };
        return (
            <Animated.View style={animatedStyle}>
                {renderItem({ item, index })}
            </Animated.View>
        );
    };

    render() {
        const {
            data, sliderWidth, itemWidth, keyExtractor,
            containerCustomStyle, contentContainerCustomStyle,
            onEndReached, onEndReachedThreshold, removeClippedSubviews,
        } = this.props;
        const sidePadding = Math.max(0, (sliderWidth - itemWidth) / 2);

        return (
            <View style={{ width: sliderWidth }}>
                <Animated.FlatList
                    ref={(c) => { this._list = c; }}
                    data={data}
                    horizontal
                    keyExtractor={keyExtractor ? (item, i) => String(keyExtractor(item, i)) : undefined}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={itemWidth}
                    decelerationRate="fast"
                    disableIntervalMomentum
                    initialScrollIndex={this.currentIndex || undefined}
                    getItemLayout={(_, index) => ({ length: itemWidth, offset: index * itemWidth, index })}
                    style={containerCustomStyle}
                    contentContainerStyle={[contentContainerCustomStyle, { paddingHorizontal: sidePadding }]}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: this._scrollX } } }],
                        { useNativeDriver: true },
                    )}
                    scrollEventThrottle={16}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={onEndReachedThreshold > 1 ? 0.5 : onEndReachedThreshold}
                    removeClippedSubviews={removeClippedSubviews}
                />
            </View>
        );
    }
}
