import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';
import { mockChats } from '../data/mockChats';
import ChatRow from 'components/ChatRow';

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatRow
            chat={item}
            onPress={() => router.push({ pathname: '/messages/chat', params: { id: item.id } })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
