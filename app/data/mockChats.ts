export type AvatarKey = 'avatar1' | 'avatar2' | 'avatar3';

export interface MockChat {
  id: string;
  name: string;
  avatar: AvatarKey;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  seen: boolean;
}

export const mockChats: MockChat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'avatar1',
    online: true,
    lastMessage: 'Sounds good! See you at the airport',
    lastTime: '2m',
    seen: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'avatar2',
    online: true,
    lastMessage: 'The tour starts at 9am tomorrow',
    lastTime: '15m',
    seen: true,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'avatar3',
    online: false,
    lastMessage: 'Thanks for the recommendations!',
    lastTime: '1h',
    seen: false,
  },
  {
    id: '4',
    name: 'James Rivera',
    avatar: 'avatar1',
    online: true,
    lastMessage: 'Are we still on for the hike?',
    lastTime: '3h',
    seen: true,
  },
  {
    id: '5',
    name: 'Olivia Brown',
    avatar: 'avatar2',
    online: false,
    lastMessage: 'I sent you the booking confirmation',
    lastTime: 'Yesterday',
    seen: true,
  },
];
