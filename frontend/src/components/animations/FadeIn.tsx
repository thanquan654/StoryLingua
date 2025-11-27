'use client'

import { motion, Variant, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	delay?: number
	className?: string
	direction?: 'up' | 'down' | 'left' | 'right'
}

export default function FadeIn({
	children,
	delay = 0,
	className = '',
	direction = 'up',
}: Props) {
	const variants: Variants = {
		hidden: {
			opacity: 0,
			y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
			x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
		},
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
			transition: { duration: 0.6, ease: 'easeOut', delay: delay },
		},
	}

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			variants={variants}
			className={className}
		>
			{children}
		</motion.div>
	)
}
