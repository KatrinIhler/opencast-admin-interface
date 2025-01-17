import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MainNav from "../shared/MainNav";
import { Link } from "react-router-dom";
import cn from "classnames";
import TableFilters from "../shared/TableFilters";
import Table from "../shared/Table";
import { fetchFilters } from "../../thunks/tableFilterThunks";
import { connect } from "react-redux";
import { themesTemplateMap } from "../../configs/tableConfigs/themesTableConfig";
import { getTotalThemes } from "../../selectors/themeSelectors";
import { fetchThemes } from "../../thunks/themeThunks";
import { loadThemesIntoTable } from "../../thunks/tableThunks";
import Notifications from "../shared/Notifications";
import NewResourceModal from "../shared/NewResourceModal";
import { editTextFilter } from "../../actions/tableFilterActions";
import { styleNavClosed, styleNavOpen } from "../../utils/componentsUtils";
import Header from "../Header";
import Footer from "../Footer";
import { getUserInformation } from "../../selectors/userInfoSelectors";
import { hasAccess } from "../../utils/utils";
import { getCurrentFilterResource } from "../../selectors/tableFilterSelectors";

/**
 * This component renders the table view of events
 */
const Themes = ({
// @ts-expect-error TS(7031): Binding element 'loadingThemes' implicitly has an ... Remove this comment to see the full error message
	loadingThemes,
// @ts-expect-error TS(7031): Binding element 'loadingThemesIntoTable' implicitl... Remove this comment to see the full error message
	loadingThemesIntoTable,
// @ts-expect-error TS(7031): Binding element 'themes' implicitly has an 'any' t... Remove this comment to see the full error message
	themes,
// @ts-expect-error TS(7031): Binding element 'loadingFilters' implicitly has an... Remove this comment to see the full error message
	loadingFilters,
// @ts-expect-error TS(7031): Binding element 'resetTextFilter' implicitly has a... Remove this comment to see the full error message
	resetTextFilter,
// @ts-expect-error TS(7031): Binding element 'user' implicitly has an 'any' typ... Remove this comment to see the full error message
	user,
// @ts-expect-error TS(7031): Binding element 'currentFilterType' implicitly has... Remove this comment to see the full error message
	currentFilterType,
}) => {
	const { t } = useTranslation();
	const [displayNavigation, setNavigation] = useState(false);
	const [displayNewThemesModal, setNewThemesModal] = useState(false);

	const loadThemes = async () => {
		// Fetching themes from server
		await loadingThemes();

		// Load users into table
		loadingThemesIntoTable();
	};

	useEffect(() => {
		if ("themes" !== currentFilterType) {
			loadingFilters("themes");
		}

		resetTextFilter();

		// Load themes on mount
		loadThemes().then((r) => console.info(r));

		// Fetch themes every minute
		let fetchThemesInterval = setInterval(loadThemes, 5000);

		return () => clearInterval(fetchThemesInterval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleNavigation = () => {
		setNavigation(!displayNavigation);
	};

	const showNewThemesModal = () => {
		setNewThemesModal(true);
	};

	const hideNewThemesModal = () => {
		setNewThemesModal(false);
	};

	return (
		<>
			<Header />
			<section className="action-nav-bar">
				{/* Add theme button */}
				<div className="btn-group">
					{hasAccess("ROLE_UI_THEMES_CREATE", user) && (
						<button className="add" onClick={() => showNewThemesModal()}>
							<i className="fa fa-plus" />
							<span>{t("CONFIGURATION.ACTIONS.ADD_THEME")}</span>
						</button>
					)}
				</div>

				{/* Display modal for new series if add series button is clicked */}
				<NewResourceModal
					showModal={displayNewThemesModal}
					handleClose={hideNewThemesModal}
					resource={"themes"}
				/>

				{/* Include Burger-button menu*/}
				<MainNav isOpen={displayNavigation} toggleMenu={toggleNavigation} />

				<nav>
					{hasAccess("ROLE_UI_THEMES_VIEW", user) && (
						<Link
							to="/configuration/themes"
							className={cn({ active: true })}
							onClick={() => loadThemes()}
						>
							{t("CONFIGURATION.NAVIGATION.THEMES")}
						</Link>
					)}
				</nav>
			</section>

			<div
				className="main-view"
				style={displayNavigation ? styleNavOpen : styleNavClosed}
			>
				{/* Include notifications component */}
				<Notifications />

				<div className="controls-container">
					{/* Include filters component */}
					<TableFilters
						loadResource={loadingThemes}
						loadResourceIntoTable={loadingThemesIntoTable}
						resource={"themes"}
					/>
					<h1>{t("CONFIGURATION.THEMES.TABLE.CAPTION")}</h1>
					<h4>{t("TABLE_SUMMARY", { numberOfRows: themes })}</h4>
				</div>
				{/* Include table component */}
				<Table templateMap={themesTemplateMap} />
			</div>
			<Footer />
		</>
	);
};

// Getting state data out of redux store
// @ts-expect-error TS(7006): Parameter 'state' implicitly has an 'any' type.
const mapStateToProps = (state) => ({
	themes: getTotalThemes(state),
	user: getUserInformation(state),
	currentFilterType: getCurrentFilterResource(state),
});

// Mapping actions to dispatch
// @ts-expect-error TS(7006): Parameter 'dispatch' implicitly has an 'any' type.
const mapDispatchToProps = (dispatch) => ({
// @ts-expect-error TS(7006): Parameter 'resource' implicitly has an 'any' type.
	loadingFilters: (resource) => dispatch(fetchFilters(resource)),
	loadingThemes: () => dispatch(fetchThemes()),
	loadingThemesIntoTable: () => dispatch(loadThemesIntoTable()),
	resetTextFilter: () => dispatch(editTextFilter("")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Themes);
