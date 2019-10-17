export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Auth = {
  user: User
}

export type DietPreferences = {
  meat?: Maybe<Scalars['Boolean']>
  dairy?: Maybe<Scalars['Boolean']>
  eggs?: Maybe<Scalars['Boolean']>
  lowSugar?: Maybe<Scalars['Boolean']>
  lowCarb?: Maybe<Scalars['Boolean']>
  lowFat?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  register: Auth
  login: Auth
  loginWithCookie: Auth
  logout: Void
  createRecipe: Recipe
  editRecipe: Recipe
  deleteRecipe: Scalars['String']
}

export type MutationRegisterArgs = {
  username: Scalars['String']
  password: Scalars['String']
  email: Scalars['String']
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type NutritionInfo = {
  calories: Scalars['Int']
  totalFat?: Maybe<Scalars['Int']>
  saturatedFat?: Maybe<Scalars['Int']>
  cholesterol?: Maybe<Scalars['Int']>
  sodium?: Maybe<Scalars['Int']>
  carbs?: Maybe<Scalars['Int']>
  dietaryFiber?: Maybe<Scalars['Int']>
  protein?: Maybe<Scalars['Int']>
  sugar?: Maybe<Scalars['Int']>
}

export type PrepInfo = {
  prep: Scalars['Int']
  cook: Scalars['Int']
  readyIn: Scalars['Int']
  servings: Scalars['Int']
}

export type Query = {
  user?: Maybe<User>
  recipes: Array<Recipe>
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type Recipe = {
  authorId: Scalars['String']
  reviews: Array<Review>
  photos: Array<Scalars['String']>
  name: Scalars['String']
  description: Scalars['String']
  groceryItemIds: Array<Scalars['String']>
  nutritionInfo: NutritionInfo
  prepInfo: PrepInfo
  directions: Array<Scalars['String']>
}

export type Review = {
  stars: Scalars['Float']
  description?: Maybe<Scalars['String']>
  date: Scalars['String']
  reviewerId: Scalars['String']
  upvotes: Scalars['Int']
}

export type User = {
  id: Scalars['String']
  profileImg?: Maybe<Scalars['String']>
  username: Scalars['String']
  email: Scalars['String']
  recipeIds: Array<Scalars['String']>
}

export type Void = {
  id: Scalars['String']
}

import { GraphQLResolveInfo } from 'graphql'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {}
  String: Scalars['String']
  User: User
  Recipe: Recipe
  Review: Review
  Float: Scalars['Float']
  Int: Scalars['Int']
  NutritionInfo: NutritionInfo
  PrepInfo: PrepInfo
  Mutation: {}
  Auth: Auth
  Void: Void
  Boolean: Scalars['Boolean']
  DietPreferences: DietPreferences
}

export type AuthResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Auth']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
}

export type DietPreferencesResolvers<
  ContextType = any,
  ParentType = ResolversTypes['DietPreferences']
> = {
  meat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  dairy?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  eggs?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  lowSugar?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  lowCarb?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  lowFat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Mutation']
> = {
  register?: Resolver<
    ResolversTypes['Auth'],
    ParentType,
    ContextType,
    MutationRegisterArgs
  >
  login?: Resolver<
    ResolversTypes['Auth'],
    ParentType,
    ContextType,
    MutationLoginArgs
  >
  loginWithCookie?: Resolver<ResolversTypes['Auth'], ParentType, ContextType>
  logout?: Resolver<ResolversTypes['Void'], ParentType, ContextType>
  createRecipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType>
  editRecipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType>
  deleteRecipe?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type NutritionInfoResolvers<
  ContextType = any,
  ParentType = ResolversTypes['NutritionInfo']
> = {
  calories?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalFat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  saturatedFat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  cholesterol?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  sodium?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  carbs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  dietaryFiber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  protein?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  sugar?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
}

export type PrepInfoResolvers<
  ContextType = any,
  ParentType = ResolversTypes['PrepInfo']
> = {
  prep?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  cook?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  readyIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  servings?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Query']
> = {
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    QueryUserArgs
  >
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>
}

export type RecipeResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Recipe']
> = {
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>
  photos?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  groceryItemIds?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  nutritionInfo?: Resolver<
    ResolversTypes['NutritionInfo'],
    ParentType,
    ContextType
  >
  prepInfo?: Resolver<ResolversTypes['PrepInfo'], ParentType, ContextType>
  directions?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
}

export type ReviewResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Review']
> = {
  stars?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  reviewerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  upvotes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  profileImg?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  recipeIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
}

export type VoidResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Void']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>
  DietPreferences?: DietPreferencesResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  NutritionInfo?: NutritionInfoResolvers<ContextType>
  PrepInfo?: PrepInfoResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Recipe?: RecipeResolvers<ContextType>
  Review?: ReviewResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Void?: VoidResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
