import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { rejectJobRequest } from "redux/jobRequest/actionCreator";

const FormReject = ({ visible, onHide, id }) => {
	const [isStartType, setIsStartType] = useState(false);
	const [value, setValue] = useState("");
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setIsStartType(true);
		setValue(e.target.value);
	};

	const handleReject = () => {
		if (!value.trim()) return;

		dispatch(rejectJobRequest(id, value));
		onHide();
	};

	const renderFooter = (name) => {
		return (
			<div>
				<Button
					label="Đóng"
					onClick={onHide}
					className="p-button-text p-button-secondary"
				/>
				<Button label="Xác nhận" onClick={handleReject} autoFocus />
			</div>
		);
	};

	return (
		<Dialog
			header="Xác nhận từ chối yêu cầu"
			visible={visible}
			style={{ width: "40vw" }}
			onHide={onHide}
			footer={renderFooter()}
		>
			<div class="p-field p-col-12">
				<label for="reason" class="">
					Lý do <span style={{ color: "#ff2020" }}>*</span>
				</label>
				<InputTextarea
					id="reason"
					style={{ width: "100%" }}
					rows={5}
					value={value}
					onChange={handleChange}
					placeholder="Nhập lý do từ chối yêu cầu..."
				/>
				{isStartType && !value.trim() && (
					<small className="p-error">Không được để trống.</small>
				)}
			</div>
		</Dialog>
	);
};

export default FormReject;
