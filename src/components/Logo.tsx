import { View, Image } from 'react-native';
// @ts-ignore
import daddyCheffLogo from '../../assets/daddy-cheff-logo.png';

export function Logo() {
    return (
        // @ts-ignore
        <View className="flex-row items-center gap-2">
            {/* @ts-ignore */}
            <Image
                source={daddyCheffLogo}
                className="h-12 w-48"
                resizeMode="contain"
            />
        </View>
    );
}
