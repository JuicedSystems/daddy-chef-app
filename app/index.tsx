import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useStore } from '../src/store/useStore';
import { Onboarding } from '../src/features/Onboarding';
import { MealPlanner } from '../src/features/MealPlanner';
import { ShoppingList } from '../src/features/ShoppingList';
import { UserSettings } from '../src/features/UserSettings';
import { Recipes } from '../src/features/Recipes';
import { Header } from '../src/components/Header';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
    const { preferences, mealPlan, generateWeek } = useStore();
    const [activeTab, setActiveTab] = useState<'plan' | 'shop' | 'recipes'>('plan');
    const [showSettings, setShowSettings] = useState(false);

    // Initial generation if empty
    useEffect(() => {
        if (mealPlan.length === 0 && preferences.kidsCount) {
            generateWeek();
        }
    }, [mealPlan.length, generateWeek, preferences.kidsCount]);

    // If no preferences set, show onboarding
    if (!preferences.kidsCount) {
        return (
            // @ts-ignore
            <View className="flex-1 bg-background">
                <Onboarding />
            </View>
        );
    }

    return (
        // @ts-ignore
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="auto" />
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                preferences={preferences}
                onOpenSettings={() => setShowSettings(true)}
                onGenerateWeek={generateWeek}
            />

            {/* Main Content */}
            {/* @ts-ignore */}
            <View className="flex-1">
                {activeTab === 'plan' && <MealPlanner onNavigateToShop={() => setActiveTab('shop')} />}
                {activeTab === 'shop' && <ShoppingList onBack={() => setActiveTab('plan')} />}
                {activeTab === 'recipes' && <Recipes />}
            </View>

            {/* User Settings Modal */}
            <UserSettings visible={showSettings} onClose={() => setShowSettings(false)} />
        </SafeAreaView>
    );
}
