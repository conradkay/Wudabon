export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type Auth = {
  user: User
}

export type Comment = {
  comment: Scalars['String']
  dateAdded: Scalars['Date']
  lastEdited?: Maybe<Scalars['Date']>
  id: Scalars['String']
}

export type DeleteReturn = {
  id: Scalars['String']
}

export type List = {
  taskIds: Array<Scalars['String']>
  name: Scalars['String']
  id: Scalars['String']
}

export type ListInfo = {
  name?: Maybe<Scalars['String']>
  completed?: Maybe<Scalars['Boolean']>
}

export type ListInput = {
  taskIds?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
}

export type ListMerge = {
  project: Project
  list?: Maybe<List>
}

export type Mutation = {
  createTask: TaskMerge
  editTask: TaskMerge
  deleteTask: TaskMerge
  dragTask: TaskMerge
  register: Auth
  login: Auth
  loginWithCookie: Auth
  logout: Void
  createProject: Project
  editProject: Project
  deleteProject: DeleteReturn
  joinProject: Project
  leaveProject: DeleteReturn
  createList: ListMerge
  editList: ListMerge
  deleteList: DeleteReturn
  removeMemberFromProject: Project
  setComment: Task
  setSubtask: Task
}

export type MutationCreateTaskArgs = {
  projId: Scalars['String']
  taskInfo: TaskInput
  listId: Scalars['String']
}

export type MutationEditTaskArgs = {
  projId: Scalars['String']
  task: TaskInput
  taskId: Scalars['String']
}

export type MutationDeleteTaskArgs = {
  projId: Scalars['String']
  id: Scalars['String']
}

export type MutationDragTaskArgs = {
  oldListId: Scalars['String']
  newListId: Scalars['String']
  newIndex: Scalars['Int']
  id: Scalars['String']
  newProgress: Scalars['Int']
  projectId: Scalars['String']
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

export type MutationCreateProjectArgs = {
  name: Scalars['String']
}

export type MutationEditProjectArgs = {
  id: Scalars['String']
  newProj: ProjectInput
}

export type MutationDeleteProjectArgs = {
  id: Scalars['String']
}

export type MutationJoinProjectArgs = {
  projectId: Scalars['String']
}

export type MutationLeaveProjectArgs = {
  projectId: Scalars['String']
}

export type MutationCreateListArgs = {
  projId: Scalars['String']
  name: Scalars['String']
}

export type MutationEditListArgs = {
  listId: Scalars['String']
  projId: Scalars['String']
  newList: ListInput
}

export type MutationDeleteListArgs = {
  projId: Scalars['String']
  id: Scalars['String']
}

export type MutationRemoveMemberFromProjectArgs = {
  projectId: Scalars['String']
  userId: Scalars['String']
}

export type MutationSetCommentArgs = {
  projId: Scalars['String']
  taskId: Scalars['String']
  commentId: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type MutationSetSubtaskArgs = {
  projId: Scalars['String']
  taskId: Scalars['String']
  subtaskId: Scalars['String']
  info?: Maybe<SubtaskInfo>
}

export type Profile = {
  id: Scalars['String']
  profileImg?: Maybe<Scalars['String']>
  username: Scalars['String']
  email: Scalars['String']
  projects: Array<Scalars['String']>
}

export type Project = {
  ownerId: Scalars['String']
  name: Scalars['String']
  id: Scalars['String']
  lists: Array<List>
  users: Array<Scalars['String']>
  tasks: Array<Task>
  isPrivate: Scalars['Boolean']
}

export type ProjectInput = {
  name: Scalars['String']
}

export type Query = {
  projects: Array<Maybe<Project>>
  projectById?: Maybe<Project>
  user?: Maybe<User>
}

export type QueryProjectsArgs = {
  ids: Array<Scalars['String']>
}

export type QueryProjectByIdArgs = {
  id: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type Subtask = {
  name: Scalars['String']
  completed: Scalars['Boolean']
  id: Scalars['String']
}

export type SubtaskInfo = {
  name: Scalars['String']
  completed: Scalars['Boolean']
}

export type Task = {
  security: TaskSecurity
  progress: Scalars['Int']
  id: Scalars['String']
  name: Scalars['String']
  points: Scalars['Int']
  timeWorkedOn: Scalars['Int']
  color: Scalars['String']
  dueDate?: Maybe<Scalars['Date']>
  startDate?: Maybe<Scalars['Date']>
  comments: Array<Comment>
  subTasks: Array<Subtask>
  recurrance?: Maybe<TaskRecurrance>
}

export type TaskInput = {
  name?: Maybe<Scalars['String']>
  points?: Maybe<Scalars['Int']>
  dueDate?: Maybe<Scalars['Date']>
  recurrance?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
}

export type TaskMerge = {
  project: Project
  task?: Maybe<Task>
}

export type TaskRecurrance = {
  interval: Scalars['Int']
  nextDue: Scalars['Date']
}

export type TaskSecurity = {
  public: Scalars['Boolean']
  assignedUsers: Array<Scalars['String']>
}

export type User = {
  id: Scalars['String']
  profileImg?: Maybe<Scalars['String']>
  username: Scalars['String']
  email: Scalars['String']
  projects: Array<Project>
}

export type Void = {
  message: Scalars['String']
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from 'graphql'

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
  Project: Project
  List: List
  Task: Task
  TaskSecurity: TaskSecurity
  Boolean: Scalars['Boolean']
  Int: Scalars['Int']
  Date: Scalars['Date']
  Comment: Comment
  Subtask: Subtask
  TaskRecurrance: TaskRecurrance
  User: User
  Mutation: {}
  TaskInput: TaskInput
  TaskMerge: TaskMerge
  Auth: Auth
  Void: Void
  ProjectInput: ProjectInput
  DeleteReturn: DeleteReturn
  ListMerge: ListMerge
  ListInput: ListInput
  SubtaskInfo: SubtaskInfo
  Profile: Profile
  ListInfo: ListInfo
}

export type AuthResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Auth']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
}

export type CommentResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Comment']
> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  dateAdded?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  lastEdited?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DeleteReturnResolvers<
  ContextType = any,
  ParentType = ResolversTypes['DeleteReturn']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type ListResolvers<
  ContextType = any,
  ParentType = ResolversTypes['List']
> = {
  taskIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type ListMergeResolvers<
  ContextType = any,
  ParentType = ResolversTypes['ListMerge']
> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  list?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Mutation']
> = {
  createTask?: Resolver<
    ResolversTypes['TaskMerge'],
    ParentType,
    ContextType,
    MutationCreateTaskArgs
  >
  editTask?: Resolver<
    ResolversTypes['TaskMerge'],
    ParentType,
    ContextType,
    MutationEditTaskArgs
  >
  deleteTask?: Resolver<
    ResolversTypes['TaskMerge'],
    ParentType,
    ContextType,
    MutationDeleteTaskArgs
  >
  dragTask?: Resolver<
    ResolversTypes['TaskMerge'],
    ParentType,
    ContextType,
    MutationDragTaskArgs
  >
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
  createProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    MutationCreateProjectArgs
  >
  editProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    MutationEditProjectArgs
  >
  deleteProject?: Resolver<
    ResolversTypes['DeleteReturn'],
    ParentType,
    ContextType,
    MutationDeleteProjectArgs
  >
  joinProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    MutationJoinProjectArgs
  >
  leaveProject?: Resolver<
    ResolversTypes['DeleteReturn'],
    ParentType,
    ContextType,
    MutationLeaveProjectArgs
  >
  createList?: Resolver<
    ResolversTypes['ListMerge'],
    ParentType,
    ContextType,
    MutationCreateListArgs
  >
  editList?: Resolver<
    ResolversTypes['ListMerge'],
    ParentType,
    ContextType,
    MutationEditListArgs
  >
  deleteList?: Resolver<
    ResolversTypes['DeleteReturn'],
    ParentType,
    ContextType,
    MutationDeleteListArgs
  >
  removeMemberFromProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    MutationRemoveMemberFromProjectArgs
  >
  setComment?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    MutationSetCommentArgs
  >
  setSubtask?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    MutationSetSubtaskArgs
  >
}

export type ProfileResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Profile']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  profileImg?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  projects?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
}

export type ProjectResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Project']
> = {
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType>
  users?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Query']
> = {
  projects?: Resolver<
    Array<Maybe<ResolversTypes['Project']>>,
    ParentType,
    ContextType,
    QueryProjectsArgs
  >
  projectById?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    QueryProjectByIdArgs
  >
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    QueryUserArgs
  >
}

export type SubtaskResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Subtask']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type TaskResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Task']
> = {
  security?: Resolver<ResolversTypes['TaskSecurity'], ParentType, ContextType>
  progress?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  timeWorkedOn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>
  subTasks?: Resolver<Array<ResolversTypes['Subtask']>, ParentType, ContextType>
  recurrance?: Resolver<
    Maybe<ResolversTypes['TaskRecurrance']>,
    ParentType,
    ContextType
  >
}

export type TaskMergeResolvers<
  ContextType = any,
  ParentType = ResolversTypes['TaskMerge']
> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>
}

export type TaskRecurranceResolvers<
  ContextType = any,
  ParentType = ResolversTypes['TaskRecurrance']
> = {
  interval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  nextDue?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
}

export type TaskSecurityResolvers<
  ContextType = any,
  ParentType = ResolversTypes['TaskSecurity']
> = {
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  assignedUsers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
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
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
}

export type VoidResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Void']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  Date?: GraphQLScalarType
  DeleteReturn?: DeleteReturnResolvers<ContextType>
  List?: ListResolvers<ContextType>
  ListMerge?: ListMergeResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Profile?: ProfileResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subtask?: SubtaskResolvers<ContextType>
  Task?: TaskResolvers<ContextType>
  TaskMerge?: TaskMergeResolvers<ContextType>
  TaskRecurrance?: TaskRecurranceResolvers<ContextType>
  TaskSecurity?: TaskSecurityResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Void?: VoidResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
