'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Recipe } from '../interfaces/Recipe';
import testRecipes from '../test/TestRecipe';

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>();

    useEffect(() => {
        setRecipes(testRecipes);
    }, [])

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Recipe List</h1>
        <ul className="space-y-4">
          {recipes && recipes.map((recipe) => (
            <li key={recipe.id} className="p-4 border rounded-lg hover:bg-gray-100 transition">
              <Link href={`/recipe/${recipe.id}`} className="block">
                <h2 className="text-2xl font-semibold">{recipe.title}</h2>
                <p className="text-gray-600">{recipe.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default Home;