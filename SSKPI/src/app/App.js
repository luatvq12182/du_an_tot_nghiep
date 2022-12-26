import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { FONT_FAMILY, LAYOUT, THEME } from "constants/app";
import { Button } from "primereact/button";
import Content from "./Content";
import SideBar from "./SideBar";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";

function App() {
	const [theme, setTheme] = useState(() => {
		const theme = localStorage.getItem("theme");
		return theme ?? "";
	});
	const [visibleRight, setVisibleRight] = useState(false);
	const [layout, setLayout] = useState(() => {
		const layout = JSON.parse(localStorage.getItem("layout"));
		return layout ?? { name: "Horizontal", code: "HORIZONTAL" };
	});
	const [fontFamily, setFontFamily] = useState(() => {
		const fontFamily = JSON.parse(localStorage.getItem("fontFamily"));
		return (
			fontFamily ?? {
				id: 1,
				name: "Inter",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
			}
		);
	});

	useEffect(() => {
		let themeLink = document.getElementById("app-theme");
		if (themeLink && theme) {
			themeLink.href = theme;
			localStorage.setItem("theme", theme);
		}
	}, [theme, layout]);

	useEffect(() => {
		document.getElementById("app-fontFamily").href = fontFamily.href;
	}, [fontFamily]);

	const handleChangeLayout = (e) => {
		setLayout(e.value);
		localStorage.setItem("layout", JSON.stringify(e.value));
	};

	const handleChangeFontFamily = (e) => {
		setFontFamily(e.value);
		localStorage.setItem("fontFamily", JSON.stringify(e.value));
	};

	return (
		<div className="layout-wrapper">
			<TopBar layout={layout} />
			{layout.name === "Vertical" && <SideBar />}
			<Content layout={layout} />

			{/* Sidebar setting */}
			<Button
				icon="pi pi-cog"
				onClick={() => setVisibleRight(true)}
				className="p-mr-2 p-button-lg button-change-theme"
			/>
			<Sidebar
				visible={visibleRight}
				position="right"
				onHide={() => setVisibleRight(false)}
			>
				<h3>Choose Theme</h3>
				{THEME.map((theme) => {
					return (
						<Button
							key={theme.href}
							onClick={() => setTheme(theme.href)}
							className="p-button-text"
							label={
								<img
									width="50px"
									src={theme.img}
									alt="Bootstrap Light Blue"
								/>
							}
						/>
					);
				})}

				<h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
					Layout
				</h3>
				<Dropdown
					value={layout}
					options={LAYOUT}
					onChange={handleChangeLayout}
					optionLabel="name"
					placeholder="Select Layout"
					style={{
						width: "100%",
					}}
				/>

				<h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
					Font Family
				</h3>
				<Dropdown
					value={fontFamily}
					options={FONT_FAMILY}
					onChange={handleChangeFontFamily}
					optionLabel="name"
					placeholder="Select Font Family"
					style={{
						width: "100%",
					}}
				/>
			</Sidebar>
		</div>
	);
}

export default App;
