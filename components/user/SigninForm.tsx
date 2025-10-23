import Button from 'components/Button';
import InputText from 'components/InputText';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function SigninForm({
  pageType,
  onClick,
}: {
  pageType: 'signin' | 'signup' | 'forget';
  onClick?: (data: { userName: string; email: string; pass: string }) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; userName?: string }>(
    {}
  );
  const hasError = Object.keys(errors).length > 0;

  // Email validation regex
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password strength regex
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  // Real-time validation
  useEffect(() => {
    const newErrors: typeof errors = {};

    if (pageType === 'signup') {
      if (userName && userName.length < 3)
        newErrors.userName = 'Username must be at least 3 characters';
      if (email && !validateEmail(email)) newErrors.email = 'Invalid email address';
      if (password && !validatePassword(password))
        newErrors.password =
          'Password must be at least 8 chars with uppercase, lowercase, and number';
    }

    if (pageType === 'signin') {
      if (email && !validateEmail(email)) newErrors.email = 'Invalid email address';
      if (password && password.length === 0) newErrors.password = 'Password is required';
    }

    if (pageType === 'forget') {
      if (email && !validateEmail(email)) newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
  }, [email, password, userName, pageType]);

  const handleSubmit = () => {
    // Final validation on submit
    if (!hasError) {
      onClick?.({ userName, email, pass: password });
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-10">
      <Text className="mx-auto font-sfBold text-3xl text-neutral-800">
        {pageType === 'forget'
          ? 'Forgot password'
          : pageType === 'signin'
            ? 'Sign in now'
            : 'Sign up now'}
      </Text>
      <Text className="mx-auto mb-10 mt-3 font-sfMedium text-lg text-neutral-400">
        {pageType === 'signin'
          ? 'Please sign in to continue our app'
          : pageType === 'signup'
            ? 'Please fill the details and create account'
            : 'Enter your email account to reset your password'}
      </Text>
      <View className="gap-4">
        {pageType === 'signup' && (
          <InputText
            value={userName}
            onChangeText={setUserName}
            placeholder="username"
            message={errors.userName}
            messageType="error"
          />
        )}
        <InputText
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          keyboardType="email-address"
          message={errors.email}
          messageType="error"
        />
        {pageType !== 'forget' && (
          <InputText
            value={password}
            onChangeText={setPassword}
            placeholder="pass"
            secureTextEntry
            message={errors.password}
            messageType="error"
          />
        )}
      </View>

      {pageType === 'signin' && (
        <Pressable onPress={() => router.navigate('/login/forgetPassword')} className="mt-4">
          <Text className="ml-auto font-sfMedium text-secondary-500">Forget Password?</Text>
        </Pressable>
      )}

      <Button className="mt-10" onPress={handleSubmit} disabled={hasError}>
        {pageType === 'signin' ? 'Sign in' : pageType === 'signup' ? 'Sign up' : 'Reset Password'}
      </Button>

      {pageType !== 'forget' && (
        <Pressable
          onPress={() =>
            router.navigate(pageType === 'signin' ? '/login/signUp' : '/login/signin')
          }>
          <Text className="mx-auto mb-10 mt-10 font-sfMedium text-neutral-400">
            {pageType === 'signin' ? 'Don’t have an account?' : 'Already have an account?'}
            <Text className="font-sfMedium text-secondary-500">
              {pageType === 'signin' ? '  Sign Up' : '  Sign in'}
            </Text>
          </Text>
        </Pressable>
      )}
    </View>
  );
}
