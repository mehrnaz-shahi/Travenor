import SigninForm from 'components/user/SigninForm';
import { useRouter } from 'expo-router';

export default function SigninScreen() {
  const router = useRouter();
  return <SigninForm pageType={'signup'} onClick={() => router.push('/login/OTPVerification')} />;
}
