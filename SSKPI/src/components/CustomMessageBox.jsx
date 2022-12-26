import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { hideMessage } from "redux/messageBox/actionCreator";
import { getMessage, getStatus } from "redux/messageBox/selector";

const CustomMessageBox = () => {
	const status = useSelector(getStatus);
	const message = useSelector(getMessage);
	const typeDialog = useSelector((state) => state.messageBox.typeDialog);

	const dispatch = useDispatch();

	const dialogFooter = (
		<div className="p-d-flex p-jc-center">
			<Button
				label="OK"
				className="p-button-text"
				autoFocus
				onClick={() => {
					dispatch(hideMessage());
				}}
			/>
		</div>
	);

	return (
		<Dialog
			visible={status}
			onHide={() => dispatch(hideMessage())}
			position="center"
			footer={dialogFooter}
			showHeader={false}
			breakpoints={{ "960px": "80vw" }}
			style={{ width: "30vw" }}
		>
			<div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
				{typeDialog === "SUCCESS" && (
					<>
						<i
							className="pi pi-check-circle"
							style={{
								fontSize: "5rem",
								color: "var(--green-500)",
							}}
						></i>
						<h5 style={{ fontSize: "18px" }}>Thành công!</h5>
					</>
				)}

				{typeDialog === "ERROR" && (
					<>
						<i
							className="pi pi-exclamation-triangle"
							style={{ fontSize: "5rem", color: "red" }}
						></i>
						<h5 style={{ fontSize: "18px" }}>Thất bại!</h5>
					</>
				)}

				<p style={{ lineHeight: 1.5, textIndent: "1rem" }}>{message}</p>
			</div>
		</Dialog>
	);
};

export default CustomMessageBox;
