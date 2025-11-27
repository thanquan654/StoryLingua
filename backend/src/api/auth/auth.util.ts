import jwt from 'jsonwebtoken'
import type { User } from '../../../generated/prisma/index.js'

export const generateAccessToken = (user: User) => {}

export const generateRefreshToken = (userId: string) => {}
