import { Schema, Model, model, Document } from 'mongoose'
import { Recipe } from '../sharedTypes'

export const RecipeSchema = new Schema({
  authorId: String,
  reviews: [
    {
      stars: Number,
      description: String,
      date: String,
      reviewerId: String,
      upvotes: Number
    }
  ],
  photos: [{ type: String, required: true }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  groceryItemIds: [{ type: String, required: true }],
  nutritionInfo: {
    calories: { type: Number, required: true },
    totalFat: { type: Number, required: false },
    saturatedFat: { type: Number, required: false },
    cholesterol: { type: Number, required: false },
    sodium: { type: Number, required: false },
    carbs: { type: Number, required: false },
    dietaryFiber: { type: Number, required: false },
    protein: { type: Number, required: false },
    sugar: { type: Number, required: false }
  },
  prepInfo: {
    prep: { type: Number, required: true },
    cook: { type: Number, required: true },
    readyIn: { type: Number, required: true },
    servings: { type: Number, required: true }
  },
  directions: [{ type: String, required: true }]
})

// type this shit for .toObject you ignorant slut
export const RecipeModel: Model<Document & Recipe> = model(
  'Recipe',
  RecipeSchema,
  'Recipes'
)
