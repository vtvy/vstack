import React from 'react';

function Spinner({ custom }) {
	return (
		<div
			style={{ borderTopColor: 'transparent' }}
			className={`w-16 h-16 border-4 border-indigo-600 border-dotted rounded-full animate-spin ${custom}`}
		></div>
	);
}

export default Spinner;
