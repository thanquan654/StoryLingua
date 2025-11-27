import type { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from './auth.service.js'

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body

	try {
		const user = await findUserByEmail(email)
		if (!user) {
			return res
				.status(400)
				.json({ msg: 'Email or Password are incorrect' })
		}

		if (!user.passwordHash) {
			return res
				.status(400)
				.json({ msg: 'Email or Password are incorrect' })
		}

		const isPasswordMatch = await bcrypt.compare(
			password,
			user.passwordHash!,
		)

		if (!isPasswordMatch) {
			return res
				.status(400)
				.json({ msg: 'Email or Password are incorrect' })
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { passwordHash, ...userWithoutPassword } = user
		return res.status(200).json({
			msg: 'Login successfully',
			data: {
				user: userWithoutPassword,
			},
		})
	} catch (error) {
		next(error)
	}
}

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { displayName, email, password, confirmPassword } = req.body

	try {
		const user = await findUserByEmail(email)

		if (user) {
			return res.status(400).json({
				msg: 'Email already used',
			})
		}

		const newUser = await createUser({
			displayName,
			email,
			password,
			avatar: null,
			googleId: null,
		})

		const { passwordHash, ...userWithoutPassword } = newUser
		return res.status(201).json({
			msg: 'Register successfully',
			data: {
				user: userWithoutPassword,
			},
		})
	} catch (error) {
		next(error)
	}
}
