import InputTextController from "components/InputTextController";
import InputNumberController from "components/InputNumberController";
import EditorController from "components/EditorController";
import CalenderController from "components/CalenderController";
import MultiSelectController from "components/MultiSelectController";
import DropdownController from "components/DropdownController";

const genElementsForm = (fields, control, errors) => {
	return fields.map(({ type, ...rest }, index) => {
		switch (type) {
			case "inputNumber":
				return (
					<InputNumberController
						key={index}
						{...rest}
						control={control}
						errors={errors}
					/>
				);

			case "calender":
				return (
					<CalenderController
						key={index}
						{...rest}
						control={control}
						errors={errors}
					/>
				);

			case "editor":
				return (
					<EditorController
						key={index}
						{...rest}
						control={control}
						errors={errors}
					/>
				);
			case "select":
				return (
					<MultiSelectController
						key={index}
						{...rest}
						control={control}
						errors={errors}
					/>
				);
			case "dropdown":
				return (
					<DropdownController
						key={index}
						{...rest}
						control={control}
						errors={errors}
					/>
				);

			default:
				return (
					<InputTextController
						key={index}
						{...rest}
						control={control}
						errors={errors}
					/>
				);
		}
	});
};

export default genElementsForm;
