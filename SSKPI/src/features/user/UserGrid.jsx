import CustomDataTable from "components/CustomDataTable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { ACCOUNT_STATUS } from "constants/app";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showConfirm } from "redux/confirmBox/actionCreator";
import { Dialog } from "primereact/dialog";
import { DisableUser, RemoveUser } from "redux/user/actionCreator";
import UpdateUser from "./updateUser";

const UserGrid = (props) => {
	const [dataSelected, setDataSelected] = useState(null);
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState();

	useEffect(() => {
		setDataSelected(null);
	}, [props?.dataTable]);

	const handleSelectionChange = (data) => {
		setDataSelected(data.value);
		props.callback(data.value);
	};

	const handleClickDelete = ({ id }) => {
		dispatch(
			showConfirm("Bạn có chắc muốn xóa tài khoản này không?", () => {
				dispatch(RemoveUser(id));
			})
		);
	};
	const HandleUpdate = (data) => {
		setIsOpen(true);
		setUser(data);
	};

	const handleClickLock = ({ id, status }) => {
		if (status === 1) {
			dispatch(
				showConfirm(
					"Bạn có chắc muốn vô hiệu hóa tài khoản này không?",
					() => {
						dispatch(DisableUser(id, (status = 0)));
					}
				)
			);
		} else if (status === 0) {
			dispatch(
				showConfirm(
					"Bạn có chắc mở hoạt động tài khoản này không?",
					() => {
						dispatch(DisableUser(id, (status = 1)));
					}
				)
			);
		}
	};

	const genActionCol = (data) => {
		return (
			<>
				<Button
					tooltip="Cập nhật"
					onClick={() => HandleUpdate(data)}
					className="p-button-rounded p-button-text p-button-help"
					icon="pi pi-pencil"
					disabled={data?.status !== 1}
				/>
				<Button
					tooltip="Xóa"
					onClick={() => handleClickDelete(data)}
					className="p-button-rounded p-button-text p-button-danger"
					icon="pi pi-trash"
				/>
				{data?.status === 1 ? (
					<Button
						tooltip="Khóa tài khoản"
						onClick={() => handleClickLock(data)}
						className="p-button-rounded p-button-text p-button-danger"
						icon="pi pi-lock"
					/>
				) : (
					<Button
						tooltip="Mở tài khoản"
						onClick={() => handleClickLock(data)}
						className="p-button-rounded p-button-text p-button-success"
						icon="pi pi-unlock"
					/>
				)}
			</>
		);
	};

	const genStatusCol = (data) => ACCOUNT_STATUS[data.status];

	const cols = [
		{
			field: "employee_code",
			header: "Mã nhân viên",
		},
		{
			field: "name",
			header: "Họ tên",
		},
		{
			field: "status",
			header: "Trạng thái",
			body: genStatusCol,
		},
		{
			field: "email",
			header: "Email",
		},
		{
			field: "action",
			header: <i className="pi pi-cog" />,
			body: genActionCol,
			style: { textAlign: "center" },
		},
	];

	const columns = cols.map((col) => <Column key={col.field} {...col} />);

	return (
		<>
			<Dialog
				header={"Quyền truy cập chức năng"}
				visible={visible}
				style={{ width: "60%" }}
				onHide={() => setVisible(false)}
			></Dialog>
			<Fieldset className="mt-1" legend="Danh sách User" toggleable>
				<Button
					icon="pi pi-plus"
					className="p-mb-2"
					label="Thêm User"
					onClick={() => props.onOpenDialog()}
				/>
				<CustomDataTable
					dataTable={props?.dataTable}
					selection={dataSelected || props?.dataTable?.[0]}
					selectionMode="single"
					onSelectionChange={handleSelectionChange}
					stripedRows={false}
					rows={5}
					showSearch={true}
				>
					{columns}
				</CustomDataTable>
			</Fieldset>

			<Dialog
				header={"Cập nhật thông tin nhân viên"}
				visible={isOpen}
				style={{ width: "60%" }}
				onHide={() => setIsOpen(false)}
			>
				<UpdateUser user={user} />
			</Dialog>
		</>
	);
};

export default UserGrid;
