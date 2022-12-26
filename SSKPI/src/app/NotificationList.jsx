import classNames from "classnames";
import formatTime from "utils/formatTime";

const NotificationItem = (props) => {
	const classNoti = classNames("notification_item", {
		seen: props.status === 1,
	});

	const handleClick = () => {
		window.location.href = props.path;
	};

	return (
		<div onClick={handleClick} className={classNoti}>
			<p dangerouslySetInnerHTML={{ __html: props.title }}></p>
			<span style={{ fontSize: "12px" }}>
				{formatTime.formatDateTime(props.create_at)}
			</span>
		</div>
	);
};

const NotificationList = ({ notifications = [] }) => {
	const list = notifications.map((item, index) => (
		<NotificationItem key={index} {...item} />
	));

	return <div className="notifications">{list}</div>;
};

export default NotificationList;
