import { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { RecipeDetails } from './RecipeDetails';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { RefreshCw, ShoppingCart, Clock, Leaf, Beef } from 'lucide-react-native';
import { Recipe } from '../data/recipes';
import { View, Text, ScrollView, Image, Pressable, LayoutChangeEvent } from 'react-native';
import { cn } from '../lib/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../styles/theme';
import { useColorScheme } from 'nativewind';

export const MealPlanner = ({ onNavigateToShop }: { onNavigateToShop: () => void }) => {
    const { mealPlan, regenerateDay } = useStore();
    const [selectedRecipe, setSelectedRecipe] = useState<{ recipe: Recipe, dayIndex: number } | null>(null);
    const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const [cardLayouts, setCardLayouts] = useState<{ [key: number]: number }>({});
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;

    const handleRegenerate = (index: number) => {
        setRegeneratingIndex(index);

        setTimeout(() => {
            regenerateDay(index);
            setRegeneratingIndex(null);
            if (selectedRecipe && selectedRecipe.dayIndex === index) {
                setSelectedRecipe(null);
            }
        }, 600);
    };

    const handleCardLayout = (index: number, event: LayoutChangeEvent) => {
        setCardLayouts(prev => ({
            ...prev,
            [index]: event.nativeEvent.layout.y
        }));
    };

    const scrollToCard = (index: number) => {
        const y = cardLayouts[index];
        if (y !== undefined && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y, animated: true });
        }
    };

    return (
        // @ts-ignore
        <ScrollView ref={scrollViewRef} className="flex-1" contentContainerClassName="p-4 space-y-8 pb-24">
            {/* Week Overview Header */}
            {/* @ts-ignore */}
            <View className="bg-card border border-white/5 rounded-3xl shadow-lg p-6">
                {/* @ts-ignore */}
                <View className="flex-row items-center justify-between mb-6">
                    {/* @ts-ignore */}
                    <View className="flex-1">
                        {/* @ts-ignore */}
                        <Text className="text-2xl font-bold text-foreground mb-1">Your Weekly Meal Plan</Text>
                        {/* @ts-ignore */}
                        <Text className="text-sm text-muted-foreground">Select a day below to view or swap recipes</Text>
                    </View>
                    {/* @ts-ignore */}
                    <View className="items-end">
                        {/* @ts-ignore */}
                        <Text className="text-sm text-muted-foreground">Total Time</Text>
                        {/* @ts-ignore */}
                        <Text className="text-2xl font-bold text-primary">
                            {mealPlan.reduce((acc, day) => acc + day.recipe.time, 0)} min
                        </Text>
                    </View>
                </View>

                {/* Week Calendar */}
                {/* @ts-ignore */}
                <View className="flex-row flex-wrap justify-between gap-2">
                    {mealPlan.map((day, index) => {
                        const isToday = new Date().getDay() === index + 1;
                        return (
                            <Pressable
                                key={`calendar-${index}`}
                                onPress={() => scrollToCard(index)}
                                // @ts-ignore
                                className={cn(
                                    "p-2 rounded-2xl border-2 items-center w-[18%]",
                                    isToday
                                        ? "bg-primary/10 border-primary shadow-md shadow-primary/20"
                                        : "bg-muted/30 border-transparent active:border-primary/30"
                                )}
                            >
                                {/* Today Indicator */}
                                {isToday && (
                                    // @ts-ignore
                                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
                                )}

                                {/* Day Name */}
                                <Text
                                    // @ts-ignore
                                    className={cn(
                                        "text-center mb-2 font-bold text-xs",
                                        isToday ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    {day.day.slice(0, 3).toUpperCase()}
                                </Text>

                                {/* Recipe Indicator */}
                                {/* @ts-ignore */}
                                <View className="items-center">
                                    {/* @ts-ignore */}
                                    <View className="mb-2">
                                        {day.recipe.tags.includes('Vegetarian') ? (
                                            <Leaf size={24} color={isToday ? primaryColor : '#22c55e'} />
                                        ) : (
                                            <Beef size={24} color={isToday ? primaryColor : '#f97316'} />
                                        )}
                                    </View>
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center gap-1">
                                        <Clock size={10} color={isToday ? primaryColor : '#5C6B63'} />
                                        <Text
                                            // @ts-ignore
                                            className={cn(
                                                "text-[10px] font-medium",
                                                isToday ? 'text-primary' : 'text-muted-foreground'
                                            )}
                                        >
                                            {day.recipe.time}m
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Legend */}
                {/* @ts-ignore */}
                <View className="mt-4 flex-row items-center justify-center gap-4">
                    {/* @ts-ignore */}
                    <View className="flex-row items-center gap-2">
                        {/* @ts-ignore */}
                        <View className="w-3 h-3 bg-primary rounded-full" />
                        {/* @ts-ignore */}
                        <Text className="text-xs text-muted-foreground">Today</Text>
                    </View>
                    {/* @ts-ignore */}
                    <View className="flex-row items-center gap-2">
                        {/* @ts-ignore */}
                        <View className="w-3 h-3 bg-muted/30 border-2 border-white/5 rounded-full" />
                        {/* @ts-ignore */}
                        <Text className="text-xs text-muted-foreground">Upcoming Days</Text>
                    </View>
                </View>
            </View>

            {/* Meal Cards */}
            {/* @ts-ignore */}
            <View className="gap-6">
                {mealPlan.map((day, index) => (
                    <View
                        key={`${day.day}-${index}`}
                        onLayout={(event) => handleCardLayout(index, event)}
                    >
                        <Card
                            // @ts-ignore
                            className="overflow-hidden border-0 shadow-lg bg-card"
                        >
                            <Pressable onPress={() => setSelectedRecipe({ recipe: day.recipe, dayIndex: index })}>
                                {/* Recipe Image */}
                                {/* @ts-ignore */}
                                <View className="aspect-[4/3] w-full overflow-hidden relative bg-secondary/10">
                                    {day.recipe.image ? (
                                        <Image
                                            source={{ uri: day.recipe.image }}
                                            // @ts-ignore
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        // @ts-ignore
                                        <View className="w-full h-full items-center justify-center">
                                            {day.recipe.tags.includes('Vegetarian') ? (
                                                <Leaf size={80} color="#22c55e" />
                                            ) : (
                                                <Beef size={80} color="#f97316" />
                                            )}
                                        </View>
                                    )}
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
                                        // @ts-ignore
                                        className="absolute inset-0"
                                    />

                                    {/* Day Badge */}
                                    {/* @ts-ignore */}
                                    <View className="absolute top-4 left-4">
                                        {/* @ts-ignore */}
                                        <View className="px-4 py-2 rounded-full bg-black/40 border border-white/10 shadow-lg">
                                            {/* @ts-ignore */}
                                            <Text className="text-xs font-bold text-white uppercase tracking-wider">
                                                {day.day}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Title Overlay */}
                                    {/* @ts-ignore */}
                                    <View className="absolute bottom-0 left-0 right-0 p-4">
                                        {/* @ts-ignore */}
                                        <Text className="font-bold text-lg text-white mb-1" numberOfLines={2}>
                                            {day.recipe.title}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>

                            <CardContent className="p-4 space-y-4">
                                {/* Tags */}
                                {/* @ts-ignore */}
                                <View className="flex-row flex-wrap gap-2">
                                    {day.recipe.tags.slice(0, 2).map(tag => (
                                        <View
                                            key={tag}
                                            // @ts-ignore
                                            className="px-2.5 py-1 bg-secondary/10 border border-secondary/20 rounded-full"
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-secondary text-xs font-medium">
                                                {tag}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Swap Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`w-full rounded-full border-white/10 ${regeneratingIndex === index ? 'opacity-50' : ''}`}
                                    onPress={() => handleRegenerate(index)}
                                    disabled={regeneratingIndex === index}
                                >
                                    {/* @ts-ignore */}
                                    <RefreshCw size={16} color={isDark ? '#FFFFFF' : '#000000'} className="mr-2" />
                                    {/* @ts-ignore */}
                                    <Text className={isDark ? 'text-white' : 'text-black'}>Swap Recipe</Text>
                                </Button>
                            </CardContent>
                        </Card>
                    </View>
                ))}
            </View>

            {/* Shopping List CTA */}
            {/* @ts-ignore */}
            <View className="bg-card border border-white/5 rounded-3xl p-8 shadow-lg">
                {/* @ts-ignore */}
                <View className="items-center gap-6">
                    {/* @ts-ignore */}
                    <View className="items-center">
                        {/* @ts-ignore */}
                        <Text className="text-2xl font-bold text-foreground mb-2">Ready to Shop?</Text>
                        {/* @ts-ignore */}
                        <Text className="text-muted-foreground text-center">Get your organized shopping list for the week</Text>
                    </View>
                    <Button
                        size="lg"
                        onPress={onNavigateToShop}
                        className="w-full rounded-full h-14 px-8 bg-primary shadow-lg shadow-primary/25"
                    >
                        {/* @ts-ignore */}
                        <ShoppingCart size={20} color="#FFFFFF" className="mr-2" />
                        {/* @ts-ignore */}
                        <Text className="text-primary-foreground text-base font-semibold ml-2">View Shopping List</Text>
                    </Button>
                </View>
            </View>

            {/* Recipe Details Modal */}
            {selectedRecipe && (
                <RecipeDetails
                    recipe={selectedRecipe.recipe}
                    onClose={() => setSelectedRecipe(null)}
                    onRegenerate={() => {
                        handleRegenerate(selectedRecipe.dayIndex);
                        setSelectedRecipe(null);
                    }}
                />
            )}
        </ScrollView>
    );
};
