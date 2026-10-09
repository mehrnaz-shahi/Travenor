import { useState } from 'react';
import RangeDatePicker from 'components/RangeDatePicker';
import { View } from 'react-native';
import moment, { Moment } from 'moment';
import BannerSlider from 'app/banner/banner';
export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<{
    start: Moment | undefined;
    end: Moment | undefined;
  }>();

  return (
    <View className="flex-1 px-2 pt-2">
      {/* <RangeDatePicker
        initialStartDate={moment()}
        initialEndDate={moment().add(10, 'days')}
        // onChange={(start, end) => console.log(start, end)}
        onClose={() => {}}
        onConfirm={(start, end) => setSelectedDate({ start, end })}
      /> */}

      <View className="h-1/2 w-full">
        <BannerSlider
        autoPlay={false}
          banners={[
            {
              id: '1',
              image: require('assets/images/iran/kish-island.jpg'),
            },
            {
              id: '2',
              image: require('assets/images/iran/hamedan.jpg'),
            },
          ]}
        />
      </View>
    </View>
  );
}
