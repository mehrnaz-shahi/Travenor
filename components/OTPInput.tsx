import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OTPInputProps {
  length?: number; // OTP length
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  containerStyle?: object;
  inputStyle?: object;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onChange,
  onComplete,
  autoFocus = true,
  containerStyle,
  inputStyle,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = text.charAt(text.length - 1) || '';
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    // move focus to next input safely
    if (text.length && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== '')) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[containerStyle]} className='flex-row gap-x-4 justify-center'>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref: TextInput | null) => {
            inputs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          inputMode='numeric'
          maxLength={1}
          style={[styles.input, inputStyle]}
          className='rounded-lg font-sfRegular bg-neutral-100 text-xl'
          autoFocus={autoFocus && index === 0}
          selectionColor="#6BD1F6"
          cursorColor={'#6BD1F6'}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 56,
    height: 50,
  },
});

export default OTPInput;
