import { useEffect, useState } from 'react';
import { Recipe } from '../../interfaces/Recipe';
import testRecipes, { findRecipe } from '@/app/test/TestRecipe';

interface RecipeDetailProps {
    params: {
        id: number;
    };
}

const RecipeDetail = ({ params }: RecipeDetailProps) => {
    const [id, setId] = useState<number>(params.id);
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        const _recipe = findRecipe(id);
        setRecipe(_recipe)
    }, [])


    if (!recipe) {
        return <div className="container mx-auto p-4">Recipe not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-700 mb-4">{recipe.description}</p>
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside mb-4">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <p className="text-gray-700">{recipe.instructions}</p>
        </div>
    );
}

export default RecipeDetail;
