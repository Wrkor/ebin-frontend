export default function ArrowSVG({ ...props }) {
	return (
		<svg
			{...props}
			style={{ transform: 'rotate(180deg)' }}
			width='18'
			height='14'
			viewBox='0 0 18 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M17 7L1 7M1 7L7 13M1 7L7 0.999999'
				stroke='#212529'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
