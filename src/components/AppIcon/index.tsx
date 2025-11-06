import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { padding } from '../../config/styles/spacing';

// ...existing code...
type IconProps = {
  el:
    | 'MaterialIcons'
    | 'Ionicons'
    | 'Feather'
    | 'Fontisto'
    | 'FontAwesome'
    | 'Entypo'
    | 'MaterialCommunityIcons'
    | 'AntDesign'
    | 'Foundation'
    | 'SimpleLineIcons';
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'scan';
  color?:
    | 'black'
    | 'white'
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'red'
    | 'blue'
    | 'brown'
    | 'transparent'
    | string;
  hideIcon?: boolean;
  isPaddingIcon?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const Icons: React.FC<IconProps> = ({
  el,
  name,
  size = 'md',
  color = 'black',
  hideIcon = false,
  isPaddingIcon = true,
  onPress,
  containerStyle,
}) => {
  const sizeIcon = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 40,
    scan: 150,
  };

  let IconComponent;

  switch (el) {
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'Ionicons':
      IconComponent = Ionicons;
      break;
    case 'Feather':
      IconComponent = Feather;
      break;
    case 'Fontisto':
      IconComponent = Fontisto;
      break;
    case 'FontAwesome':
      IconComponent = FontAwesome;
      break;
    case 'Entypo':
      IconComponent = Entypo;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
    case 'Foundation':
      IconComponent = Foundation;
      break;
    case 'SimpleLineIcons':
      IconComponent = SimpleLineIcons;
      break;
    default:
      break;
  }

  if (IconComponent) {
    return hideIcon ? null : !isPaddingIcon ? (
      <View style={[containerStyle, { padding: 0 }]}>
        <IconComponent name={name as any} size={sizeIcon[size]} color={color} />
      </View>
    ) : (
      <Pressable
        style={[containerStyle, { padding: padding.sm, zIndex: 9999 }]}
        onPress={onPress}
      >
        <IconComponent name={name as any} size={sizeIcon[size]} color={color} />
      </Pressable>
    );
  }

  return null;
};

export default Icons;
