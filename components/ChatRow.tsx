import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar1 from 'assets/images/avatar1.svg';
import Avatar2 from 'assets/images/avatar2.svg';
import Avatar3 from 'assets/images/avatar3.svg';
import type { MockChat } from '../app/data/mockChats';

const AVATAR_MAP = {
  avatar1: Avatar1,
  avatar2: Avatar2,
  avatar3: Avatar3,
};

const PREVIEW_MAX = 42;

type ChatRowProps = {
  chat: MockChat;
  onPress: () => void;
};

export default function ChatRow({ chat, onPress }: ChatRowProps) {
  const AvatarComponent = AVATAR_MAP[chat.avatar];
  const preview =
    chat.lastMessage.length > PREVIEW_MAX
      ? chat.lastMessage.slice(0, PREVIEW_MAX) + '...'
      : chat.lastMessage;

  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-80 flex-row items-center gap-4 border-b border-neutral-100 px-4 py-3">
      <View className="relative">
        <View className="h-14 w-14 overflow-hidden rounded-full bg-neutral-200">
          <AvatarComponent width={56} height={56} />
        </View>
        {chat.online && (
          <View
            className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-green-500"
            style={{ width: 14, height: 14 }}
          />
        )}
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="font-interMedium text-base text-neutral-800" numberOfLines={1}>
            {chat.name}
          </Text>
          <Text className="font-interRegular text-xs text-neutral-400">{chat.lastTime}</Text>
        </View>
        <View className="mt-0.5 flex-row items-center justify-between gap-2">
          <Text className="font-interRegular text-sm text-neutral-500" numberOfLines={1}>
            {preview}
          </Text>
          {chat.seen ? (
            <Ionicons name="checkmark-done" size={18} color="#4F46E5" />
          ) : (
            <Ionicons name="checkmark-done" size={18} color="#A3A3A3" />
          )}
        </View>
      </View>
    </Pressable>
  );
}
