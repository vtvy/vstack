import React from 'react';
import { NavLink } from 'react-router-dom';
const navbarItem = [
	{
		title: 'Timeline',
		path: 'timeline',
	},
	{
		title: 'About',
		path: 'about',
	},
	{
		title: 'Friends',
		path: 'friends',
	},
	{
		title: 'Photos',
		path: 'photos',
	},
];

const stylesItem =
	'w-[calc(100%_/_4)] border-x-2 rounded-lg border-solid border-transparent h-full flex justify-center items-center transition-all duration-500';

function ProfileNavbar() {
	return (
		<div className="h-[6.4rem] w-full bg-white dark:bg-indigo-950 shadow-md rounded-lg flex items-center overflow-hidden ">
			{navbarItem.map((item) => (
				<NavLink
					to={item.path}
					key={item.title}
					className={({ isActive }) =>
						isActive
							? `${stylesItem} bg-[#bfdbfe] border-indigo-600 text-indigo-600`
							: `${stylesItem} text-gray-600 dark:text-textColorDark`
					}
				>
					{item.title}
				</NavLink>
			))}
		</div>
	);
}

export default ProfileNavbar;
