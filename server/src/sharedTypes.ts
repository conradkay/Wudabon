export type Review = {
  stars: number // hould this just be 1-10?
  description?: string // can be just a star review
  date: string
  reviewerId: string
  upvotes: number
}

// all per serving and optional
export type NutritionInfo = {
  calories?: number
  totalFat?: number
  saturatedFat?: number
  cholesterol?: number
  sodium?: number
  carbs?: number
  dietaryFiber?: number
  protein?: number
  sugar?: number

  // maybe do vitamins and minerals
}

export type PrepInfo = {
  prep: number
  cook: number
  readyIn: number
  servings: number
}

export type Recipe = {
  authorId: string
  reviews: Review[]
  photos: string[]

  name: string
  description: string

  groceryItemIds: string[] // how will we implement this, a search?
  nutritionInfo: NutritionInfo

  prepInfo: PrepInfo

  directions: string[] // could make more complicated
}

export type DietPreferences = {
  meat?: boolean
  dairy?: boolean
  eggs?: boolean
  lowSugar?: boolean
  lowCarb?: boolean
  lowFat?: boolean
}

export type User = {
  id: string
  profileImg?: string
  username: string
  email: string
  password?: string // for mongoose type

  recipeIds: string[]
}

export type Auth = {
  user: User
}

// REQUESTS AND RESPONSE API TYPES
export type LoginReq = {
  email: string
  password: string
}
export type LoginRes = {
  user: User
}

export type RegisterReq = {
  username: string
  password: string
  email: string
}
export type RegisterRes = {
  user: User
}

export type UserReq = {
  id: string
}
export type UserRes = {
  user: User
}

export type LogoutReq = { id: string }
export type LogoutRes = { id: string }

export type RecipeReq = { id: string }
export type RecipeRes = { recipe: Recipe | null }

export type CreateRecipeReq = {
  recipe: Recipe
}
export type CreateRecipeRes = {
  recipe: Recipe
}

export type DeleteRecipeReq = { id: string }
export type DeleteRecipeRes = { id: string }

export type EditRecipeReq = {
  newRecipeData: Partial<Recipe>
  id: string
}
export type EditRecipeRes = {
  recipe: Recipe
}
