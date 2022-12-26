import { Button } from "primereact/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import genElementsForm from "utils/genElementsForm";

const FormInsertUpdateFeature = (props) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const fields = [
		{ name: "name", label: "Tên chức năng", type: "inputText" },
		{ name: "parentId", label: "Chức năng cha", type: "inputText" },
		{ name: "path", label: "Đường dẫn", type: "inputText" },
		{ name: "order", label: "Vị trí", type: "inputText" },
		{ name: "status", label: "Trạng thái", type: "inputText" },
		{ name: "includeMenu", label: "Tạo menu", type: "inputText" },
	];

	const onSubmit = (data) => {};

	const formRender = genElementsForm(fields, control, errors);

	useEffect(() => {
		reset(props.data);
	}, [reset, props.data]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="p-fluid p-formgrid p-grid">{formRender}</div>

			<Button
				style={{
					display: "block",
					margin: "0 auto",
					marginTop: "30px",
				}}
				type="submit"
				label={
					props.actionType === "INSERT"
						? "Thêm chức năng"
						: "Xác nhận"
				}
			/>
		</form>
	);
};

export default FormInsertUpdateFeature;
