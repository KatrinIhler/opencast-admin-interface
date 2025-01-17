import React from "react";
import {
	getNotifications,
	getGlobalPositions,
} from "../../selectors/notificationSelector";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { setHidden } from "../../actions/notificationActions";
import {
	NOTIFICATION_CONTEXT,
	NOTIFICATION_CONTEXT_ACCESS,
} from "../../configs/modalConfig";

/**
 * This component renders notifications about occurred errors, warnings and info
 */
const Notifications : React.FC<{
  setNotificationHidden: any,
  notifications: any,
  globalPosition: any,
  context?: any,
}> = ({
	setNotificationHidden,
	notifications,
	globalPosition,
	context,
}) => {
	const { t } = useTranslation();

// @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
	const closeNotification = (id) => {
		setNotificationHidden(id, true);
	};

// @ts-expect-error TS(7006): Parameter 'notification' implicitly has an 'any' t... Remove this comment to see the full error message
	const renderNotification = (notification, key) => (
		<li key={key}>
			<div className={cn(notification.type, "alert sticky")}>
				<button
					onClick={() => closeNotification(notification.id)}
					className="button-like-anchor fa fa-times close"
				/>
				<p>{t(notification.message, notification.parameter)}</p>
			</div>
		</li>
	);

	return (
		// if context is not_corner then render notification without consider global notification position
		context === "not_corner" ? (
			<ul>
				{notifications.map(
// @ts-expect-error TS(7006): Parameter 'notification' implicitly has an 'any' t... Remove this comment to see the full error message
					(notification, key) =>
						!notification.hidden &&
						(notification.context === NOTIFICATION_CONTEXT ||
							notification.context === NOTIFICATION_CONTEXT_ACCESS) &&
						renderNotification(notification, key)
				)}
			</ul>
		) : context === "above_table" ? (
			<ul>
				{notifications.map(
// @ts-expect-error TS(7006): Parameter 'notification' implicitly has an 'any' t... Remove this comment to see the full error message
					(notification, key) =>
						!notification.hidden &&
						notification.context === "global" &&
						notification.type === "error" &&
						renderNotification(notification, key)
				)}
			</ul>
		) : (
			<ul
				className={cn({
					"global-notifications": true,
					"notifications-top-left": globalPosition === "top-left",
					"notifications-top-right": globalPosition === "top-right",
					"notification-top-center": globalPosition === "top-center",
					"notifications-bottom-left": globalPosition === "bottom-left",
					"notifications-bottom-right": globalPosition === "bottom-right",
					"notifications-bottom-center": globalPosition === "bottom-center",
				})}
			>
				{notifications.map(
// @ts-expect-error TS(7006): Parameter 'notification' implicitly has an 'any' t... Remove this comment to see the full error message
					(notification, key) =>
						!notification.hidden &&
						notification.context === "global" &&
						renderNotification(notification, key)
				)}
			</ul>
		)
	);
};

// Getting state data out of redux store
// @ts-expect-error TS(7006): Parameter 'state' implicitly has an 'any' type.
const mapStateToProps = (state) => ({
	notifications: getNotifications(state),
	globalPosition: getGlobalPositions(state),
});

// Mapping actions to dispatch
// @ts-expect-error TS(7006): Parameter 'dispatch' implicitly has an 'any' type.
const mapDispatchToProps = (dispatch) => ({
// @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
	setNotificationHidden: (id, isHidden) => dispatch(setHidden(id, isHidden)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
