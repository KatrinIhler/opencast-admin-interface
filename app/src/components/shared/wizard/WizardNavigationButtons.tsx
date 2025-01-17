import React from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

const WizardNavigationButtons : React.FC<{
  isFirst?: any,
	isLast?: any,
	noValidation?: any,
	formik: any,
	nextPage?: any,
	previousPage?: any,
}> = ({
	isFirst,
	isLast,
	noValidation,
	formik,
	nextPage,
	previousPage,
}) => {
	const { t } = useTranslation();

	const validation = noValidation
		? {}
		: {
				active: formik.dirty && formik.isValid,
				inactive: !(formik.dirty && formik.isValid),
		  };

	const disabled = !(formik.dirty && formik.isValid);

	return (
		<>
			<footer>
				{isLast ? (
					<button
						type="submit"
						className={cn("submit", validation)}
						disabled={noValidation ? false : disabled}
						onClick={() => {
							formik.handleSubmit();
						}}
// @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
						tabIndex="100"
					>
						{t("WIZARD.CREATE")}
					</button>
				) : (
					<button
						type="submit"
						className={cn("submit", validation)}
						disabled={noValidation ? false : disabled}
						onClick={() => {
							nextPage(formik.values);
						}}
// @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
						tabIndex="100"
					>
						{t("WIZARD.NEXT_STEP")}
					</button>
				)}
				{!isFirst && (
					<button
						className="cancel"
						onClick={() => previousPage(formik.values, false)}
// @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
						tabIndex="101"
					>
						{t("WIZARD.BACK")}
					</button>
				)}
			</footer>

			<div className="btm-spacer" />
		</>
	);
};

export default WizardNavigationButtons;
