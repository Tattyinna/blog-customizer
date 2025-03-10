import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useCloseForm } from './hooks/useCloseForm';

import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	resetStyles: () => void;
	applyStyles: () => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
	resetStyles,
	applyStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleChangeFontFamily = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	const handleChangeFontSize = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	const handleChangeFontColor = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const handleChangeBackgroundColor = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const handleChangeContentWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	const formRef = useRef<HTMLFormElement | null>(null);

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={() => !isOpen && toggleOpen()} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={(e: FormEvent) => e.preventDefault()}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='Шрифт'
						onChange={handleChangeFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChangeFontSize}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='Цвет шрифта'
						onChange={handleChangeFontColor}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={handleChangeBackgroundColor}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='Ширина контента'
						onChange={handleChangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetStyles}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={applyStyles}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
