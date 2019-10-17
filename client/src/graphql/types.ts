/* tslint:disable */
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  objectId: String
}

export type Auth = {
  __typename?: 'Auth'
  user: User
}

export type DietPreferences = {
  __typename?: 'DietPreferences'
  meat?: Maybe<Scalars['Boolean']>
  dairy?: Maybe<Scalars['Boolean']>
  eggs?: Maybe<Scalars['Boolean']>
  lowSugar?: Maybe<Scalars['Boolean']>
  lowCarb?: Maybe<Scalars['Boolean']>
  lowFat?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
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
  __typename?: 'NutritionInfo'
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
  __typename?: 'PrepInfo'
  prep: Scalars['Int']
  cook: Scalars['Int']
  readyIn: Scalars['Int']
  servings: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  user?: Maybe<User>
  recipes: Array<Recipe>
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type Recipe = {
  __typename?: 'Recipe'
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
  __typename?: 'Review'
  stars: Scalars['Float']
  description?: Maybe<Scalars['String']>
  date: Scalars['String']
  reviewerId: Scalars['String']
  upvotes: Scalars['Int']
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  profileImg?: Maybe<Scalars['String']>
  username: Scalars['String']
  email: Scalars['String']
  recipeIds: Array<Scalars['String']>
}

export type Void = {
  __typename?: 'Void'
  id: Scalars['String']
}
import { GraphQLResolveInfo } from 'graphql'

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export namespace QueryResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    user?: UserResolver<Maybe<User>, TypeParent, TContext>

    recipes?: RecipesResolver<Recipe[], TypeParent, TContext>
  }

  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, UserArgs>
  export interface UserArgs {
    id: string
  }

  export type RecipesResolver<
    R = Recipe[],
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace UserResolvers {
  export interface Resolvers<TContext = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>

    profileImg?: ProfileImgResolver<Maybe<string>, TypeParent, TContext>

    username?: UsernameResolver<string, TypeParent, TContext>

    email?: EmailResolver<string, TypeParent, TContext>

    recipeIds?: RecipeIdsResolver<string[], TypeParent, TContext>
  }

  export type IdResolver<R = string, Parent = User, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >
  export type ProfileImgResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type UsernameResolver<
    R = string,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type EmailResolver<
    R = string,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type RecipeIdsResolver<
    R = string[],
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace RecipeResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Recipe> {
    authorId?: AuthorIdResolver<string, TypeParent, TContext>

    reviews?: ReviewsResolver<Review[], TypeParent, TContext>

    photos?: PhotosResolver<string[], TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>

    description?: DescriptionResolver<string, TypeParent, TContext>

    groceryItemIds?: GroceryItemIdsResolver<string[], TypeParent, TContext>

    nutritionInfo?: NutritionInfoResolver<NutritionInfo, TypeParent, TContext>

    prepInfo?: PrepInfoResolver<PrepInfo, TypeParent, TContext>

    directions?: DirectionsResolver<string[], TypeParent, TContext>
  }

  export type AuthorIdResolver<
    R = string,
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type ReviewsResolver<
    R = Review[],
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type PhotosResolver<
    R = string[],
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = string,
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DescriptionResolver<
    R = string,
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type GroceryItemIdsResolver<
    R = string[],
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type NutritionInfoResolver<
    R = NutritionInfo,
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type PrepInfoResolver<
    R = PrepInfo,
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DirectionsResolver<
    R = string[],
    Parent = Recipe,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace ReviewResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Review> {
    stars?: StarsResolver<number, TypeParent, TContext>

    description?: DescriptionResolver<Maybe<string>, TypeParent, TContext>

    date?: DateResolver<string, TypeParent, TContext>

    reviewerId?: ReviewerIdResolver<string, TypeParent, TContext>

    upvotes?: UpvotesResolver<number, TypeParent, TContext>
  }

  export type StarsResolver<
    R = number,
    Parent = Review,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DescriptionResolver<
    R = Maybe<string>,
    Parent = Review,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DateResolver<
    R = string,
    Parent = Review,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type ReviewerIdResolver<
    R = string,
    Parent = Review,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type UpvotesResolver<
    R = number,
    Parent = Review,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace NutritionInfoResolvers {
  export interface Resolvers<TContext = {}, TypeParent = NutritionInfo> {
    calories?: CaloriesResolver<number, TypeParent, TContext>

    totalFat?: TotalFatResolver<Maybe<number>, TypeParent, TContext>

    saturatedFat?: SaturatedFatResolver<Maybe<number>, TypeParent, TContext>

    cholesterol?: CholesterolResolver<Maybe<number>, TypeParent, TContext>

    sodium?: SodiumResolver<Maybe<number>, TypeParent, TContext>

    carbs?: CarbsResolver<Maybe<number>, TypeParent, TContext>

    dietaryFiber?: DietaryFiberResolver<Maybe<number>, TypeParent, TContext>

    protein?: ProteinResolver<Maybe<number>, TypeParent, TContext>

    sugar?: SugarResolver<Maybe<number>, TypeParent, TContext>
  }

  export type CaloriesResolver<
    R = number,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type TotalFatResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type SaturatedFatResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type CholesterolResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type SodiumResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type CarbsResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DietaryFiberResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type ProteinResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type SugarResolver<
    R = Maybe<number>,
    Parent = NutritionInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace PrepInfoResolvers {
  export interface Resolvers<TContext = {}, TypeParent = PrepInfo> {
    prep?: PrepResolver<number, TypeParent, TContext>

    cook?: CookResolver<number, TypeParent, TContext>

    readyIn?: ReadyInResolver<number, TypeParent, TContext>

    servings?: ServingsResolver<number, TypeParent, TContext>
  }

  export type PrepResolver<
    R = number,
    Parent = PrepInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type CookResolver<
    R = number,
    Parent = PrepInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type ReadyInResolver<
    R = number,
    Parent = PrepInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type ServingsResolver<
    R = number,
    Parent = PrepInfo,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    register?: RegisterResolver<Auth, TypeParent, TContext>

    login?: LoginResolver<Auth, TypeParent, TContext>

    loginWithCookie?: LoginWithCookieResolver<Auth, TypeParent, TContext>

    logout?: LogoutResolver<Void, TypeParent, TContext>

    createRecipe?: CreateRecipeResolver<Recipe, TypeParent, TContext>

    editRecipe?: EditRecipeResolver<Recipe, TypeParent, TContext>

    deleteRecipe?: DeleteRecipeResolver<string, TypeParent, TContext>
  }

  export type RegisterResolver<R = Auth, Parent = {}, TContext = {}> = Resolver<
    R,
    Parent,
    TContext,
    RegisterArgs
  >
  export interface RegisterArgs {
    username: string

    password: string

    email: string
  }

  export type LoginResolver<R = Auth, Parent = {}, TContext = {}> = Resolver<
    R,
    Parent,
    TContext,
    LoginArgs
  >
  export interface LoginArgs {
    email: string

    password: string
  }

  export type LoginWithCookieResolver<
    R = Auth,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type LogoutResolver<R = Void, Parent = {}, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >
  export type CreateRecipeResolver<
    R = Recipe,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type EditRecipeResolver<
    R = Recipe,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DeleteRecipeResolver<
    R = string,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace AuthResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Auth> {
    user?: UserResolver<User, TypeParent, TContext>
  }

  export type UserResolver<R = User, Parent = Auth, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >
}

export namespace VoidResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Void> {
    id?: IdResolver<string, TypeParent, TContext>
  }

  export type IdResolver<R = string, Parent = Void, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >
}

export namespace DietPreferencesResolvers {
  export interface Resolvers<TContext = {}, TypeParent = DietPreferences> {
    meat?: MeatResolver<Maybe<boolean>, TypeParent, TContext>

    dairy?: DairyResolver<Maybe<boolean>, TypeParent, TContext>

    eggs?: EggsResolver<Maybe<boolean>, TypeParent, TContext>

    lowSugar?: LowSugarResolver<Maybe<boolean>, TypeParent, TContext>

    lowCarb?: LowCarbResolver<Maybe<boolean>, TypeParent, TContext>

    lowFat?: LowFatResolver<Maybe<boolean>, TypeParent, TContext>
  }

  export type MeatResolver<
    R = Maybe<boolean>,
    Parent = DietPreferences,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type DairyResolver<
    R = Maybe<boolean>,
    Parent = DietPreferences,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type EggsResolver<
    R = Maybe<boolean>,
    Parent = DietPreferences,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type LowSugarResolver<
    R = Maybe<boolean>,
    Parent = DietPreferences,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type LowCarbResolver<
    R = Maybe<boolean>,
    Parent = DietPreferences,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type LowFatResolver<
    R = Maybe<boolean>,
    Parent = DietPreferences,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string
}

export type IResolvers<TContext = {}> = {
  Query?: QueryResolvers.Resolvers<TContext>
  User?: UserResolvers.Resolvers<TContext>
  Recipe?: RecipeResolvers.Resolvers<TContext>
  Review?: ReviewResolvers.Resolvers<TContext>
  NutritionInfo?: NutritionInfoResolvers.Resolvers<TContext>
  PrepInfo?: PrepInfoResolvers.Resolvers<TContext>
  Mutation?: MutationResolvers.Resolvers<TContext>
  Auth?: AuthResolvers.Resolvers<TContext>
  Void?: VoidResolvers.Resolvers<TContext>
  DietPreferences?: DietPreferencesResolvers.Resolvers<TContext>
} & { [typeName: string]: never }

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>
  include?: IncludeDirectiveResolver<Result>
  deprecated?: DeprecatedDirectiveResolver<Result>
} & { [directiveName: string]: never }
export type UserFieldsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'profileImg' | 'username' | 'email'
>

export type LoginMutationVariables = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'Auth' } & {
    user: { __typename?: 'User' } & UserFieldsFragment
  }
}

export type RegisterMutationVariables = {
  username: Scalars['String']
  password: Scalars['String']
  email: Scalars['String']
}

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'Auth' } & {
    user: { __typename?: 'User' } & UserFieldsFragment
  }
}

export type LoginWithCookieMutationVariables = {}

export type LoginWithCookieMutation = { __typename?: 'Mutation' } & {
  loginWithCookie: { __typename?: 'Auth' } & {
    user: { __typename?: 'User' } & UserFieldsFragment
  }
}

export type LogoutMutationVariables = {}

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout: { __typename?: 'Void' } & Pick<Void, 'id'>
}

export type UserQueryVariables = {
  id: Scalars['String']
}

export type UserQuery = { __typename?: 'Query' } & {
  user: Maybe<{ __typename?: 'User' } & UserFieldsFragment>
}
