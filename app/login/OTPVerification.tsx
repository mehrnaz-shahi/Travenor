import Button from 'components/Button';
import OTPInput from 'components/OTPInput';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';

export default function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [resendEnabled, setResendEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    console.log('Resend OTP triggered');
    setTimer(60);
    setResendEnabled(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Text className="mx-auto font-sfBold text-3xl text-neutral-800">OTP Verification</Text>
      <Text className="mx-auto mb-10 mt-3 text-center font-sfMedium text-lg text-neutral-400">
        Please check your email www.uihut@gmail.com to see the verification code
      </Text>

      <Text className="mb-4 mt-10 font-sfBold text-xl text-neutral-800">OTP Code</Text>
      <OTPInput
        length={4}
        onChange={(val) => setOtp(val)}
        onComplete={(val) => console.log('OTP Complete:', val)}
      />

      <Button className="mt-10" onPress={() => router.push('/')}>
        Verify
      </Button>
      <Text className="mt-8 text-center font-sfMedium text-neutral-500">
        {resendEnabled ? "Didn't receive the code?" : `Resend code in ${timer}s`}
      </Text>

      {resendEnabled && (
        <Pressable onPress={handleResend} className="mx-auto mt-2">
          <Text className="font-sfMedium text-secondary-500">Resend Code</Text>
        </Pressable>
      )}
    </View>
  );
}
