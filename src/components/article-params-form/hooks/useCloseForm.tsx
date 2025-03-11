import { useEffect } from 'react';

type UseToggleFormType = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useCloseForm = ({
	isOpen,
	onClose,
	rootRef,
}: UseToggleFormType) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleByEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && onClose) {
				onClose();
			}
		};

		const handleByClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target) &&
				onClose
			) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleByEsc);
		window.addEventListener('mousedown', handleByClick);

		return () => {
			window.removeEventListener('keydown', handleByEsc);
			window.removeEventListener('mousedown', handleByClick);
		};
	}, [isOpen, onClose, rootRef]);
};
