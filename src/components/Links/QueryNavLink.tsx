import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }: any) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink