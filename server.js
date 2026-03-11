const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
let recipes = [
  {
    _id: '1',
    name: 'Spaghetti Carbonara',
    ingredients: '400g spaghetti, 200g pancetta, 4 eggs, 100g Parmesan cheese, Black pepper, Salt',
    time: 30,
    category: 'dinner',
    instructions: '1. Cook spaghetti according to package directions.\n2. Fry pancetta until crispy.\n3. Beat eggs with Parmesan cheese.\n4. Drain pasta and mix with pancetta.\n5. Add egg mixture and toss quickly.\n6. Season with black pepper and serve.'
  },
  {
    _id: '2',
    name: 'Classic Pancakes',
    ingredients: '2 cups flour, 2 eggs, 1.5 cups milk, 2 tbsp sugar, 2 tsp baking powder, 1/2 tsp salt, Butter for cooking',
    time: 20,
    category: 'breakfast',
    instructions: '1. Mix dry ingredients in a bowl.\n2. Whisk eggs and milk in another bowl.\n3. Combine wet and dry ingredients.\n4. Heat butter in a pan.\n5. Pour batter and cook until bubbles form.\n6. Flip and cook until golden.'
  },
  {
    _id: '3',
    name: 'Greek Salad',
    ingredients: '2 tomatoes, 1 cucumber, 1 red onion, 200g feta cheese, Kalamata olives, Olive oil, Oregano, Salt, Pepper',
    time: 15,
    category: 'lunch',
    instructions: '1. Chop tomatoes and cucumber.\n2. Slice red onion thinly.\n3. Combine vegetables in a bowl.\n4. Add crumbled feta cheese and olives.\n5. Drizzle with olive oil.\n6. Season with oregano, salt, and pepper.'
  }
];

let nextId = 4;

// Routes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r._id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  res.json(recipe);
});

app.post('/api/recipes', (req, res) => {
  const newRecipe = {
    _id: nextId.toString(),
    ...req.body
  };
  recipes.push(newRecipe);
  nextId++;
  res.status(201).json(newRecipe);
});

app.put('/api/recipes/:id', (req, res) => {
  const index = recipes.findIndex(r => r._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  recipes[index] = { _id: req.params.id, ...req.body };
  res.json(recipes[index]);
});

app.delete('/api/recipes/:id', (req, res) => {
  const index = recipes.findIndex(r => r._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  recipes.splice(index, 1);
  res.json({ message: 'Recipe deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
