import React from 'react';
import { Text, GestureResponderEvent, Pressable, StyleProp, ViewStyle, PressableStateCallbackType, TextStyle } from 'react-native';
import type { ReactNode } from 'react';

type Variant = 'contained' | 'outlined';
type Color = 'red' | 'blue' | 'white' | 'orange';
type State = 'disabled' | 'normal';

interface ButtonProps {
  variant?: Variant;
  color?: Color;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  children: ReactNode;
  Icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  buttonStyles?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  textStyle?: StyleProp<TextStyle>;
}

// Base button style
const baseContainer = 'py-3 px-3 rounded-2xl transition-all flex flex-row items-center justify-center gap-3';
const baseText = 'font-sfMedium text-xl';

const generateContainerClasses = (variant: Variant, color: Color, disabled: boolean): string => {
  const state: State = disabled ? 'disabled' : 'normal';

  const map: Record<State, Record<Variant, Record<Color, string>>> = {
    normal: {
      contained: {
        red: 'bg-error-100 border border-error-300',
        blue: 'bg-primary-500 border border-primary-500',
        white: 'bg-white border border-white',
        orange: 'bg-secondary-500 border border-secondary-600',
      },
      outlined: {
        red: 'bg-white border border-error-300',
        blue: 'bg-white border border-primary-500',
        white: 'bg-transparent border border-white',
        orange: 'bg-transparent border border-secondary-500',
      },
    },
    disabled: {
      contained: {
        red: 'bg-error-300 border border-error-300',
        blue: 'bg-primary-300 border border-primary-300',
        white: 'bg-white border border-white',
        orange: 'bg-primary-300 border border-primary-300',
      },
      outlined: {
        red: 'bg-white border border-error-300',
        blue: 'bg-white border border-primary-300',
        white: 'bg-white border border-white',
        orange: 'bg-white border border-secondary-200',
      },
    },
  };

  return `${baseContainer} ${map[state][variant][color]} ${disabled ? 'opacity-50' : ''}`;
};

const generateTextClasses = (variant: Variant, color: Color, disabled: boolean): string => {
  const state: State = disabled ? 'disabled' : 'normal';

  const textMap: Record<State, Record<Variant, Record<Color, string>>> = {
    normal: {
      contained: {
        red: 'text-error-600',
        blue: 'text-white',
        white: 'text-primary-500',
        orange: 'text-white',
      },
      outlined: {
        red: 'text-error-600',
        blue: 'text-primary-500',
        white: 'text-white',
        orange: 'text-secondary-600',
      },
    },
    disabled: {
      contained: {
        red: 'text-white',
        blue: 'text-white',
        white: 'text-primary-300',
        orange: 'text-white',
      },
      outlined: {
        red: 'text-error-300',
        blue: 'text-primary-300',
        white: 'text-white',
        orange: 'text-secondary-200',
      },
    },
  };

  return `${baseText} ${textMap[state][variant][color]}`;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'blue',
  disabled = false,
  className = '',
  textClassName = '',
  children,
  Icon,
  onPress,
  buttonStyles,
  textStyle,
}) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} className={`${generateContainerClasses(variant, color, disabled)} ${className}`} style={buttonStyles}>
      {Icon}
      {typeof children === 'string' ? (
        <Text className={`${generateTextClasses(variant, color, disabled)} ${textClassName}`} style={textStyle}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
