import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../App';
import SearchBar from './SearchBar';

function Search() {
	let navigate = useNavigate();
	const setSearchInput = useContext(SearchContext);
	const [searchValue, setSearchValue] = useState();
	useEffect(() => {
		if (searchValue) {
			setSearchInput(searchValue);
			navigate('/search/');
		}
	}, [searchValue]);
	const handleSearch = async (data) => {
		const searchValue = data.searchValue.trim();
		if (searchValue) {
			setSearchValue(searchValue);
		}
	};

	return (
		<>
			<SearchBar onSubmit={handleSearch} />
		</>
	);
}

export default Search;
