/* tslint:disable */
/* noinspection */
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

export type Boo = {
  __typename?: 'Boo'
  output: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  register: Auth
  login: Auth
  loginWithCookie: Auth
  logout: Void
  buySellStock: Scalars['String']
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

export type MutationBuySellStockArgs = {
  amount: Scalars['Int']
  symbol: Scalars['String']
}

export type PortfolioStock = {
  __typename?: 'PortfolioStock'
  price: Scalars['Float']
  symbol: Scalars['String']
  name: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  user?: Maybe<User>
  purchasedStocks: Array<PortfolioStock>
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type SimpleStock = {
  __typename?: 'SimpleStock'
  purchasePriceTotal: Scalars['Float']
  symbol: Scalars['String']
  name: Scalars['String']
  amount: Scalars['Int']
  activity: Array<StockActivity>
}

export type StockActivity = {
  __typename?: 'StockActivity'
  date: Scalars['String']
  purchase: Scalars['Int']
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  profileImg?: Maybe<Scalars['String']>
  username: Scalars['String']
  email: Scalars['String']
  balance: Scalars['Float']
  purchasedStocks: Array<SimpleStock>
}

export type Void = {
  __typename?: 'Void'
  id: Scalars['String']
}
import {GraphQLResolveInfo} from 'graphql'

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

    purchasedStocks?: PurchasedStocksResolver<PortfolioStock[],
      TypeParent,
      TContext
    >
  }

  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, UserArgs>
  export interface UserArgs {
    id: string
  }

  export type PurchasedStocksResolver<R = PortfolioStock[],
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

    balance?: BalanceResolver<number, TypeParent, TContext>

    purchasedStocks?: PurchasedStocksResolver<SimpleStock[],
      TypeParent,
      TContext>
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
  export type BalanceResolver<R = number,
    Parent = User,
    TContext = {}> = Resolver<R, Parent, TContext>
  export type PurchasedStocksResolver<R = SimpleStock[],
    Parent = User,
    TContext = {}> = Resolver<R, Parent, TContext>
}

export namespace SimpleStockResolvers {
  export interface Resolvers<TContext = {}, TypeParent = SimpleStock> {
    purchasePriceTotal?: PurchasePriceTotalResolver<number,
      TypeParent,
      TContext>

    symbol?: SymbolResolver<string, TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>

    amount?: AmountResolver<number, TypeParent, TContext>

    activity?: ActivityResolver<StockActivity[], TypeParent, TContext>
  }

  export type PurchasePriceTotalResolver<
    R = number,
    Parent = SimpleStock,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type SymbolResolver<
    R = string,
    Parent = SimpleStock,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = string,
    Parent = SimpleStock,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type AmountResolver<
    R = number,
    Parent = SimpleStock,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type ActivityResolver<
    R = StockActivity[],
    Parent = SimpleStock,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace StockActivityResolvers {
  export interface Resolvers<TContext = {}, TypeParent = StockActivity> {
    date?: DateResolver<string, TypeParent, TContext>

    purchase?: PurchaseResolver<number, TypeParent, TContext>
  }

  export type DateResolver<
    R = string,
    Parent = StockActivity,
    TContext = {}
  > = Resolver<R, Parent, TContext>
  export type PurchaseResolver<
    R = number,
    Parent = StockActivity,
    TContext = {}
  > = Resolver<R, Parent, TContext>
}

export namespace PortfolioStockResolvers {
  export interface Resolvers<TContext = {}, TypeParent = PortfolioStock> {
    price?: PriceResolver<number, TypeParent, TContext>

    symbol?: SymbolResolver<string, TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>
  }

  export type PriceResolver<R = number,
    Parent = PortfolioStock,
    TContext = {}> = Resolver<R, Parent, TContext>
  export type SymbolResolver<R = string,
    Parent = PortfolioStock,
    TContext = {}> = Resolver<R, Parent, TContext>
  export type NameResolver<R = string,
    Parent = PortfolioStock,
    TContext = {}> = Resolver<R, Parent, TContext>
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    register?: RegisterResolver<Auth, TypeParent, TContext>

    login?: LoginResolver<Auth, TypeParent, TContext>

    loginWithCookie?: LoginWithCookieResolver<Auth, TypeParent, TContext>

    logout?: LogoutResolver<Void, TypeParent, TContext>

    buySellStock?: BuySellStockResolver<string, TypeParent, TContext>
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
  export type BuySellStockResolver<
    R = string,
    Parent = {},
    TContext = {}> = Resolver<R, Parent, TContext, BuySellStockArgs>

  export interface BuySellStockArgs {
    amount: number

    symbol: string
  }
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

export namespace BooResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Boo> {
    output?: OutputResolver<string, TypeParent, TContext>
  }

  export type OutputResolver<
    R = string,
    Parent = Boo,
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
  SimpleStock?: SimpleStockResolvers.Resolvers<TContext>
  StockActivity?: StockActivityResolvers.Resolvers<TContext>
  PortfolioStock?: PortfolioStockResolvers.Resolvers<TContext>
  Mutation?: MutationResolvers.Resolvers<TContext>
  Auth?: AuthResolvers.Resolvers<TContext>
  Void?: VoidResolvers.Resolvers<TContext>
  Boo?: BooResolvers.Resolvers<TContext>
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
