import { Outlet } from 'react-router-dom';
function Container() {
	return (
		<div className="flex w-full lg:px-[7.4rem] xl:px-[27rem] justify-center h-full min-h-screen pt-[8.6rem] px-4">
			<div className="flex w-full justify-center z-10">
				<Outlet />
			</div>
		</div>
	);
}

export default Container;
