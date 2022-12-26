import { Column } from "primereact/column";

export const genStyle = (width, isCenter = true) => ({
    width,
    textAlign: isCenter ? "center" : "left"
});

export const genColumns = (cols) => 
	cols.map((col) => <Column key={col.field} {...col} />);
