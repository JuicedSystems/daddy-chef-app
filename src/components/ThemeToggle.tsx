import { Moon, Sun } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { COLORS } from '../styles/theme';

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Pressable
            onPress={toggleColorScheme}
            // @ts-ignore
            className={`p-2 rounded-full border border-transparent active:bg-secondary/20 active:border-primary/30 transition-all duration-300 ${className}`}
            accessibilityLabel="Toggle theme"
        >
            {isDark ? (
                <Sun size={20} color={COLORS.dark.warning} />
            ) : (
                <Moon size={20} color={COLORS.light.primary} />
            )}
        </Pressable>
    );
};
