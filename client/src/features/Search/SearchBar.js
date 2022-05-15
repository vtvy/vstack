import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

function SearchBar({ onSubmit }) {
	const { register, handleSubmit } = useForm();

	return (
		<form
			className="w-full max-w-[48.2rem] px-4 py-3 rounded-lg bg-[#DCF0FF] dark:bg-indigo-1000  flex items-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				type="text"
				autoComplete="off"
				className="appearance-none outline-none w-full bg-transparent font-light dark:text-slate-300"
				placeholder="Search here..."
				{...register('searchValue')}
			/>
			<button type="submit">
				<i className="fas fa-search font-light text-blue-500 cursor-pointer"></i>
			</button>
		</form>
	);
}

export default SearchBar;
