import React, { Suspense } from "react";
import classNames from "classnames";
import ContainerRoute from "routes/ContaiterRoute";

const Content = (props) => {
	const classContent = classNames("layout-content", {
		"mx-auto pt-0": props.layout.name === "Horizontal",
	});

	return (
		<div className={classContent}>
			<div className="content-section implementation">
				<Suspense fallback={"Loading..."}>
					<ContainerRoute />
				</Suspense>
			</div>
		</div>
	);
};

export default React.memo(Content);
