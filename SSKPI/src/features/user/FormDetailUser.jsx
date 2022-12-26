import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { ACCOUNT_STATUS } from "constants/app";

const FormDetailUser = ({ detailUser }) => {
	const fields = [
		{ name: "name", label: "Họ tên", value: detailUser?.name },
		{
			name: "employee_code",
			label: "Mã nhân viên",
			value: detailUser?.employee_code,
		},
		{ name: "email", label: "Email", value: detailUser?.email },
		{
			name: "status",
			label: "Trạng thái",
			value: ACCOUNT_STATUS[detailUser?.status],
		},
	];

	return (
		<Fieldset legend="Thông tin User" toggleable>
			<div className="p-grid">
				{fields.map(({ name, label, value }) => (
					<div key={name} className="p-col-6">
						<label
							style={{ marginBottom: "5px", display: "block" }}
						>
							{label}
						</label>
						<InputText
							style={{ width: "100%" }}
							value={value || ""}
							readOnly={true}
						/>
					</div>
				))}
			</div>
		</Fieldset>
	);
};

export default FormDetailUser;
