import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Recipe, RECIPES, getRandomRecipes } from '../data/recipes';

interface UserPreferences {
    totalPeople: number;
    kidsCount: number;
    kidAges: string;
    allergies: string[];
    dietary: string[];
    adventurousScale: number;
    isOnboarded: boolean;
    zipCode?: string;
}

interface MealPlanDay {
    day: string; // 'Monday', 'Tuesday', etc.
    recipe: Recipe;
}

interface RecipeRating {
    recipeId: string;
    userRating: number; // 1-5
    kidRating: number; // 1-5
    ratedAt: string; // ISO timestamp
}

interface StoreState {
    preferences: UserPreferences;
    mealPlan: MealPlanDay[];
    shoppingListChecked: string[]; // IDs of checked items
    recipeRatings: Record<string, RecipeRating>;
    bookmarkedRecipes: string[]; // IDs of bookmarked recipes

    // Actions
    setPreferences: (prefs: Partial<UserPreferences>) => void;
    completeOnboarding: () => void;
    generateWeek: () => void;
    regenerateDay: (dayIndex: number) => void;
    toggleShoppingItem: (item: string) => void;
    resetApp: () => void;

    // New Actions
    rateRecipe: (recipeId: string, userRating: number, kidRating: number) => void;
    toggleBookmark: (recipeId: string) => void;
    getRecipeRating: (recipeId: string) => RecipeRating | undefined;
    isBookmarked: (recipeId: string) => boolean;
}

const INITIAL_PREFERENCES: UserPreferences = {
    totalPeople: 4,
    kidsCount: 2,
    kidAges: '',
    allergies: [],
    dietary: [],
    adventurousScale: 3,
    isOnboarded: false,
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            preferences: INITIAL_PREFERENCES,
            mealPlan: [],
            shoppingListChecked: [],
            recipeRatings: {},
            bookmarkedRecipes: [],

            setPreferences: (prefs) =>
                set((state) => ({ preferences: { ...state.preferences, ...prefs } })),

            completeOnboarding: () => {
                set((state) => ({ preferences: { ...state.preferences, isOnboarded: true } }));
                get().generateWeek();
            },

            generateWeek: () => {
                const { preferences } = get();
                // Filter recipes based on allergies/dietary
                // For now, simple random selection from filtered list
                // In a real app, logic would be more complex

                let availableRecipes = RECIPES.filter(recipe => {
                    // Basic filtering logic could go here
                    // For now, we assume all recipes are generally safe or user checks details
                    // But let's filter by tags if dietary is set
                    if (preferences.dietary.includes('Vegetarian') && !recipe.tags.includes('Vegetarian')) return false;
                    return true;
                });

                // Fallback if too strict
                if (availableRecipes.length < 5) availableRecipes = RECIPES;

                const selected = getRandomRecipes(5);
                const newPlan = DAYS.map((day, index) => ({
                    day,
                    recipe: selected[index] || RECIPES[0]
                }));

                set({ mealPlan: newPlan, shoppingListChecked: [] });
            },

            regenerateDay: (dayIndex) => {
                const { mealPlan } = get();
                const currentIds = mealPlan.map(d => d.recipe.id);
                const newRecipe = getRandomRecipes(1, currentIds)[0];

                if (newRecipe) {
                    const newPlan = [...mealPlan];
                    newPlan[dayIndex].recipe = newRecipe;
                    set({ mealPlan: newPlan });
                }
            },

            toggleShoppingItem: (item) => {
                set((state) => {
                    const checked = state.shoppingListChecked.includes(item)
                        ? state.shoppingListChecked.filter(i => i !== item)
                        : [...state.shoppingListChecked, item];
                    return { shoppingListChecked: checked };
                });
            },

            resetApp: () => {
                set({
                    preferences: INITIAL_PREFERENCES,
                    mealPlan: [],
                    shoppingListChecked: [],
                    recipeRatings: {},
                    bookmarkedRecipes: []
                });
            },

            rateRecipe: (recipeId, userRating, kidRating) => {
                set((state) => ({
                    recipeRatings: {
                        ...state.recipeRatings,
                        [recipeId]: {
                            recipeId,
                            userRating,
                            kidRating,
                            ratedAt: new Date().toISOString()
                        }
                    }
                }));
            },

            toggleBookmark: (recipeId) => {
                set((state) => {
                    const isBookmarked = state.bookmarkedRecipes.includes(recipeId);
                    return {
                        bookmarkedRecipes: isBookmarked
                            ? state.bookmarkedRecipes.filter(id => id !== recipeId)
                            : [...state.bookmarkedRecipes, recipeId]
                    };
                });
            },

            getRecipeRating: (recipeId) => {
                return get().recipeRatings[recipeId];
            },

            isBookmarked: (recipeId) => {
                return get().bookmarkedRecipes.includes(recipeId);
            }
        }),
        {
            name: 'daddy-dinner-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
