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
	articleState: typeof defaultArticleState;
	setArticleState: React.Dispatch<
		React.SetStateAction<typeof defaultArticleState>
	>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);

	const resetFormState = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const applyState = () => {
		setArticleState(formState);
	};

	const toggleOpen = () => {
		setIsMenuOpen((prevOpen) => !prevOpen);
	};

	const handleChangeFontFamily = (value: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: value });
	};

	const handleChangeFontSize = (value: OptionType) => {
		setFormState({ ...formState, fontSizeOption: value });
	};

	const handleChangeFontColor = (value: OptionType) => {
		setFormState({ ...formState, fontColor: value });
	};

	const handleChangeBackgroundColor = (value: OptionType) => {
		setFormState({ ...formState, backgroundColor: value });
	};

	const handleChangeContentWidth = (value: OptionType) => {
		setFormState({ ...formState, contentWidth: value });
	};

	const formRef = useRef<HTMLFormElement | null>(null);

	useCloseForm({
		isOpen: isMenuOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	const handleSubmitForm = (e: FormEvent) => {
		e.preventDefault();
		applyState();
	};

	return (
		<>
			<ArrowButton
				onClick={() => !isMenuOpen && toggleOpen()}
				isOpen={isMenuOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} ref={formRef} onSubmit={handleSubmitForm}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='Шрифт'
						onChange={handleChangeFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChangeFontSize}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='Цвет шрифта'
						onChange={handleChangeFontColor}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={handleChangeBackgroundColor}
					/>
					<Select
						selected={formState.contentWidth}
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
							onClick={resetFormState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
