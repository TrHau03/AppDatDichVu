import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icons from '../AppIcon';
import { styles } from './styles';

interface StarRangeProps {
  value?: number;
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
  inactiveColor?: string;
  disabled?: boolean;
  allowHalf?: boolean;
}

const StarRange: React.FC<StarRangeProps> = ({
  value = 0,
  onChange,
  size = 32,
  color = '#FFD700',
  inactiveColor = '#D3D3D3',
  disabled = false,
  allowHalf = true,
}) => {
  const [rating, setRating] = useState(value);

  const handlePress = (index: number, isHalf: boolean) => {
    if (disabled) return;

    const selectedRating = isHalf && allowHalf ? index - 0.5 : index;
    setRating(selectedRating);
    onChange?.(selectedRating);
  };

  const getStarIcon = (index: number): string => {
    if (index <= rating) {
      return 'star';
    } else if (allowHalf && index - 0.5 === rating) {
      return 'star-half-outline';
    } else {
      return 'star-outline';
    }
  };

  const renderStar = (index: number) => {
    const iconName = getStarIcon(index);
    const isFilled = index <= rating || (allowHalf && index - 0.5 === rating);

    return (
      <View key={index} style={styles.starContainer}>
        {allowHalf && (
          <TouchableOpacity
            onPress={() => handlePress(index, true)}
            disabled={disabled}
            activeOpacity={0.7}
            style={styles.halfButton}
          />
        )}
        <TouchableOpacity
          onPress={() => handlePress(index, false)}
          disabled={disabled}
          activeOpacity={0.7}
          style={[styles.starButton, allowHalf && styles.starButtonHalf]}
        >
          <Icons
            name={iconName}
            el="Ionicons"
            size="md"
            isPaddingIcon={false}
            color={isFilled ? color : inactiveColor}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(index => renderStar(index))}
    </View>
  );
};

export default StarRange;
