import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  required?: boolean;
  message?: string;
  messageType?: 'error' | 'info';
};

export default function InputText({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  required = false,
  message,
  messageType = 'info',
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View>
      {label && (
        <View className="mb-1 flex-row items-center">
          <Text className="font-sfMedium text-[15px] text-neutral-800">{label}</Text>
          {required && <Text className="ml-1 text-red-500">*</Text>}
        </View>
      )}

      {/* Input container */}
      <View className="flex-row items-center rounded-[14px] bg-[#F7F7F9] px-4 py-3">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#A0A0A0"
          cursorColor="#24BAEC"
          selectionColor="#24BAEC"
          className="flex-1 font-sfMedium text-[16px] text-neutral-800"
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="ml-2">
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Message */}
      <Text
        className={`ml-2 mt-1 font-sfMedium text-sm ${
          messageType === 'error' ? 'text-error-600' : 'text-neutral-500'
        }`}>
        {message}
      </Text>
    </View>
  );
}
