import { Recipe } from '../data/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { X, Clock, Users, RefreshCw, Star, Lightbulb } from 'lucide-react-native';
import { Modal, View, Text, ScrollView, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import { COLORS } from '../styles/theme';

interface RecipeDetailsProps {
    recipe: Recipe;
    onClose: () => void;
    onRegenerate: () => void;
}

export const RecipeDetails = ({ recipe, onClose, onRegenerate }: RecipeDetailsProps) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const iconColor = isDark ? COLORS.dark.foreground : COLORS.light.foreground;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            {/* @ts-ignore */}
            <View className="flex-1 bg-black/60 justify-center p-4">
                <Card
                    // @ts-ignore
                    className="w-full max-h-[90%] shadow-2xl border-white/10 rounded-3xl bg-card overflow-hidden"
                >
                    {/* Header */}
                    <CardHeader
                        // @ts-ignore
                        className="bg-card/95 border-b border-white/5 z-10"
                    >
                        {/* @ts-ignore */}
                        <View className="flex-row items-center justify-between">
                            {/* @ts-ignore */}
                            <View className="flex-1 pr-4">
                                <CardTitle
                                    // @ts-ignore
                                    className="text-2xl font-bold text-foreground"
                                >
                                    {recipe.title}
                                </CardTitle>
                                {/* @ts-ignore */}
                                <View className="flex-row flex-wrap items-center gap-4 mt-2">
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center gap-1.5">
                                        <Clock size={16} color={iconColor} />
                                        {/* @ts-ignore */}
                                        <Text className="text-sm text-muted-foreground">{recipe.time} mins</Text>
                                    </View>
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center gap-1.5">
                                        <Users size={16} color={iconColor} />
                                        {/* @ts-ignore */}
                                        <Text className="text-sm text-muted-foreground">{recipe.servings} servings</Text>
                                    </View>
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center gap-1.5">
                                        <Star size={16} color="#facc15" fill="#facc15" />
                                        {/* @ts-ignore */}
                                        <Text className="text-sm text-muted-foreground">{recipe.kidRating}/5 kid rating</Text>
                                    </View>
                                </View>
                            </View>
                            <Button
                                variant="ghost"
                                size="icon"
                                onPress={onClose}
                                className="rounded-full"
                            >
                                <X size={20} color={iconColor} />
                            </Button>
                        </View>
                    </CardHeader>

                    <ScrollView className="flex-1">
                        <CardContent className="p-6 space-y-6">
                            {/* Recipe Image */}
                            {recipe.image && (
                                // @ts-ignore
                                <View className="aspect-video w-full overflow-hidden rounded-2xl bg-secondary/10 relative">
                                    <Image
                                        source={{ uri: recipe.image }}
                                        // @ts-ignore
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.1)']}
                                        // @ts-ignore
                                        className="absolute inset-0"
                                    />
                                </View>
                            )}

                            {/* Tags */}
                            {/* @ts-ignore */}
                            <View className="flex-row flex-wrap gap-2">
                                {recipe.tags.map(tag => (
                                    <View
                                        key={tag}
                                        // @ts-ignore
                                        className="px-3 py-1.5 bg-secondary/20 border border-secondary/30 rounded-full"
                                    >
                                        {/* @ts-ignore */}
                                        <Text className="text-secondary-foreground text-xs font-medium">
                                            {tag}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Dad Tip */}
                            {recipe.dadTip && (
                                // @ts-ignore
                                <View className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-start gap-3">
                                        <Lightbulb size={24} color={isDark ? COLORS.dark.accent : COLORS.light.accent} />
                                        {/* @ts-ignore */}
                                        <View className="flex-1">
                                            {/* @ts-ignore */}
                                            <Text className="font-semibold text-accent mb-1">Dad Tip</Text>
                                            {/* @ts-ignore */}
                                            <Text className="text-sm text-foreground">{recipe.dadTip}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}

                            {/* Ingredients */}
                            {/* @ts-ignore */}
                            <View>
                                {/* @ts-ignore */}
                                <Text className="text-lg font-bold text-foreground mb-3">Ingredients</Text>
                                {/* @ts-ignore */}
                                <View className="gap-2">
                                    {recipe.ingredients.map((ingredient, idx) => (
                                        <View
                                            key={idx}
                                            // @ts-ignore
                                            className="flex-row items-center gap-3 p-3 bg-secondary/5 border border-white/5 rounded-xl"
                                        >
                                            {/* @ts-ignore */}
                                            <View className="w-2 h-2 rounded-full bg-primary" />
                                            {/* @ts-ignore */}
                                            <Text className="text-foreground flex-1">
                                                {/* @ts-ignore */}
                                                <Text className="font-semibold">{ingredient.quantity} {ingredient.unit}</Text> {ingredient.item}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Steps */}
                            {/* @ts-ignore */}
                            <View>
                                {/* @ts-ignore */}
                                <Text className="text-lg font-bold text-foreground mb-3">Instructions</Text>
                                {/* @ts-ignore */}
                                <View className="gap-3">
                                    {recipe.steps.map((step, idx) => (
                                        <View
                                            key={idx}
                                            // @ts-ignore
                                            className="flex-row gap-4 p-4 bg-secondary/5 border border-white/5 rounded-xl"
                                        >
                                            {/* @ts-ignore */}
                                            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                                                {/* @ts-ignore */}
                                                <Text className="text-primary-foreground font-bold text-sm">
                                                    {idx + 1}
                                                </Text>
                                            </View>
                                            {/* @ts-ignore */}
                                            <Text className="text-foreground flex-1 pt-1 leading-6">{step}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </CardContent>
                    </ScrollView>

                    {/* Action Buttons */}
                    {/* @ts-ignore */}
                    <View className="flex-row gap-3 p-6 pt-4 border-t border-white/5 bg-card">
                        <Button
                            variant="outline"
                            size="lg"
                            onPress={onClose}
                            className="flex-1 rounded-full h-12 border-2"
                        >
                            {/* @ts-ignore */}
                            <Text className={isDark ? 'text-white' : 'text-black'}>Close</Text>
                        </Button>
                        <Button
                            size="lg"
                            onPress={onRegenerate}
                            className="flex-1 rounded-full h-12 bg-primary shadow-lg shadow-primary/25"
                        >
                            {/* @ts-ignore */}
                            <RefreshCw size={16} color="#FFFFFF" className="mr-2" />
                            {/* @ts-ignore */}
                            <Text className="text-primary-foreground text-base font-semibold ml-2">Swap Recipe</Text>
                        </Button>
                    </View>
                </Card>
            </View>
        </Modal>
    );
};
