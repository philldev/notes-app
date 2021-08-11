import { FC } from 'react'
import { ButtonColor, ButtonProps, ButtonSize } from './buttonTypes'

const bgColor: { [key in ButtonColor]: string } = {
	primary: 'bg-accent-primary',
	secondary: 'bg-text-1',
	danger: 'bg-accent-danger',
	success: 'bg-accent-success',
	warning: 'bg-accent-warning',
}

const borderColor: { [key in ButtonColor]: string } = {
	primary: 'border-accent-primary',
	secondary: 'border-text-1',
	danger: 'border-accent-danger',
	success: 'border-accent-success',
	warning: 'border-accent-warning',
}

const textColor: { [key in ButtonColor]: string } = {
	primary: 'text-accent-primary',
	secondary: 'text-text-1',
	danger: 'text-accent-danger',
	success: 'text-accent-success',
	warning: 'text-accent-warning',
}

const sizes: { [key in ButtonSize]: string } = {
	sm: 'h-7 px-2 text-sm',
	base: 'h-9 px-3 text-base',
	md: 'h-10 px-4 text-md',
	lg: 'h-12 px-6 text-lg',
}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
	const { variant = 'solid', color = 'primary', size = 'base' } = rest

	return (
		<button
			className={`transition-all rounded-md items-center justify-center flex hover:opacity-80 disabled:opacity-50
			${sizes[size]}
			${
				variant === 'solid'
					? `${bgColor[color]} ${borderColor[color]} text-text-button border`
					: ''
			}
			${
				variant === 'outlined'
					? `bg-transparent ${textColor[color]} ${borderColor[color]} border`
					: ''
			}
			${variant === 'transparent' ? `bg-transparent ${textColor[color]}` : ''}
			${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
