import React from 'react';

function Button(props) {
	return (
		<button
			type={props.type || 'button'}
			className={`bg-indigo-600 text-white 
      ${props.rounded || 'rounded-lg'} ${
				props.shadow || 'shadow-lg shadow-indigo-500/50 dark:shadow-none'
			}
      ${props.p || 'py-2 px-4'} flex justify-center items-center ${props.w} ${
				props.h
			} cursor-pointer  ${props.custom}
        ${
					props.isValid === false
						? 'bg-slate-400 cursor-not-allowed shadow-none'
						: 'bg-indigo-600 hover:bg-indigo-700'
				}
      `}
		>
			{props.children}
		</button>
	);
}

export default Button;
