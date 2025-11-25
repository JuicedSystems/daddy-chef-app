import { Settings, Users, Salad, Calendar, ShoppingCart, BookOpen, RefreshCw, MessageSquare } from 'lucide-react-native';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../lib/utils';
import { View, Text, Pressable, Linking } from 'react-native';
import { COLORS } from '../styles/theme';
import { useColorScheme } from 'nativewind';

interface HeaderProps {
    activeTab: 'plan' | 'shop' | 'recipes';
    setActiveTab: (tab: 'plan' | 'shop' | 'recipes') => void;
    preferences: {
        totalPeople: number;
        dietary: string[];
        kidsCount: number;
    };
    onOpenSettings: () => void;
    onGenerateWeek: () => void;
}

export function Header({
    activeTab,
    setActiveTab,
    preferences,
    onOpenSettings,
    onGenerateWeek
}: HeaderProps) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const iconColor = isDark ? COLORS.dark.foreground : COLORS.light.foreground;
    const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;

    const navItems = [
        { id: 'plan', label: 'Meal Plan', icon: Calendar },
        { id: 'shop', label: 'Shopping List', icon: ShoppingCart },
        { id: 'recipes', label: 'All Recipes', icon: BookOpen },
    ] as const;

    return (
        // @ts-ignore
        <View className="w-full border-b border-border/40 bg-background/80">
            {/* @ts-ignore */}
            <View className="flex-row items-center justify-between px-4 h-16">
                {/* Left Section: Logo & Desktop Nav */}
                {/* @ts-ignore */}
                <View className="flex-row items-center gap-8">
                    <Logo />

                    {/* Desktop Navigation */}
                    {/* @ts-ignore */}
                    <View className="hidden md:flex flex-row items-center gap-1 bg-secondary/10 p-1 rounded-full border border-white/5">
                        {navItems.map((item) => (
                            <Pressable
                                key={item.id}
                                onPress={() => setActiveTab(item.id)}
                                // @ts-ignore
                                className={cn(
                                    "flex-row items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200",
                                    activeTab === item.id
                                        ? "bg-background shadow-sm"
                                        : "bg-transparent"
                                )}
                            >
                                <item.icon
                                    size={16}
                                    color={activeTab === item.id ? iconColor : '#5C6B63'}
                                />
                                <Text
                                    // @ts-ignore
                                    className={cn(
                                        "text-sm font-medium",
                                        activeTab === item.id ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {item.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Right Section: Actions */}
                {/* @ts-ignore */}
                <View className="flex-row items-center gap-3">
                    {/* User Count Badge (Desktop) */}
                    <Pressable
                        onPress={onOpenSettings}
                        // @ts-ignore
                        className="hidden lg:flex flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-transparent"
                    >
                        {/* @ts-ignore */}
                        <View className="flex-row items-center gap-1.5">
                            <Users size={16} color={primaryColor} />
                            {/* @ts-ignore */}
                            <Text className="text-sm font-semibold text-foreground">{preferences.totalPeople}</Text>
                        </View>
                        {preferences.dietary.length > 0 && (
                            // @ts-ignore
                            <View className="flex-row items-center gap-1.5">
                                {/* @ts-ignore */}
                                <View className="w-px h-3 bg-border" />
                                <Salad size={14} color="#5C6B63" />
                            </View>
                        )}
                    </Pressable>

                    {/* @ts-ignore */}
                    <View className="h-6 w-px bg-border/50 hidden sm:flex" />

                    <ThemeToggle />

                    <Pressable
                        onPress={() => Linking.openURL('mailto:dielawn@gmail.com?subject=Daddy App Feedback')}
                        // @ts-ignore
                        className="p-2 rounded-full bg-transparent active:bg-secondary/10"
                        accessibilityLabel="Send Feedback"
                    >
                        <MessageSquare size={20} color={iconColor} />
                    </Pressable>

                    <Pressable
                        onPress={onOpenSettings}
                        // @ts-ignore
                        className="p-2 rounded-full bg-transparent active:bg-secondary/10"
                        accessibilityLabel="Settings"
                    >
                        <Settings size={20} color={iconColor} />
                    </Pressable>

                    <Pressable
                        onPress={onGenerateWeek}
                        // @ts-ignore
                        className="hidden sm:flex flex-row items-center gap-2 px-4 py-2 rounded-full bg-primary shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <RefreshCw size={16} color="#FFFFFF" />
                        {/* @ts-ignore */}
                        <Text className="hidden lg:flex text-primary-foreground text-sm font-semibold">Regenerate</Text>
                    </Pressable>
                </View>
            </View>

            {/* Mobile Navigation Bar */}
            {/* @ts-ignore */}
            <View className="md:hidden border-t border-border/40 bg-background/95 px-4 py-2">
                {/* @ts-ignore */}
                <View className="flex-row justify-between items-center max-w-sm mx-auto">
                    {navItems.map((item) => (
                        <Pressable
                            key={item.id}
                            onPress={() => setActiveTab(item.id)}
                            // @ts-ignore
                            className={cn(
                                "flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[4rem]",
                                activeTab === item.id
                                    ? "bg-primary/10"
                                    : "bg-transparent"
                            )}
                        >
                            <item.icon
                                size={20}
                                color={activeTab === item.id ? primaryColor : '#5C6B63'}
                                fill={activeTab === item.id ? 'currentColor' : 'none'}
                            />
                            <Text
                                // @ts-ignore
                                className={cn(
                                    "text-[10px] font-medium",
                                    activeTab === item.id ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}
