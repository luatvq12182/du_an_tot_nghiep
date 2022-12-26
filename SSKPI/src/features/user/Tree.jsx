import { Tree } from "primereact/tree";
import { useState } from "react";

const TreeUser = (props) => {
	const [selectedKey, setSelectedKey] = useState("999"); // type = String

	const treeData = [
		{
			key: "999",
			label: "SSKPI",
			children: [
				{ key: "0", label: "Trưởng phòng" },
				{ key: "1", label: "Trưởng phòng nhân sự" },
				{ key: "2", label: "HR" },
				{ key: "3", label: "Người phỏng vấn" },
			],
		},
	];

	const handleSelectionChange = (e) => {
		setSelectedKey(e.value);
		props.callback(Number(e.value));
	};

	return (
		<Tree
			selectionMode="single"
			selectionKeys={selectedKey}
			expandedKeys={selectedKey}
			onSelectionChange={handleSelectionChange}
			value={treeData}
		/>
	);
};

export default TreeUser;
