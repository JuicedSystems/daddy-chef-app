import { View, Text, ScrollView, Pressable } from 'react-native';
import { Leaf, Beef, Clock, Utensils } from 'lucide-react-native';
import { RECIPES } from '../data/recipes';
import { useColorScheme } from 'nativewind';
import { COLORS } from '../styles/theme';

export function Recipes() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;

    return (
        // @ts-ignore
        <ScrollView contentContainerClassName="p-4 pb-24 space-y-6">
            {/* @ts-ignore */}
            <View>
                {/* @ts-ignore */}
                <Text className="text-2xl font-bold text-foreground mb-2">All Recipes</Text>
                {/* @ts-ignore */}
                <Text className="text-muted-foreground">Browse our collection of quick and delicious recipes</Text>
            </View>
            {/* @ts-ignore */}
            <View className="gap-6">
                {RECIPES.map(recipe => (
                    <Pressable
                        key={recipe.id}
                        // @ts-ignore
                        className="bg-card border border-white/5 rounded-3xl shadow-lg overflow-hidden"
                    >
                        {/* @ts-ignore */}
                        <View className="h-48 bg-primary/10 items-center justify-center">
                            {recipe.tags.includes('Vegetarian') ? (
                                <Leaf size={80} color={primaryColor} opacity={0.4} />
                            ) : (
                                <Beef size={80} color={primaryColor} opacity={0.4} />
                            )}
                        </View>
                        {/* @ts-ignore */}
                        <View className="p-5 space-y-3">
                            {/* @ts-ignore */}
                            <Text className="font-bold text-lg text-foreground" numberOfLines={2}>{recipe.title}</Text>
                            {/* @ts-ignore */}
                            <View className="flex-row items-center gap-4">
                                {/* @ts-ignore */}
                                <View className="flex-row items-center gap-1">
                                    {/* @ts-ignore */}
                                    <Clock size={16} className="text-muted-foreground" />
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">{recipe.time} mins</Text>
                                </View>
                                {/* @ts-ignore */}
                                <View className="flex-row items-center gap-1">
                                    {/* @ts-ignore */}
                                    <Utensils size={16} className="text-muted-foreground" />
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">{recipe.ingredients.length} ingredients</Text>
                                </View>
                            </View>
                            {/* @ts-ignore */}
                            <View className="flex-row flex-wrap gap-2">
                                {recipe.tags.slice(0, 3).map(tag => (
                                    // @ts-ignore
                                    <View
                                        key={tag}
                                        // @ts-ignore
                                        className="px-3 py-1 bg-secondary rounded-lg"
                                    >
                                        {/* @ts-ignore */}
                                        <Text className="text-secondary-foreground text-xs font-medium">{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}
