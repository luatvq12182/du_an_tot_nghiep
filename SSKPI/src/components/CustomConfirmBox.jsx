import { ConfirmDialog } from "primereact/confirmdialog";
import { useSelector } from "react-redux";
import {
	getAcceptFunc,
	getMessageConfirm,
	getRejectFunc,
	getVisible,
} from "redux/confirmBox/selector";
import { useDispatch } from "react-redux";
import { hideConfirm } from "redux/confirmBox/actionCreator";

const CustomConfirmBox = () => {
	const dispatch = useDispatch();

	const message = useSelector(getMessageConfirm);
	const visible = useSelector(getVisible);
	const accept = useSelector(getAcceptFunc);
	const reject = useSelector(getRejectFunc);

	return (
		<ConfirmDialog
			visible={visible}
			onHide={() => dispatch(hideConfirm())}
			message={message}
			header="Xác nhận"
			icon="pi pi-exclamation-triangle"
			accept={accept}
			reject={reject}
		/>
	);
};

export default CustomConfirmBox;
