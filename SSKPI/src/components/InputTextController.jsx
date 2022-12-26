import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { ERROR_FORM_MESSAGE } from "constants/app";

const InputTextController = ({
	label,
	required = true,
	control,
	name,
	errors,
	minLength = 0,
	maxLength = 255,
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
					minLength: {
						value: minLength,
						message:
							ERROR_FORM_MESSAGE.MIN_LENGTH +
							minLength +
							" kí tự",
					},
					maxLength: {
						value: maxLength,
						message:
							ERROR_FORM_MESSAGE.MIN_LENGTH +
							maxLength +
							" kí tự",
					},
					pattern: {
						value:
							name === "email"
								? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
								: /^.*$/,
						message: ERROR_FORM_MESSAGE.EMAIL,
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

export default InputTextController;
