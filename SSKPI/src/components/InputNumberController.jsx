import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
// import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { ERROR_FORM_MESSAGE } from "constants/app";

const InputNumberController = ({
	label,
	required = true,
	control,
	name,
	errors,
	...rest
}) => {
	return (
		<div className="p-field p-col-12 p-md-6">
			<label
				htmlFor={name}
				className={classNames({ "p-error": errors.name })}
			>
				{label}
				{required && <span style={{ color: "#ff2020" }}>*</span>}
			</label>
			<Controller
				name={name}
				control={control}
				rules={{
					required: ERROR_FORM_MESSAGE.EMPTY,
					min: {
						value: 1,
						message: "Giá trị nhập vào phải lớn hơn 0",
					},
					pattern: {
						value: /^[0-9]*$/,
						message: ERROR_FORM_MESSAGE.NUMBER,
					},
					max: {
						value: 99,
						message: "Giá trị nhập vào phải nhỏ hơn 99",
					},
				}}
				render={({ field, fieldState }) => (
					<InputText
						id={field.name}
						className={classNames({
							"p-invalid": fieldState.invalid,
						})}
						{...field}
						{...rest}
					/>
				)}
			/>
			{errors[name] && (
				<small className="p-error">{errors[name].message}</small>
			)}
		</div>
	);
};

export default InputNumberController;
