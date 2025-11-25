import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Share2, Check, Carrot, Beef, Milk, Croissant, Snowflake, Soup, Box, ShoppingCart } from 'lucide-react-native';
import { View, Text, ScrollView, Pressable, Share, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cn } from '../lib/utils';
import { useColorScheme } from 'nativewind';
import { COLORS } from '../styles/theme';

interface ShoppingListProps {
    onBack: () => void;
}

export const ShoppingList = ({ onBack }: ShoppingListProps) => {
    const { mealPlan, preferences, shoppingListChecked, toggleShoppingItem } = useStore();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;

    // Aggregate ingredients
    const aggregatedList: Record<string, { item: string; quantity: number; unit: string; category: string }> = {};

    mealPlan.forEach(day => {
        const scaleFactor = preferences.totalPeople / day.recipe.servings;

        day.recipe.ingredients.forEach(ing => {
            const key = `${ing.item}-${ing.unit}`;
            if (aggregatedList[key]) {
                aggregatedList[key].quantity += ing.quantity * scaleFactor;
            } else {
                aggregatedList[key] = {
                    ...ing,
                    quantity: ing.quantity * scaleFactor
                };
            }
        });
    });

    // Group by category
    const grouped: Record<string, typeof aggregatedList[string][]> = {};
    Object.values(aggregatedList).forEach(ing => {
        if (!grouped[ing.category]) grouped[ing.category] = [];
        grouped[ing.category].push(ing);
    });

    // Sort categories
    const CATEGORY_ORDER = ['Produce', 'Meat', 'Dairy', 'Bakery', 'Frozen', 'Pantry', 'Other'];
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
        return CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b);
    });

    const handleShare = async () => {
        const text = Object.entries(grouped).map(([cat, items]) => {
            return `${cat.toUpperCase()}:\n` + items.map(i => `- ${Math.ceil(i.quantity * 10) / 10} ${i.unit} ${i.item}`).join('\n');
        }).join('\n\n');

        try {
            const result = await Share.share({
                message: text,
                title: 'Daddy Dinner Shopping List',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    // Calculate progress
    const totalItems = Object.keys(aggregatedList).length;
    const checkedItems = shoppingListChecked.length;
    const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

    return (
        // @ts-ignore
        <ScrollView className="flex-1" contentContainerClassName="p-4 space-y-6 pb-24">
            {/* Header Card */}
            {/* @ts-ignore */}
            <View className="bg-card border border-white/5 rounded-3xl shadow-lg p-6">
                {/* @ts-ignore */}
                <View className="flex-row items-start justify-between mb-6">
                    {/* @ts-ignore */}
                    <View className="flex-1">
                        {/* @ts-ignore */}
                        <Text className="text-2xl font-bold text-foreground mb-1">Shopping List</Text>
                        {/* @ts-ignore */}
                        <Text className="text-muted-foreground">Everything you need for the week</Text>
                    </View>
                    <Button
                        variant="outline"
                        size="lg"
                        onPress={handleShare}
                        className="rounded-full border-white/10"
                    >
                        {/* @ts-ignore */}
                        <Share2 size={20} color={isDark ? '#FFFFFF' : '#000000'} className="mr-2" />
                        {/* @ts-ignore */}
                        <Text className={isDark ? 'text-white' : 'text-black'}>Share</Text>
                    </Button>
                </View>

                {/* Progress Bar */}
                {/* @ts-ignore */}
                <View className="space-y-2">
                    {/* @ts-ignore */}
                    <View className="flex-row items-center justify-between">
                        {/* @ts-ignore */}
                        <Text className="font-semibold text-foreground text-sm">Progress</Text>
                        {/* @ts-ignore */}
                        <Text className="text-muted-foreground text-sm">{checkedItems} of {totalItems} items</Text>
                    </View>
                    {/* @ts-ignore */}
                    <View className="h-3 bg-secondary/20 rounded-full overflow-hidden">
                        <LinearGradient
                            colors={['#facc15', primaryColor]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ width: `${progress}%`, height: '100%' }}
                        />
                    </View>
                </View>
            </View>

            {/* Shopping List by Category */}
            {/* @ts-ignore */}
            <View className="gap-6">
                {sortedCategories.map(category => (
                    // @ts-ignore
                    <View key={category} className="space-y-3">
                        {/* @ts-ignore */}
                        <View className="flex-row items-center gap-3">
                            {/* @ts-ignore */}
                            <View className="w-10 h-10 rounded-full bg-secondary/20 items-center justify-center border border-secondary/30">
                                {category === 'Produce' && <Carrot size={20} color={primaryColor} />}
                                {category === 'Meat' && <Beef size={20} color={primaryColor} />}
                                {category === 'Dairy' && <Milk size={20} color={primaryColor} />}
                                {category === 'Bakery' && <Croissant size={20} color={primaryColor} />}
                                {category === 'Frozen' && <Snowflake size={20} color={primaryColor} />}
                                {category === 'Pantry' && <Soup size={20} color={primaryColor} />}
                                {category === 'Other' && <Box size={20} color={primaryColor} />}
                            </View>
                            {/* @ts-ignore */}
                            <Text className="font-bold text-lg text-foreground">{category}</Text>
                            {/* @ts-ignore */}
                            <View className="flex-1 h-px bg-border" />
                        </View>

                        <Card
                            // @ts-ignore
                            className="border border-white/5 shadow-md overflow-hidden bg-card rounded-3xl"
                        >
                            <CardContent className="p-0">
                                {grouped[category].map((ing, i) => {
                                    const id = `${ing.item}-${ing.unit}`;
                                    const isChecked = shoppingListChecked.includes(id);

                                    return (
                                        <Pressable
                                            key={i}
                                            onPress={() => toggleShoppingItem(id)}
                                            // @ts-ignore
                                            className={cn(
                                                "flex-row items-center gap-4 p-4 border-b border-white/5 active:bg-white/5",
                                                isChecked ? "bg-primary/5" : ""
                                            )}
                                        >
                                            {/* Checkbox */}
                                            {/* @ts-ignore */}
                                            <View className={cn(
                                                "h-7 w-7 rounded-full border-2 items-center justify-center transition-all",
                                                isChecked
                                                    ? "bg-primary border-primary shadow-lg shadow-primary/25"
                                                    : "border-muted-foreground"
                                            )}>
                                                {isChecked && <Check size={16} color="#FFFFFF" />}
                                            </View>

                                            {/* Item Details */}
                                            {/* @ts-ignore */}
                                            <View className="flex-1 flex-row flex-wrap">
                                                {/* @ts-ignore */}
                                                <Text className={cn(
                                                    "text-base",
                                                    isChecked ? "text-muted-foreground line-through" : "text-foreground"
                                                )}>
                                                    {/* @ts-ignore */}
                                                    <Text className="font-bold">
                                                        {Math.ceil(ing.quantity * 10) / 10} {ing.unit}
                                                    </Text>
                                                    {' '}
                                                    {ing.item}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </View>
                ))}

                {sortedCategories.length === 0 && (
                    // @ts-ignore
                    <View className="items-center py-20">
                        {/* @ts-ignore */}
                        <View className="w-24 h-24 mb-6 rounded-full bg-primary/10 items-center justify-center">
                            <ShoppingCart size={48} color={primaryColor} />
                        </View>
                        {/* @ts-ignore */}
                        <Text className="text-xl font-bold text-foreground mb-2">No Items Yet</Text>
                        {/* @ts-ignore */}
                        <Text className="text-muted-foreground mb-6 text-center">Plan some meals to generate your shopping list</Text>
                        <Button
                            onPress={onBack}
                            size="lg"
                            className="rounded-full bg-primary shadow-lg shadow-primary/25"
                        >
                            {/* @ts-ignore */}
                            <Text className="text-primary-foreground font-semibold">Go Plan Meals</Text>
                        </Button>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};
