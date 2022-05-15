import React from 'react';

function CardSection({ children, title }) {
	return (
		<div className="w-full bg-white dark:text-textColorDark dark:bg-indigo-950 rounded-lg flex flex-col overflow-hidden">
			<div className="py-6 px-4 border-b-[0.05px] border-solid border-slate-200 dark:border-textColorDark dark:bg-indigo-950 capitalize flex items-center text-[2rem]">
				{title}
			</div>
			<div className="p-4"> {children}</div>
		</div>
	);
}

export default CardSection;
