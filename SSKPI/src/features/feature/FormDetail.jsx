import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";

const FormDetail = () => {
	const fields = [
		{ name: "name", label: "Tên chức năng", value: "" },
		{ name: "parentFeature", label: "Chức năng cha", value: "" },
		{ name: "path", label: "Đường dẫn", value: "" },
		{ name: "order", label: "Vị trí", value: "" },
		{ name: "status", label: "Trạng thái", value: "" },
		{ name: "includeMenu", label: "Tạo menu", value: "" },
	];

	return (
		<Fieldset legend="Thông tin chức năng" toggleable>
			<div className="p-grid">
				{fields.map(({ name, label, value }) => {
					return (
						<div className="p-col-6">
							<label
								style={{
									marginBottom: "5px",
									display: "block",
								}}
								htmlFor={name}
							>
								{label}
							</label>
							<InputText
								style={{ width: "100%" }}
								readOnly
								id={name}
								value={value || ""}
							/>
						</div>
					);
				})}
			</div>
		</Fieldset>
	);
};

export default FormDetail;
