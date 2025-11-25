export interface Ingredient {
    item: string;
    quantity: number;
    unit: string;
    category: 'Produce' | 'Meat' | 'Dairy' | 'Pantry' | 'Frozen' | 'Bakery' | 'Other';
}

export interface Recipe {
    id: string;
    title: string;
    time: number; // minutes
    servings: number;
    ingredients: Ingredient[];
    steps: string[];
    image: string;
    kidRating: number; // 1-5
    dadTip: string;
    tags: string[]; // 'Vegetarian', 'Quick', 'One-Pot', etc.
}

export const RECIPES: Recipe[] = [
    {
        id: '1',
        title: 'Cheesy Beef Taco Skillet',
        time: 25,
        servings: 4,
        ingredients: [
            { item: 'Ground Beef', quantity: 1, unit: 'lb', category: 'Meat' },
            { item: 'Taco Seasoning', quantity: 1, unit: 'packet', category: 'Pantry' },
            { item: 'Salsa', quantity: 1, unit: 'cup', category: 'Pantry' },
            { item: 'Cheddar Cheese', quantity: 2, unit: 'cups', category: 'Dairy' },
            { item: 'Tortilla Chips', quantity: 1, unit: 'bag', category: 'Pantry' },
        ],
        steps: [
            'Brown the beef in a large skillet over medium-high heat.',
            'Drain the grease if you want (or don\'t, flavor lives there).',
            'Stir in taco seasoning and salsa. Simmer for 5 mins.',
            'Top with cheese, cover until melted.',
            'Serve with chips for scooping. No forks needed.'
        ],
        image: '/meals/cheesy-taco-skillet.png',
        kidRating: 5,
        dadTip: 'Let them crush the chips on top. Destruction = appetite.',
        tags: ['Quick', 'One-Pot', 'Beef']
    },
    {
        id: '2',
        title: 'Hidden Veggie Mac & Cheese',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Elbow Macaroni', quantity: 1, unit: 'lb', category: 'Pantry' },
            { item: 'Cauliflower (frozen)', quantity: 1, unit: 'bag', category: 'Frozen' },
            { item: 'Cheddar Cheese', quantity: 2, unit: 'cups', category: 'Dairy' },
            { item: 'Milk', quantity: 0.5, unit: 'cup', category: 'Dairy' },
            { item: 'Cream Cheese', quantity: 2, unit: 'tbsp', category: 'Dairy' },
        ],
        steps: [
            'Boil pasta. Throw the frozen cauliflower in with the pasta for the last 5 mins.',
            'Drain everything.',
            'Blend cauliflower with milk and cream cheese (or mash secretly).',
            'Stir cheese sauce into pasta.',
            'Serve immediately before they ask questions.'
        ],
        image: '/meals/mac-and-cheese.png',
        kidRating: 4.8,
        dadTip: 'Call it "Super Power Pasta". Never mention the C-word (Cauliflower).',
        tags: ['Vegetarian', 'Quick', 'Pasta']
    },
    {
        id: '3',
        title: 'Sheet Pan Chicken Fajitas',
        time: 30,
        servings: 4,
        ingredients: [
            { item: 'Chicken Breast', quantity: 1.5, unit: 'lb', category: 'Meat' },
            { item: 'Bell Peppers', quantity: 3, unit: 'count', category: 'Produce' },
            { item: 'Onion', quantity: 1, unit: 'count', category: 'Produce' },
            { item: 'Fajita Seasoning', quantity: 1, unit: 'packet', category: 'Pantry' },
            { item: 'Tortillas', quantity: 8, unit: 'count', category: 'Bakery' },
        ],
        steps: [
            'Slice chicken and veggies into strips.',
            'Toss with oil and seasoning on a baking sheet.',
            'Bake at 400°F (200°C) for 20-25 mins.',
            'Warm tortillas in the microwave.',
            'Assemble and eat.'
        ],
        image: '/meals/chicken-fajitas.png',
        kidRating: 4.5,
        dadTip: 'Sour cream is the glue that holds the taco together.',
        tags: ['Sheet-Pan', 'Chicken', 'Healthy']
    },
    {
        id: '4',
        title: 'Sloppy Joes',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Ground Beef', quantity: 1, unit: 'lb', category: 'Meat' },
            { item: 'Ketchup', quantity: 1, unit: 'cup', category: 'Pantry' },
            { item: 'Mustard', quantity: 1, unit: 'tbsp', category: 'Pantry' },
            { item: 'Brown Sugar', quantity: 1, unit: 'tbsp', category: 'Pantry' },
            { item: 'Hamburger Buns', quantity: 4, unit: 'count', category: 'Bakery' },
        ],
        steps: [
            'Brown beef in a skillet.',
            'Stir in ketchup, mustard, and sugar.',
            'Simmer for 5 mins until thick.',
            'Pile onto buns.',
            'Napkins. Lots of napkins.'
        ],
        image: '/meals/sloppy-joes.png',
        kidRating: 5,
        dadTip: 'Toast the buns. It prevents sogginess.',
        tags: ['Quick', 'Beef', 'Classic']
    },
    {
        id: '5',
        title: 'Breakfast for Dinner: Pancakes',
        time: 15,
        servings: 4,
        ingredients: [
            { item: 'Pancake Mix', quantity: 2, unit: 'cups', category: 'Pantry' },
            { item: 'Milk', quantity: 1.5, unit: 'cups', category: 'Dairy' },
            { item: 'Eggs', quantity: 2, unit: 'count', category: 'Dairy' },
            { item: 'Bacon', quantity: 1, unit: 'lb', category: 'Meat' },
            { item: 'Syrup', quantity: 1, unit: 'bottle', category: 'Pantry' },
        ],
        steps: [
            'Cook bacon in oven (400°F for 15 mins) - less mess.',
            'Whisk pancake mix, milk, and eggs.',
            'Cook pancakes on griddle.',
            'Serve with bacon and syrup.',
            'You are now the hero.'
        ],
        image: '/meals/breakfast-pancakes.png',
        kidRating: 5,
        dadTip: 'Make a smiley face pancake. Instant win.',
        tags: ['Breakfast', 'Quick', 'Cheap']
    },
    {
        id: '6',
        title: 'Pizza Quesadillas',
        time: 15,
        servings: 4,
        ingredients: [
            { item: 'Tortillas', quantity: 8, unit: 'count', category: 'Bakery' },
            { item: 'Mozzarella Cheese', quantity: 2, unit: 'cups', category: 'Dairy' },
            { item: 'Pepperoni', quantity: 1, unit: 'pack', category: 'Meat' },
            { item: 'Pizza Sauce', quantity: 1, unit: 'jar', category: 'Pantry' },
        ],
        steps: [
            'Spread sauce on tortilla.',
            'Add cheese and pepperoni.',
            'Top with second tortilla.',
            'Fry in pan until crispy and melted.',
            'Slice like a pizza.'
        ],
        image: '/meals/pizza-quesadillas.png',
        kidRating: 4.9,
        dadTip: 'Dip in ranch if you want to be midwestern.',
        tags: ['Quick', 'Lunch', 'Kid-Fav']
    },
    {
        id: '7',
        title: 'Teriyaki Chicken & Rice',
        time: 25,
        servings: 4,
        ingredients: [
            { item: 'Chicken Thighs', quantity: 1.5, unit: 'lb', category: 'Meat' },
            { item: 'Teriyaki Sauce', quantity: 1, unit: 'bottle', category: 'Pantry' },
            { item: 'Broccoli', quantity: 1, unit: 'head', category: 'Produce' },
            { item: 'Rice', quantity: 2, unit: 'cups', category: 'Pantry' },
        ],
        steps: [
            'Start rice in rice cooker or pot.',
            'Cut chicken into chunks, brown in pan.',
            'Add broccoli florets and splash of water, cover to steam 3 mins.',
            'Pour in teriyaki sauce, simmer until thick.',
            'Serve over rice.'
        ],
        image: '/meals/teriyaki-chicken.png',
        kidRating: 4.2,
        dadTip: 'Sesame seeds on top make it look fancy.',
        tags: ['Asian', 'Chicken', 'Rice']
    },
    {
        id: '8',
        title: 'Spaghetti Bolognese',
        time: 30,
        servings: 4,
        ingredients: [
            { item: 'Spaghetti', quantity: 1, unit: 'lb', category: 'Pantry' },
            { item: 'Ground Beef', quantity: 1, unit: 'lb', category: 'Meat' },
            { item: 'Marinara Sauce', quantity: 1, unit: 'jar', category: 'Pantry' },
            { item: 'Parmesan Cheese', quantity: 0.5, unit: 'cup', category: 'Dairy' },
        ],
        steps: [
            'Boil water for pasta.',
            'Brown beef in pan.',
            'Add sauce to beef, simmer.',
            'Drain pasta, toss with sauce.',
            'Cheese mountain on top.'
        ],
        image: '/meals/spaghetti-bolognese.png',
        kidRating: 4.7,
        dadTip: 'Break the spaghetti in half before boiling. Easier for kids to eat.',
        tags: ['Pasta', 'Beef', 'Classic']
    },
    {
        id: '9',
        title: 'Fish Stick Tacos',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Fish Sticks', quantity: 1, unit: 'box', category: 'Frozen' },
            { item: 'Tortillas', quantity: 8, unit: 'count', category: 'Bakery' },
            { item: 'Coleslaw Mix', quantity: 1, unit: 'bag', category: 'Produce' },
            { item: 'Lime', quantity: 1, unit: 'count', category: 'Produce' },
            { item: 'Mayo', quantity: 0.25, unit: 'cup', category: 'Pantry' },
        ],
        steps: [
            'Bake fish sticks according to box.',
            'Mix mayo with lime juice and toss with coleslaw.',
            'Put fish sticks in tortillas.',
            'Top with slaw.',
            'Surprisingly gourmet.'
        ],
        image: '/meals/fish-tacos.png',
        kidRating: 4.0,
        dadTip: 'Call them "Surfer Tacos".',
        tags: ['Fish', 'Tacos', 'Quick']
    },
    {
        id: '10',
        title: 'BBQ Chicken Sliders',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Rotisserie Chicken', quantity: 1, unit: 'count', category: 'Meat' },
            { item: 'BBQ Sauce', quantity: 1, unit: 'bottle', category: 'Pantry' },
            { item: 'Slider Buns', quantity: 12, unit: 'count', category: 'Bakery' },
            { item: 'Cheese Slices', quantity: 6, unit: 'count', category: 'Dairy' },
        ],
        steps: [
            'Shred the rotisserie chicken.',
            'Mix with BBQ sauce.',
            'Cut slab of buns in half horizontally.',
            'Layer chicken and cheese.',
            'Bake until cheese melts (10 mins).'
        ],
        image: '/meals/bbq-sliders.png',
        kidRating: 5,
        dadTip: 'Use Hawaiian rolls for extra sweetness.',
        tags: ['Chicken', 'Sandwich', 'Quick']
    },
    {
        id: '11',
        title: 'Pesto Pasta with Peas',
        time: 15,
        servings: 4,
        ingredients: [
            { item: 'Fusilli Pasta', quantity: 1, unit: 'lb', category: 'Pantry' },
            { item: 'Pesto', quantity: 1, unit: 'jar', category: 'Pantry' },
            { item: 'Frozen Peas', quantity: 1, unit: 'cup', category: 'Frozen' },
            { item: 'Parmesan', quantity: 0.5, unit: 'cup', category: 'Dairy' },
        ],
        steps: [
            'Boil pasta.',
            'Add frozen peas to boiling water for last 2 mins.',
            'Drain.',
            'Stir in pesto and cheese.',
            'Green food that actually gets eaten.'
        ],
        image: '/meals/pesto-pasta.png',
        kidRating: 4.3,
        dadTip: 'Tell them it\'s Hulk Pasta.',
        tags: ['Vegetarian', 'Pasta', 'Quick']
    },
    {
        id: '12',
        title: 'Sausage & Potato Sheet Pan',
        time: 35,
        servings: 4,
        ingredients: [
            { item: 'Smoked Sausage', quantity: 1, unit: 'lb', category: 'Meat' },
            { item: 'Potatoes', quantity: 1.5, unit: 'lb', category: 'Produce' },
            { item: 'Green Beans', quantity: 1, unit: 'lb', category: 'Produce' },
            { item: 'Olive Oil', quantity: 2, unit: 'tbsp', category: 'Pantry' },
        ],
        steps: [
            'Chop sausage, potatoes, and beans into bite sizes.',
            'Toss with oil, salt, and pepper on sheet pan.',
            'Roast at 400°F for 25-30 mins.',
            'Shake pan halfway through.',
            'Done.'
        ],
        image: '/meals/sausage-sheet-pan.png',
        kidRating: 4.6,
        dadTip: 'Ketchup is acceptable for dipping potatoes.',
        tags: ['Sheet-Pan', 'Meat', 'Easy']
    },
    {
        id: '13',
        title: 'Grilled Cheese & Tomato Soup',
        time: 15,
        servings: 4,
        ingredients: [
            { item: 'Bread', quantity: 8, unit: 'slices', category: 'Bakery' },
            { item: 'American Cheese', quantity: 8, unit: 'slices', category: 'Dairy' },
            { item: 'Tomato Soup', quantity: 2, unit: 'cans', category: 'Pantry' },
            { item: 'Butter', quantity: 2, unit: 'tbsp', category: 'Dairy' },
        ],
        steps: [
            'Heat soup in pot.',
            'Butter bread, place cheese inside.',
            'Fry sandwiches until golden.',
            'Cut diagonally (triangles taste better).',
            'Dip.'
        ],
        image: '/meals/grilled-cheese.png',
        kidRating: 5,
        dadTip: 'Use mayo on the outside of bread for better crisp.',
        tags: ['Vegetarian', 'Classic', 'Quick']
    },
    {
        id: '14',
        title: 'Chicken Quesadillas',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Tortillas', quantity: 8, unit: 'count', category: 'Bakery' },
            { item: 'Rotisserie Chicken', quantity: 1, unit: 'count', category: 'Meat' },
            { item: 'Cheddar Cheese', quantity: 2, unit: 'cups', category: 'Dairy' },
            { item: 'Salsa', quantity: 0.5, unit: 'cup', category: 'Pantry' },
        ],
        steps: [
            'Shred chicken.',
            'Place tortilla in pan, top with chicken and cheese.',
            'Fold in half.',
            'Cook until crispy on both sides.',
            'Serve with salsa.'
        ],
        image: '/meals/chicken-quesadillas.png',
        kidRating: 4.8,
        dadTip: 'Hide spinach inside. They won\'t know.',
        tags: ['Chicken', 'Quick', 'Mexican']
    },
    {
        id: '15',
        title: 'Burger Night',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Ground Beef', quantity: 1, unit: 'lb', category: 'Meat' },
            { item: 'Buns', quantity: 4, unit: 'count', category: 'Bakery' },
            { item: 'Cheese Slices', quantity: 4, unit: 'count', category: 'Dairy' },
            { item: 'Chips', quantity: 1, unit: 'bag', category: 'Pantry' },
        ],
        steps: [
            'Form 4 patties.',
            'Salt and pepper.',
            'Cook in skillet or grill 4 mins per side.',
            'Add cheese last minute.',
            'Serve with chips.'
        ],
        image: '/meals/burgers.png',
        kidRating: 5,
        dadTip: 'Thumb print in the middle of patty keeps it flat.',
        tags: ['Beef', 'Classic', 'Easy']
    },
    {
        id: '16',
        title: 'Chicken Noodle Soup',
        time: 30,
        servings: 4,
        ingredients: [
            { item: 'Rotisserie Chicken', quantity: 1, unit: 'count', category: 'Meat' },
            { item: 'Chicken Broth', quantity: 2, unit: 'cartons', category: 'Pantry' },
            { item: 'Egg Noodles', quantity: 1, unit: 'bag', category: 'Pantry' },
            { item: 'Carrots', quantity: 3, unit: 'count', category: 'Produce' },
            { item: 'Celery', quantity: 2, unit: 'stalks', category: 'Produce' },
        ],
        steps: [
            'Chop carrots and celery.',
            'Simmer in broth for 10 mins.',
            'Add noodles, cook 8 mins.',
            'Add shredded chicken.',
            'Warm and cozy.'
        ],
        image: '/meals/chicken-soup.png',
        kidRating: 4.5,
        dadTip: 'Serve with crackers. Kids love crackers.',
        tags: ['Soup', 'Chicken', 'Healthy']
    },
    {
        id: '17',
        title: 'Meatball Subs',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Frozen Meatballs', quantity: 1, unit: 'bag', category: 'Frozen' },
            { item: 'Marinara Sauce', quantity: 1, unit: 'jar', category: 'Pantry' },
            { item: 'Hoagie Rolls', quantity: 4, unit: 'count', category: 'Bakery' },
            { item: 'Mozzarella Cheese', quantity: 1, unit: 'cup', category: 'Dairy' },
        ],
        steps: [
            'Simmer meatballs in sauce for 15 mins.',
            'Load into rolls.',
            'Top with cheese.',
            'Broil for 2 mins to melt.',
            'Messy but worth it.'
        ],
        image: '/meals/meatball-subs.png',
        kidRating: 4.9,
        dadTip: 'Wrap bottom in foil to catch drips.',
        tags: ['Beef', 'Sandwich', 'Quick']
    },
    {
        id: '18',
        title: 'Fried Rice',
        time: 20,
        servings: 4,
        ingredients: [
            { item: 'Rice (cooked)', quantity: 3, unit: 'cups', category: 'Pantry' },
            { item: 'Eggs', quantity: 3, unit: 'count', category: 'Dairy' },
            { item: 'Frozen Peas/Carrots', quantity: 1, unit: 'bag', category: 'Frozen' },
            { item: 'Soy Sauce', quantity: 3, unit: 'tbsp', category: 'Pantry' },
            { item: 'Ham or Bacon', quantity: 0.5, unit: 'cup', category: 'Meat' },
        ],
        steps: [
            'Scramble eggs in pan, remove.',
            'Fry veggies and meat.',
            'Add cold rice and soy sauce.',
            'Fry until hot.',
            'Mix eggs back in.'
        ],
        image: '/meals/fried-rice.png',
        kidRating: 4.4,
        dadTip: 'Day-old rice works best. Plan ahead.',
        tags: ['Asian', 'Rice', 'One-Pot']
    },
    {
        id: '19',
        title: 'Ravioli Bake',
        time: 30,
        servings: 4,
        ingredients: [
            { item: 'Frozen Ravioli', quantity: 1, unit: 'bag', category: 'Frozen' },
            { item: 'Marinara Sauce', quantity: 1, unit: 'jar', category: 'Pantry' },
            { item: 'Mozzarella Cheese', quantity: 2, unit: 'cups', category: 'Dairy' },
            { item: 'Parmesan', quantity: 0.25, unit: 'cup', category: 'Dairy' },
        ],
        steps: [
            'Layer sauce, frozen ravioli, and cheese in baking dish.',
            'Repeat.',
            'Cover with foil, bake 400°F for 20 mins.',
            'Uncover, bake 10 mins.',
            'Like lasagna but zero effort.'
        ],
        image: '/meals/ravioli-bake.png',
        kidRating: 4.8,
        dadTip: 'Cheese ravioli is safest for picky eaters.',
        tags: ['Pasta', 'Vegetarian', 'Easy']
    },
    {
        id: '20',
        title: 'Chicken Caesar Salad',
        time: 15,
        servings: 4,
        ingredients: [
            { item: 'Romaine Lettuce', quantity: 2, unit: 'heads', category: 'Produce' },
            { item: 'Rotisserie Chicken', quantity: 1, unit: 'count', category: 'Meat' },
            { item: 'Caesar Dressing', quantity: 1, unit: 'bottle', category: 'Pantry' },
            { item: 'Croutons', quantity: 1, unit: 'bag', category: 'Pantry' },
            { item: 'Parmesan', quantity: 0.5, unit: 'cup', category: 'Dairy' },
        ],
        steps: [
            'Chop lettuce.',
            'Shred chicken.',
            'Toss everything in a big bowl.',
            'Serve.',
            'Yes, this counts as dinner.'
        ],
        image: '/meals/caesar-salad.png',
        kidRating: 3.8,
        dadTip: 'Let them put the croutons on. Kids love crunchy bread.',
        tags: ['Salad', 'Healthy', 'No-Cook']
    }
];

export const getRandomRecipes = (count: number, excludeIds: string[] = []): Recipe[] => {
    // Filter out excluded recipes
    let pool = RECIPES.filter(r => !excludeIds.includes(r.id));

    // If pool is empty or smaller than requested count, fallback to full pool (minus exclusions if possible, or just full pool)
    if (pool.length < count) {
        // If we excluded everything, just reset to full pool
        if (pool.length === 0) {
            pool = [...RECIPES];
        } else {
            // If we have some but not enough, add back from excluded to fill up
            const remaining = RECIPES.filter(r => excludeIds.includes(r.id));
            pool = [...pool, ...remaining];
        }
    }

    // Fisher-Yates Shuffle
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
};
