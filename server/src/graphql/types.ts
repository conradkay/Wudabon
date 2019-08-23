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

export type Boo = {
  output: Scalars['String']
}

export type Mutation = {
  register: Auth
  login: Auth
  loginWithCookie: Auth
  logout: Void
  sellStock: Scalars['String']
  buyStock: Scalars['String']
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

export type MutationSellStockArgs = {
  amount: Scalars['Int']
  symbol: Scalars['String']
}

export type MutationBuyStockArgs = {
  amount: Scalars['Int']
  symbol: Scalars['String']
}

export type Query = {
  user?: Maybe<User>
  purchasedStocks: SimpleStock[]
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type SimpleStock = {
  purchasePrice: Scalars['Int']
  purchaseDate: Scalars['String']
  symbol: Scalars['String']
  name: Scalars['String']
  amount: Scalars['Int']
  activity: StockActivity[]
}

export type StockActivity = {
  date: Scalars['String']
  purchase: Scalars['Int']
}

export type User = {
  id: Scalars['String']
  profileImg?: Maybe<Scalars['String']>
  username: Scalars['String']
  email: Scalars['String']
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
  SimpleStock: SimpleStock
  Int: Scalars['Int']
  StockActivity: StockActivity
  Mutation: {}
  Auth: Auth
  Void: Void
  Boolean: Scalars['Boolean']
  Boo: Boo
}

export type AuthResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Auth']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
}

export type BooResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Boo']
> = {
  output?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
  sellStock?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    MutationSellStockArgs
  >
  buyStock?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    MutationBuyStockArgs
  >
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
  purchasedStocks?: Resolver<
    Array<ResolversTypes['SimpleStock']>,
    ParentType,
    ContextType
  >
}

export type SimpleStockResolvers<
  ContextType = any,
  ParentType = ResolversTypes['SimpleStock']
> = {
  purchasePrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  purchaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  activity?: Resolver<
    Array<ResolversTypes['StockActivity']>,
    ParentType,
    ContextType
  >
}

export type StockActivityResolvers<
  ContextType = any,
  ParentType = ResolversTypes['StockActivity']
> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  purchase?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
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
}

export type VoidResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Void']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>
  Boo?: BooResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  SimpleStock?: SimpleStockResolvers<ContextType>
  StockActivity?: StockActivityResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Void?: VoidResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
