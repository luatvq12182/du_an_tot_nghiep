import CustomBreadCrumb from "components/CustomBreadCrumb";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import FormDetail from "./FormDetail";
import FormInsertUpdateFeature from "./FormInsertUpdate";
import Tree from "./Tree";

const FeatureManage = () => {
	const [visible, setVisible] = useState(false);
	const [titleDialog, setTitleDialog] = useState(null);
	const [bodyDialog, setBodyDialog] = useState(null);
	const items = [{ label: "Quản lý ứng dụng" }, { label: "Quản lý User" }];

	const handleOpenDialog = (data = {}, actionType = "INSERT") => {
		setVisible(true);
		setBodyDialog(
			<FormInsertUpdateFeature data={data} actionType={actionType} />
		);

		if (actionType === "INSERT") {
			setTitleDialog("Thêm chức năng");
		} else if (actionType === "UPDATE") {
			setTitleDialog("Cập nhật chức năng");
		}
	};

	return (
		<>
			<CustomBreadCrumb items={items} />

			<Dialog
				header={titleDialog}
				visible={visible}
				style={{ width: "60%" }}
				onHide={() => setVisible(false)}
			>
				{bodyDialog}
			</Dialog>

			<div className="card">
				<div className="p-grid">
					<div className="p-col-4">
						<Tree />
						<Button
							onClick={() => handleOpenDialog({}, "INSERT")}
							className="mt-1"
							icon="pi pi-plus"
							label="Thêm mới"
						/>
					</div>
					<div className="p-col-8">
						<FormDetail />
					</div>
				</div>
			</div>
		</>
	);
};

export default FeatureManage;
