import React, { useState } from 'react';

function InputSelect({
	type,
	typeSelect,
	setTypeSelect,
	start,
	end,
	value,
	setValue,
}) {
	function createListOfNumbers(start, end) {
		return Array(end - start + 1)
			.fill()
			.map((_, idx) => start + idx);
	}
	const listOfSelectionNumbers = createListOfNumbers(start, end);

	return (
		<div className="relative w-full">
			<div
				className={` w-full  border text-gray-700 py-4 px-4  rounded leading-tight relative flex justify-between cursor-pointer ${
					value ? 'bg-white' : 'bg-gray-200'
				} ${typeSelect === type ? 'border-indigo-600' : 'border-gray-200'}`}
				onClick={() => {
					setTypeSelect(type);
				}}
			>
				{value ? value : type}
				<i className="fas fa-caret-down"></i>
			</div>
			{typeSelect === type && (
				<div
					className={`absolute left-0 top-0 -translate-y-[calc(100%_+_1rem)] max-h-96 w-full bg-slate-100 shadow-lg overflow-y-scroll space-y-1 scrollbar `}
				>
					{listOfSelectionNumbers.map((number) => (
						<div
							key={number}
							value={number}
							className={`hover:bg-indigo-600 hover:text-white px-4 py-3 cursor-pointer ${
								number === value ? 'bg-indigo-600 text-white' : ''
							} `}
							onClick={() => {
								setValue(number);
								setTypeSelect();
							}}
						>
							{number}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default InputSelect;
