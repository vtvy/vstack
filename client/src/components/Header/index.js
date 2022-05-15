import React from 'react';
import Navbar from './Navbar';

function Header({ setToggleMenu, toggleMenu }) {
	return (
		<div className="w-full h-[7rem] z-50 shadow-lg bg-white dark:bg-indigo-950 fixed">
			<Navbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
		</div>
	);
}

export default Header;
