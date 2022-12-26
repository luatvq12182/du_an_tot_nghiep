import PrivateRoute from "components/PrivateRoute";
import routes from "./routes";

const ContainerRoute = () => {
	return routes.map((route) => {
		const { name, ...rest } = route;

		return <PrivateRoute key={name} {...rest} />;
	});
};

export default ContainerRoute;
