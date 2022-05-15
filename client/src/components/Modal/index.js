import { useEffect } from 'react';

function Modal({ children, setIsOpen }) {
	const handleCloseForm = (e) => {
		if (e.target.classList.contains('close-position')) setIsOpen(false);
	};
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);
	return (
		<div
			className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex z-50 justify-center items-center close-position"
			onClick={handleCloseForm}
		>
			{children}
		</div>
	);
}

export default Modal;
