import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Chips } from "primereact/chips";
import { ERROR_FORM_MESSAGE } from "constants/app";

const ChipsController = ({
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
				rules={{ required: ERROR_FORM_MESSAGE.EMPTY }}
				render={({ field, fieldState }) => (
					<Chips
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

export default ChipsController;
