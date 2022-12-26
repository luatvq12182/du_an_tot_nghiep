import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { ERROR_FORM_MESSAGE } from "constants/app";

const DropdownController = ({
	label,
	required = true,
	control,
	options = [],
	optionLabel = "name",
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
				rules={{ required: ERROR_FORM_MESSAGE.EMPTY }}
				render={({ field, fieldState }) => (
					<Dropdown
						id={field.name}
						options={options}
						optionLabel={optionLabel}
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

export default DropdownController;
