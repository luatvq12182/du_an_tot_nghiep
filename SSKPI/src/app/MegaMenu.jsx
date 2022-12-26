import { Link } from "react-router-dom";

const MegaMenu = (props) => {
	return (
		<ul className="sskpi_menu" id="menu">
			<li>
				<span>Ung vien</span>
				<ul className="sskpi_submenu">
					<li>
						<Link to="/admin/candidate">Danh sach ung vien</Link>
					</li>
					<li>
						<Link to="/admin/candidate/create">
							Tao nguon ung vien
						</Link>
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default MegaMenu;
