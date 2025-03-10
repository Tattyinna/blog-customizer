import { useEffect } from 'react';

type UseToggleForm = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useCloseForm = ({ isOpen, onClose, rootRef }: UseToggleForm) => {
	useEffect(() => {
		const handleByEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && onClose) {
				isOpen && onClose();
			}
		};

		const handleByClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target) &&
				onClose
			) {
				isOpen && onClose();
			}
		};

		window.addEventListener('keydown', handleByEsc);
		window.addEventListener('mousedown', handleByClick);

		return () => {
			window.removeEventListener('keydown', handleByEsc);
			window.removeEventListener('mousedown', handleByClick);
		};
	}, [isOpen, onClose]);
};
