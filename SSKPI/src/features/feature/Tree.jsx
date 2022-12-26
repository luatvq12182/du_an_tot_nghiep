import { useRef, useState } from "react";
import { Tree } from "primereact/tree";
import { ContextMenu } from "primereact/contextmenu";

const TreeFeature = (props) => {
	const [selectedKey, setSelectedKey] = useState("999");
	const [selectedNodeKey, setSelectedNodeKey] = useState(null);
	const cm = useRef(null);

	const treeData = [
		{
			key: "999",
			label: "Nhóm chức năng",
			children: [
				{
					key: "0",
					label: "Yêu cầu tuyển dụng",
					children: [
						{ key: "1", label: "Danh sách yêu cầu" },
						{ key: "2", label: "Tạo yêu cầu" },
						{ key: "3", label: "Cập nhật yêu cầu" },
						{ key: "4", label: "Xóa yêu cầu" },
						{ key: "5", label: "Phê duyệt yêu cầu" },
						{ key: "6", label: "Từ chối yêu cầu" },
						{ key: "7", label: "Chi tiết yêu cầu" },
					],
				},
				{
					key: "8",
					label: "Ứng viên",
					children: [
						{ key: "9", label: "Danh sách ứng viên" },
						{ key: "10", label: "Tạo nguồn ứng viên" },
						{ key: "11", label: "Cập nhật ứng viên" },
						{ key: "12", label: "Xóa ứng viên" },
						{ key: "15", label: "Chi tiết ứng viên" },
					],
				},
				{
					key: "16",
					label: "Lịch phỏng vấn",
					children: [
						{ key: "17", label: "Danh sách lịch phỏng vấn" },
						{ key: "18", label: "Tạo lịch phỏng vấn" },
						{ key: "19", label: "Chi tiết lịch phỏng vấn" },
					],
				},
				{
					key: "20",
					label: "Đánh giá ứng viên",
					children: [
						{ key: "21", label: "Đánh giá" },
						{ key: "22", label: "Tạo đánh giá ứng viên" },
						{ key: "23", label: "Chi tiết lịch phỏng vấn" },
						{ key: "24", label: "Sửa đánh giá" },
						{ key: "25", label: "Chi tiết đánh giá" },
					],
				},
			],
		},
	];

	// Cập nhật
	// Xóa
	const menu = [
		{
			label: "Thêm mới",
			icon: "pi pi-plus",
			command: () => {},
		},
		{
			label: "Sao chép",
			icon: "pi pi-copy",
			command: () => {},
		},
		{
			label: "Cập nhật",
			icon: "pi pi-pencil",
			command: () => {},
		},
		{
			label: "Xóa",
			icon: "pi pi-trash",
			command: () => {},
		},
	];

	const handleSelectionChange = (e) => {
		setSelectedKey(e.value);

		// props.callback(Number(e.value));
	};

	return (
		<>
			<ContextMenu
				model={menu}
				ref={cm}
				onHide={() => setSelectedNodeKey(null)}
			/>
			<Tree
				value={treeData}
				selectionMode="single"
				selectionKeys={selectedKey}
				expandedKeys={selectedKey}
				onSelectionChange={handleSelectionChange}
				contextMenuSelectionKey={selectedNodeKey}
				onContextMenuSelectionChange={(event) =>
					setSelectedNodeKey(event.value)
				}
				onContextMenu={(event) => cm.current.show(event.originalEvent)}
			/>
		</>
	);
};

export default TreeFeature;
