import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockChats } from '../data/mockChats';
import { useRef, useState, useEffect } from 'react';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const chat = mockChats.find((c) => c.id === id);

  useEffect(() => {
    if (chat) navigation.setOptions({ title: chat.name });
  }, [chat, navigation]);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  if (!chat) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-neutral-500">Chat not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <ScrollView
        ref={scrollRef}
        className="flex-1 bg-neutral-50"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-4 py-4">
          <View className="mb-4 self-start rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
            <Text className="font-interRegular text-neutral-800">
              Hey! Are you still up for the trip this weekend?
            </Text>
            <Text className="mt-1 font-interRegular text-xs text-neutral-400">10:32 AM</Text>
          </View>
          <View className="mb-4 self-end rounded-2xl rounded-tr-sm bg-primary-300 px-4 py-3 shadow-sm">
            <Text className="font-interRegular">Yes, can’t wait!</Text>
            <Text className="mt-1 font-interRegular text-xs text-neutral-500">10:35 AM</Text>
          </View>
          <View className="mb-4 self-start rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
            <Text className="font-interRegular text-neutral-800">
              I’ll send you the details tomorrow.
            </Text>
            <Text className="mt-1 font-interRegular text-xs text-neutral-400">10:36 AM</Text>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row items-end gap-2 border-t border-neutral-200 bg-white px-4 py-3">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
          placeholderTextColor="#A3A3A3"
          className="min-h-[44px] flex-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 font-interRegular text-base text-neutral-800"
          multiline
          maxLength={500}
        />
        <Pressable
          className="h-11 w-11 items-center justify-center rounded-full bg-primary-300"
          onPress={() => setMessage('')}>
          <Ionicons name="send" size={20} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
