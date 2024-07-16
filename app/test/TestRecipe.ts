import { Recipe } from "../interfaces/Recipe";

const testRecipes: Recipe[] = [
  { id: 1, title: 'Spaghetti Carbonara', description: 'Delicious spaghetti with creamy sauce.', ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'], instructions: '1. Boil pasta. 2. Cook pancetta. 3. Mix eggs and cheese. 4. Combine all with pasta.' },
  { id: 2, title: 'Chicken Curry', description: 'Spicy and savory chicken curry.', ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions', 'Garlic'], instructions: '1. Cook onions and garlic. 2. Add chicken and curry powder. 3. Pour in coconut milk and simmer.' },
  { id: 3, title: 'Beef Stew', description: 'Hearty beef stew with vegetables.', ingredients: ['Beef', 'Carrots', 'Potatoes', 'Onions', 'Beef Broth'], instructions: '1. Brown beef. 2. Add vegetables and broth. 3. Simmer until tender.' },
];


export const findRecipe = (id:number) => testRecipes.find((recipe) => recipe.id === id);

export default testRecipes;