import { UserProps, comparePassword } from './../../models/User'
import bcrypt from 'bcryptjs'
import { MutationResolvers } from '../../graphql/types'
import { UserModel } from '../../models/User'
import { ProjectModel } from '../../models/Project'
import { taskObjects, projectData } from '../../data'
import jsonwebtoken from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'
import uuid from 'uuid'

const loginWithCookie: MutationResolvers['loginWithCookie'] = async (
  parent,
  obj,
  context
) => {
  if (!context.userId) {
    throw new AuthenticationError('no token man')
  }

  const user: UserProps | null = await UserModel.findOne({
    id: context.userId.id
  })

  if (!user) {
    throw new AuthenticationError('Token Corrupt!')
  }

  const projects = await ProjectModel.find({ id: user.projects })

  return {
    user: {
      ...(user as any).toObject(),
      projects: projects.map((proj) => proj.toObject())
    }
  }
}

const login: MutationResolvers['login'] = async (parent, obj, context) => {
  const user = await UserModel.findOne({ email: obj.email })
  if (user) {
    const passwordMatch = await comparePassword(obj.password, user.password)

    if (passwordMatch) {
      const token = jsonwebtoken.sign({ id: user.id }, process.env.PRIVATE!, {
        expiresIn: '1d'
      })

      context.res.cookie('auth-token', token, { httpOnly: true })

      const projects = await ProjectModel.find({ id: user.projects })

      return {
        user: {
          ...(user as any).toObject(),
          projects: projects.map((proj) => proj.toObject())
        }
      }
    }
    throw new AuthenticationError('Incorrect Password')
  }
  throw new AuthenticationError('User with Email does not exist!')
}

const register: MutationResolvers['register'] = async (
  parent,
  obj,
  context
) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(obj.password, salt)

  const projectId = uuid()
  const userId = uuid()

  const ids: string[] = []

  for (let i = 0; i < 16; i += 1) {
    ids.push(uuid())
  }

  await ProjectModel.create(
    projectData(ids, taskObjects(ids), userId, projectId)
  )

  let newUser = await UserModel.create({
    password,
    id: userId,
    email: obj.email,
    username: obj.username,
    projects: [projectId],
    profileImg:
      'https://mb.cision.com/Public/12278/2797280/879bd164c711a736_800x800ar.png'
  })

  newUser = newUser.toObject()

  if (context.res) {
    const token = jsonwebtoken.sign({ id: newUser.id }, process.env.PRIVATE!, {
      expiresIn: '1d'
    })

    context.res.cookie('auth-token', token, { httpOnly: true })
  }

  if (newUser) {
    let projects: any = await ProjectModel.find({
      id: { $in: newUser.projects }
    })

    projects = projects.map((proje: any) => proje.toObject())

    return {
      user: {
        ...newUser,
        projects: projects
      }
    }
  } else {
    console.log('wtf the fuck')
    throw new Error('email already in use')
  }
}

const logout: MutationResolvers['logout'] = async (parent, obj, context) => {
  context.res.clearCookie('auth-token')
  return { message: 'logged out' }
}

export const authMutations = { login, register, logout, loginWithCookie }
