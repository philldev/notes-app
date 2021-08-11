type ButtonVariant = 'solid' | 'outlined' | 'transparent'

export type ButtonSize = 'sm' | 'base' | 'md' | 'lg'

export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

type ReactBtnProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

export interface ButtonProps extends ReactBtnProps {
	variant?: ButtonVariant
	size?: ButtonSize
	color?: ButtonColor
}
