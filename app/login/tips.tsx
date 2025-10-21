import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Dimensions, Text, Pressable, Easing, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import Button from 'components/Button';

export default function Tips() {
  const { height, width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  // step control
  const [stepNumber, setStepNumber] = useState(1);
  const steps = [
    {
      id: 1,
      image: require('@assets/tips/1.jpg'),
      title: (
        <>
          Life is short and the world is
          <Text className="text-[#FF7029]"> wide</Text>
        </>
      ),
      description:
        'At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world',
      highlightX: 220,
    },
    {
      id: 2,
      image: require('@assets/tips/2.jpg'),
      title: (
        <>
          It’s a big world out there go
          <Text className="text-[#FF7029]"> explore</Text>
        </>
      ),
      description:
        'To get the best of your adventure you just need to leave and go where you like. We are waiting for you',
      highlightX: 230,
    },
    {
      id: 3,
      image: require('@assets/tips/3.jpg'),
      title: (
        <>
          People don’t take trips, trips take
          <Text className="text-[#FF7029]"> people</Text>
        </>
      ),
      description:
        'We provide experiences that stay with you long after you’ve returned. Let your next journey begin with us.',
      highlightX: 230,
    },
  ];

  const currentStep = steps[stepNumber - 1];

  // next step logic
  const handleNext = () => {
    setStepNumber((prev) => (prev % steps.length) + 1);
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom + 20 }}>
      <Image
        source={currentStep.image}
        style={{
          width: width,
          height: height / 2,
          resizeMode: 'cover',
          borderBottomRightRadius: 28,
          borderBottomLeftRadius: 28,
        }}
      />

      {/* Content section */}
      <View className='flex-1 justify-between px-6 mt-10'>
          <Text
            className={`font-geometr text-center text-4xl text-[#1B1E28] ${
              stepNumber === 3 ? 'px-6' : 'px-10'
            }`}>
            {currentStep.title}
          </Text>

          {/* small orange SVG highlight */}
          <Svg
            width="90"
            height="11"
            viewBox="0 0 90 11"
            fill="none"
            style={{
              position: 'absolute',
              top: 78,
              left: currentStep.highlightX,
            }}>
            <Path
              d="M0.842178 10.2928C10.4052 2.39336 53.4585 -7.54222 89.5617 9.79897C69.5956 4.34441 28.7914 0.401048 0.842178 10.2928Z"
              fill="#FF7029"
            />
          </Svg>
        <Text className="font-gillRegular mt-4 px-2 text-center text-2xl">
          {currentStep.description}
        </Text>

        {/* step indicators */}
        <View className="mx-auto mt-8 flex-row items-center gap-2">
          {steps.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => setStepNumber(s.id)}
              className={`h-3 rounded-lg ${
                stepNumber === s.id ? 'w-10 bg-primary-500' : 'w-5 bg-primary-200'
              }`}
            />
          ))}
        </View>

        <Button onPress={handleNext}>{stepNumber === 1 ? 'Get Started' : 'Next'}</Button>
      </View>
    </View>
  );
}
