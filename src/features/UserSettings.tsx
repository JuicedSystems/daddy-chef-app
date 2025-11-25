import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { X, Users, Baby, Salad, MapPin, AlertCircle, Settings, Check } from 'lucide-react-native';
import { View, Text, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import { cn } from '../lib/utils';
import { useColorScheme } from 'nativewind';
import { COLORS } from '../styles/theme';

const DIETARY_OPTIONS = [
    'Vegetarian', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'No Pork'
];

interface UserSettingsProps {
    onClose: () => void;
    visible: boolean;
}

export function UserSettings({ onClose, visible }: UserSettingsProps) {
    const { preferences, setPreferences, resetApp } = useStore();
    const [localPrefs, setLocalPrefs] = useState(preferences);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const primaryColor = isDark ? COLORS.dark.primary : COLORS.light.primary;
    const destructiveColor = '#ef4444'; // red-500

    const toggleDietary = (option: string) => {
        setLocalPrefs(prev => ({
            ...prev,
            dietary: prev.dietary.includes(option)
                ? prev.dietary.filter(d => d !== option)
                : [...prev.dietary, option]
        }));
    };

    const handleSave = () => {
        setPreferences(localPrefs);
        onClose();
    };

    const handleReset = () => {
        resetApp();
        setShowResetConfirm(false);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {/* @ts-ignore */}
            <View className="flex-1 justify-center items-center bg-black/60 p-4">
                <Card
                    // @ts-ignore
                    className="w-full max-w-2xl max-h-[90%] shadow-2xl border-white/10 rounded-3xl bg-card flex-1"
                >
                    {/* Header */}
                    {/* @ts-ignore */}
                    <View className="bg-card/95 border-b border-white/5 z-10 rounded-t-3xl">
                        {/* @ts-ignore */}
                        <View className="flex-row items-center justify-between p-6">
                            {/* @ts-ignore */}
                            <View className="flex-row items-center gap-3 flex-1">
                                {/* @ts-ignore */}
                                <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                                    <Settings size={24} color={primaryColor} />
                                </View>
                                {/* @ts-ignore */}
                                <View>
                                    <CardTitle className="text-2xl font-bold text-foreground">Settings</CardTitle>
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">Manage your preferences</Text>
                                </View>
                            </View>
                            <Button
                                variant="ghost"
                                size="icon"
                                onPress={onClose}
                                className="rounded-full"
                            >
                                {/* @ts-ignore */}
                                <X size={20} color={isDark ? '#FFFFFF' : '#000000'} />
                            </Button>
                        </View>
                    </View>

                    {/* @ts-ignore */}
                    <ScrollView contentContainerClassName="p-6 space-y-8">
                        {/* Family Size Section */}
                        {/* @ts-ignore */}
                        <View className="space-y-4">
                            {/* @ts-ignore */}
                            <View className="flex-row items-center gap-3">
                                {/* @ts-ignore */}
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <Users size={20} color={primaryColor} />
                                </View>
                                {/* @ts-ignore */}
                                <View>
                                    {/* @ts-ignore */}
                                    <Text className="text-lg font-semibold text-foreground">Family Size</Text>
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">How many people you're feeding</Text>
                                </View>
                            </View>

                            {/* @ts-ignore */}
                            <View className="bg-secondary/5 border border-white/5 rounded-2xl p-6 space-y-4">
                                {/* Total People */}
                                {/* @ts-ignore */}
                                <View className="space-y-3">
                                    {/* @ts-ignore */}
                                    <Text className="text-sm font-semibold text-foreground">
                                        Total People
                                    </Text>
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center justify-center gap-6">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-12 h-12 rounded-xl border-2"
                                            onPress={() => setLocalPrefs(prev => ({ ...prev, totalPeople: Math.max(1, prev.totalPeople - 1) }))}
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-xl font-bold text-foreground">−</Text>
                                        </Button>
                                        {/* @ts-ignore */}
                                        <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center">
                                            {/* @ts-ignore */}
                                            <Text className="text-4xl font-bold text-primary">{localPrefs.totalPeople}</Text>
                                        </View>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-12 h-12 rounded-xl border-2"
                                            onPress={() => setLocalPrefs(prev => ({ ...prev, totalPeople: prev.totalPeople + 1 }))}
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-xl font-bold text-foreground">+</Text>
                                        </Button>
                                    </View>
                                </View>

                                {/* Kids Count */}
                                {/* @ts-ignore */}
                                <View className="space-y-3 pt-4 border-t border-white/5">
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center gap-2">
                                        <Baby size={16} color={primaryColor} />
                                        {/* @ts-ignore */}
                                        <Text className="text-sm font-semibold text-foreground">Number of Kids</Text>
                                    </View>
                                    {/* @ts-ignore */}
                                    <View className="flex-row items-center justify-center gap-6">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-12 h-12 rounded-xl border-2"
                                            onPress={() => setLocalPrefs(prev => ({ ...prev, kidsCount: Math.max(0, prev.kidsCount - 1) }))}
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-xl font-bold text-foreground">−</Text>
                                        </Button>
                                        {/* @ts-ignore */}
                                        <View className="w-20 h-20 rounded-full bg-secondary/10 items-center justify-center">
                                            {/* @ts-ignore */}
                                            <Text className="text-4xl font-bold text-secondary">{localPrefs.kidsCount}</Text>
                                        </View>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-12 h-12 rounded-xl border-2"
                                            onPress={() => setLocalPrefs(prev => ({ ...prev, kidsCount: prev.kidsCount + 1 }))}
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-xl font-bold text-foreground">+</Text>
                                        </Button>
                                    </View>
                                </View>

                                {/* Kid Ages */}
                                {/* @ts-ignore */}
                                <View className="space-y-3 pt-4 border-t border-white/5">
                                    {/* @ts-ignore */}
                                    <Text className="text-sm font-semibold text-foreground">
                                        Kid Ages (optional)
                                    </Text>
                                    <TextInput
                                        placeholder="e.g., 5, 8, 12"
                                        placeholderTextColor="#9CA3AF"
                                        value={localPrefs.kidAges}
                                        onChangeText={(text) => setLocalPrefs(prev => ({ ...prev, kidAges: text }))}
                                        // @ts-ignore
                                        className="w-full px-4 py-3 rounded-xl border-2 border-white/10 bg-background/50 text-foreground"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Dietary Restrictions Section */}
                        {/* @ts-ignore */}
                        <View className="space-y-4">
                            {/* @ts-ignore */}
                            <View className="flex-row items-center gap-3">
                                {/* @ts-ignore */}
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <Salad size={20} color={primaryColor} />
                                </View>
                                {/* @ts-ignore */}
                                <View>
                                    {/* @ts-ignore */}
                                    <Text className="text-lg font-semibold text-foreground">Dietary Restrictions</Text>
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">Allergies and preferences</Text>
                                </View>
                            </View>

                            {/* @ts-ignore */}
                            <View className="bg-secondary/5 border border-white/5 rounded-2xl p-6">
                                {/* @ts-ignore */}
                                <View className="flex-row flex-wrap gap-3">
                                    {DIETARY_OPTIONS.map(option => (
                                        <Pressable
                                            key={option}
                                            onPress={() => toggleDietary(option)}
                                            // @ts-ignore
                                            className={cn(
                                                "px-5 py-3 rounded-full border flex-row items-center",
                                                localPrefs.dietary.includes(option)
                                                    ? "bg-primary border-primary"
                                                    : "bg-secondary/10 border-white/10"
                                            )}
                                        >
                                            {/* @ts-ignore */}
                                            {localPrefs.dietary.includes(option) && <Check size={12} color="#FFFFFF" className="mr-1.5" />}
                                            {/* @ts-ignore */}
                                            <Text className={cn(
                                                "text-sm font-medium",
                                                localPrefs.dietary.includes(option) ? "text-primary-foreground" : "text-foreground"
                                            )}>
                                                {option}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                                {localPrefs.dietary.length === 0 && (
                                    // @ts-ignore
                                    <Text className="text-sm text-muted-foreground text-center mt-4">
                                        No dietary restrictions selected
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Allergies Section */}
                        {/* @ts-ignore */}
                        <View className="space-y-4">
                            {/* @ts-ignore */}
                            <View className="flex-row items-center gap-3">
                                {/* @ts-ignore */}
                                <View className="w-10 h-10 rounded-full bg-destructive/10 items-center justify-center">
                                    <AlertCircle size={20} color={destructiveColor} />
                                </View>
                                {/* @ts-ignore */}
                                <View>
                                    {/* @ts-ignore */}
                                    <Text className="text-lg font-semibold text-foreground">Allergies</Text>
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">Specific ingredients to avoid</Text>
                                </View>
                            </View>

                            {/* @ts-ignore */}
                            <View className="bg-secondary/5 border border-white/5 rounded-2xl p-6">
                                <TextInput
                                    placeholder="e.g., peanuts, shellfish, eggs..."
                                    placeholderTextColor="#9CA3AF"
                                    value={localPrefs.allergies.join(', ')}
                                    onChangeText={(text) => setLocalPrefs(prev => ({
                                        ...prev,
                                        allergies: text.split(',').map(a => a.trim()).filter(Boolean)
                                    }))}
                                    multiline
                                    numberOfLines={3}
                                    // @ts-ignore
                                    className="w-full px-4 py-3 rounded-xl border-2 border-white/10 bg-background/50 text-foreground h-24"
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </View>
                        </View>

                        {/* Location Section */}
                        {/* @ts-ignore */}
                        <View className="space-y-4">
                            {/* @ts-ignore */}
                            <View className="flex-row items-center gap-3">
                                {/* @ts-ignore */}
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <MapPin size={20} color={primaryColor} />
                                </View>
                                {/* @ts-ignore */}
                                <View>
                                    {/* @ts-ignore */}
                                    <Text className="text-lg font-semibold text-foreground">Location</Text>
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-muted-foreground">For local grocery deals</Text>
                                </View>
                            </View>

                            {/* @ts-ignore */}
                            <View className="bg-secondary/5 border border-white/5 rounded-2xl p-6">
                                <TextInput
                                    placeholder="12345"
                                    placeholderTextColor="#9CA3AF"
                                    value={localPrefs.zipCode || ''}
                                    onChangeText={(text) => setLocalPrefs(prev => ({
                                        ...prev,
                                        zipCode: text.replace(/\D/g, '').slice(0, 5)
                                    }))}
                                    maxLength={5}
                                    keyboardType="numeric"
                                    // @ts-ignore
                                    className="w-full px-4 py-3 rounded-xl border-2 border-white/10 bg-background/50 text-foreground text-center text-xl tracking-widest"
                                />
                            </View>
                        </View>

                        {/* Action Buttons */}
                        {/* @ts-ignore */}
                        <View className="gap-3 pt-4 border-t border-white/5 pb-6">
                            {/* @ts-ignore */}
                            <View className="flex-row gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onPress={onClose}
                                    className="flex-1 rounded-full h-12 border-2"
                                >
                                    {/* @ts-ignore */}
                                    <Text className="text-base font-semibold text-foreground">Cancel</Text>
                                </Button>
                                <Button
                                    size="lg"
                                    onPress={handleSave}
                                    className="flex-1 rounded-full h-12 bg-primary shadow-lg shadow-primary/25"
                                >
                                    {/* @ts-ignore */}
                                    <Text className="text-base font-semibold text-primary-foreground">Save Changes</Text>
                                </Button>
                            </View>

                            {/* Reset App Button */}
                            {!showResetConfirm ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => setShowResetConfirm(true)}
                                    className="rounded-full"
                                >
                                    {/* @ts-ignore */}
                                    <Text className="text-destructive font-semibold">Reset All Data</Text>
                                </Button>
                            ) : (
                                // @ts-ignore
                                <View className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 space-y-3">
                                    {/* @ts-ignore */}
                                    <Text className="text-sm text-destructive font-semibold text-center">
                                        Are you sure? This will delete all your preferences and meal plans.
                                    </Text>
                                    {/* @ts-ignore */}
                                    <View className="flex-row gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onPress={() => setShowResetConfirm(false)}
                                            className="flex-1 rounded-full"
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onPress={handleReset}
                                            className="flex-1 rounded-full"
                                        >
                                            {/* @ts-ignore */}
                                            <Text className="text-destructive-foreground">Yes, Reset</Text>
                                        </Button>
                                    </View>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </Card>
            </View>
        </Modal>
    );
}
