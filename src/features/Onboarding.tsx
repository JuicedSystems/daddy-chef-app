import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChefHat, Salad, MapPin, Rocket, Check } from 'lucide-react-native';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../lib/utils';
import { useColorScheme } from 'nativewind';
import { COLORS } from '../styles/theme';

const DIETARY_OPTIONS = [
    'Vegetarian', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'No Pork'
];

export function Onboarding() {
    const { setPreferences, generateWeek } = useStore();
    const [step, setStep] = useState(1);
    const [kidsCount, setKidsCount] = useState(1);
    const [dietary, setDietary] = useState<string[]>([]);
    const [zipCode, setZipCode] = useState('');
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Save and finish
            setPreferences({
                kidsCount,
                dietary: dietary,
                zipCode
            });
            generateWeek();
        }
    };

    const toggleDietary = (option: string) => {
        setDietary(prev =>
            prev.includes(option)
                ? prev.filter(d => d !== option)
                : [...prev, option]
        );
    };

    return (
        // @ts-ignore
        <ScrollView contentContainerClassName="flex-grow justify-center p-4 sm:p-6 bg-background">
            {/* @ts-ignore */}
            <View className="w-full max-w-lg self-center">
                <Card
                    // @ts-ignore
                    className="shadow-2xl shadow-black/50 border border-white/10 overflow-hidden rounded-3xl bg-card"
                >
                    {/* Progress indicator */}
                    {/* @ts-ignore */}
                    <View className="h-1.5 bg-secondary">
                        {/* @ts-ignore */}
                        <View
                            className="h-full bg-primary"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </View>

                    <CardHeader className="items-center space-y-4 pt-8 pb-6 px-6">
                        {/* Icon */}
                        {/* @ts-ignore */}
                        <View className="mx-auto w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-6">
                            {step === 1 && <ChefHat size={40} color={primaryColor} />}
                            {step === 2 && <Salad size={40} color={primaryColor} />}
                            {step === 3 && <MapPin size={40} color={primaryColor} />}
                        </View>

                        {/* Title */}
                        {/* @ts-ignore */}
                        <View className="space-y-2 items-center">
                            <CardTitle className="text-2xl font-bold text-foreground text-center">
                                {step === 1 && "Welcome, Dad!"}
                                {step === 2 && "Dietary Preferences"}
                                {step === 3 && "Almost Done!"}
                            </CardTitle>
                            {/* @ts-ignore */}
                            <Text className="text-muted-foreground text-sm text-center">
                                {step === 1 && "Let's personalize your meal planning experience"}
                                {step === 2 && "Any dietary restrictions we should know about?"}
                                {step === 3 && "Help us find local deals for you"}
                            </Text>
                        </View>

                        {/* Step indicator */}
                        {/* @ts-ignore */}
                        <View className="flex-row items-center justify-center gap-2 pt-2">
                            {[1, 2, 3].map((i) => (
                                <View
                                    key={i}
                                    // @ts-ignore
                                    className={cn(
                                        "h-2 rounded-full",
                                        i === step ? 'w-8 bg-primary' : i < step ? 'w-2 bg-primary/50' : 'w-2 bg-muted'
                                    )}
                                />
                            ))}
                        </View>
                    </CardHeader>

                    <CardContent className="px-6 pb-8 space-y-8">
                        {/* Step 1: Kids Count */}
                        {step === 1 && (
                            // @ts-ignore
                            <View className="space-y-6">
                                {/* @ts-ignore */}
                                <View className="space-y-3">
                                    {/* @ts-ignore */}
                                    <Text className="text-sm font-semibold text-foreground text-center">
                                        How many kids are we feeding?
                                    </Text>
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center justify-center gap-6 py-6">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-14 h-14 rounded-2xl border-2"
                                            onPress={() => setKidsCount(Math.max(1, kidsCount - 1))}
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-2xl font-bold text-foreground">−</Text>
                                        </Button>
                                        {/* @ts-ignore */}
                                        <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-6">
                                            {/* @ts-ignore */}
                                            <Text className="text-5xl font-bold text-primary">{kidsCount}</Text>
                                        </View>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-14 h-14 rounded-2xl border-2"
                                            onPress={() => setKidsCount(kidsCount + 1)}
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-2xl font-bold text-foreground">+</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* Step 2: Dietary Restrictions */}
                        {step === 2 && (
                            // @ts-ignore
                            <View className="space-y-6">
                                {/* @ts-ignore */}
                                <View className="space-y-3">
                                    {/* @ts-ignore */}
                                    <Text className="text-sm font-semibold text-foreground">
                                        Select any dietary restrictions
                                    </Text>
                                    {/* @ts-ignore */}
                                    <Text className="text-xs text-muted-foreground">
                                        Optional - skip if none apply
                                    </Text>
                                </View>
                                {/* @ts-ignore */}
                                <View className="flex-row flex-wrap gap-3">
                                    {DIETARY_OPTIONS.map(option => (
                                        <Pressable
                                            key={option}
                                            onPress={() => toggleDietary(option)}
                                            // @ts-ignore
                                            className={cn(
                                                "px-5 py-3 rounded-full border flex-row items-center",
                                                dietary.includes(option)
                                                    ? "bg-primary border-primary"
                                                    : "bg-secondary/10 border-white/10"
                                            )}
                                        >
                                            {/* @ts-ignore */}
                                            {dietary.includes(option) && <Check size={12} color="#FFFFFF" className="mr-1.5" />}
                                            {/* @ts-ignore */}
                                            <Text className={cn(
                                                "text-sm font-medium",
                                                dietary.includes(option) ? "text-primary-foreground" : "text-foreground"
                                            )}>
                                                {option}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Step 3: Zip Code */}
                        {step === 3 && (
                            // @ts-ignore
                            <View className="space-y-6">
                                {/* @ts-ignore */}
                                <View className="space-y-3">
                                    {/* @ts-ignore */}
                                    <Text className="text-sm font-semibold text-foreground">
                                        Enter your zip code
                                    </Text>
                                    {/* @ts-ignore */}
                                    <Text className="text-xs text-muted-foreground">
                                        We'll use this to find local grocery deals
                                    </Text>
                                </View>
                                <Input
                                    placeholder="12345"
                                    value={zipCode}
                                    onChangeText={(text) => setZipCode(text.replace(/\D/g, '').slice(0, 5))}
                                    maxLength={5}
                                    keyboardType="numeric"
                                    className="text-center text-2xl h-16 rounded-2xl border-2"
                                />
                            </View>
                        )}

                        {/* Navigation Buttons */}
                        {/* @ts-ignore */}
                        <View className="flex-row gap-3 pt-4">
                            {step > 1 && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onPress={() => setStep(step - 1)}
                                    className="flex-1 rounded-2xl h-14 border-2"
                                >
                                    {/* @ts-ignore */}
                                    <Text className="text-base font-semibold text-foreground">Back</Text>
                                </Button>
                            )}
                            <Button
                                size="lg"
                                onPress={handleNext}
                                className="flex-1 rounded-full h-14 bg-primary shadow-lg shadow-primary/25"
                            >
                                {step === 3 ? (
                                    // @ts-ignore
                                    <View className="flex-row items-center gap-2">
                                        {/* @ts-ignore */}
                                        <Text className="text-primary-foreground text-base font-semibold">Start Cooking</Text>
                                        {/* @ts-ignore */}
                                        <Rocket size={16} color="#FFFFFF" />
                                    </View>
                                ) : (
                                    // @ts-ignore
                                    <Text className="text-primary-foreground text-base font-semibold">Continue</Text>
                                )}
                            </Button>
                        </View>
                    </CardContent>
                </Card>

                {/* Skip option */}
                {step < 3 && (
                    // @ts-ignore
                    <View className="items-center mt-6">
                        <Pressable onPress={() => setStep(3)}>
                            {/* @ts-ignore */}
                            <Text className="text-sm text-muted-foreground">
                                Skip for now →
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
