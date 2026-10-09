import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Banner {
  id: string;
  image: ImageSourcePropType;           // Changed: can be require() or remote uri string
  title?: string;
  subtitle?: string;
}

interface BannerSliderProps {
  banners: Banner[];
  onBannerPress?: (banner: Banner) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const BannerSlider: React.FC<BannerSliderProps> = ({
  banners,
  onBannerPress,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const timerRef = useRef<number | null>(null);

  // Infinite scroll setup
  const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];

  const scrollToIndex = (index: number, animated = true) => {
    flatListRef.current?.scrollToIndex({ index, animated });
  };

  // Auto Play
  useEffect(() => {
    if (!autoPlay || banners.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, banners.length]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / SCREEN_HEIGHT);
    setCurrentIndex(index);

    if (index === 0) {
      setTimeout(() => scrollToIndex(banners.length, false), 50);
    } else if (index === extendedBanners.length - 1) {
      setTimeout(() => scrollToIndex(1, false), 50);
    }
  };

  const renderItem = ({ item }: { item: Banner }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onBannerPress?.(item)}
      style={{ height: SCREEN_HEIGHT }}
      className="w-full"
    >
      <View className="relative flex-1 bg-black">
        <Image
          source={item.image}           // ← Fixed
          className="h-full w-full"
        />

        {/* Overlay */}
        <View className="absolute bottom-12 left-6 right-6 bg-black/40 p-5 rounded-2xl">
          {item.title && (
            <Text className="text-white text-3xl font-bold mb-2">{item.title}</Text>
          )}
          {item.subtitle && (
            <Text className="text-white/90 text-lg">{item.subtitle}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black">
      <FlatList
        ref={flatListRef}
        data={extendedBanners}
        renderItem={renderItem}
        keyExtractor={(_, index) => `banner-${index}`}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
      />

      {/* Dots */}
      <View className="absolute bottom-8 left-0 right-0 flex-row justify-center gap-2 z-10">
        {banners.map((_, idx) => (
          <View
            key={idx}
            className={`h-2 rounded-full transition-all ${
              (currentIndex - 1) % banners.length === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerSlider;