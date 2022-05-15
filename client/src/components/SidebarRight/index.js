import React, { useState } from 'react';

function SidebarRight() {
	const [toggleMenu, setToggleMenu] = useState(true);
	return (
		<div
			className={`z-20 w-[6.4rem] h-full fixed bg-white xl:w-[25.2rem] shadow-lg right-0 ${
				toggleMenu ? 'translate-x-0' : 'translate-x-full'
			} group transition-all`}
		>
			<div className="w-full h-full pt-[8.6rem] p-[1.6rem] z-10 bg-white dark:bg-indigo-950"></div>
			<div
				className={`w-16 h-16 bg-indigo-600 absolute left-0 top-[8.6rem] transition-all flex rounded-tl-full rounded-bl-full justify-center items-center text-white group-hover:-translate-x-full cursor-pointer -z-10 ${
					toggleMenu ? 'translate-x-0' : '-translate-x-full'
				}`}
				onClick={() => setToggleMenu(!toggleMenu)}
			>
				{toggleMenu ? (
					<i className="fas fa-arrow-right"></i>
				) : (
					<i className="fas fa-arrow-left"></i>
				)}
			</div>
		</div>
	);
}

export default SidebarRight;
