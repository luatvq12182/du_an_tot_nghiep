import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { ERROR_FORM_MESSAGE } from "constants/app";

const minDate = new Date();

const CalenderController = ({
	label,
	required = true,
	control,
	name,
	errors,
	showTime = false,
	timeOnly,
	isMindata = true,
	customClass = "p-field p-col-12 p-md-6",
	...rest
}) => {
	return (
		<div className={customClass}>
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
					<Calendar
						id={field.name}
						className={classNames({
							"p-invalid": fieldState.invalid,
						})}
						dateFormat="dd/mm/yy"
						showButtonBar
						showTime={showTime}
						showSeconds={showTime}
						minDate={isMindata ? minDate : false}
						timeOnly={timeOnly}
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

export default CalenderController;
