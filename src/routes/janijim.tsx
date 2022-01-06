import { Outlet, useSearchParams } from "react-router-dom";
import QueryNavLink from "../components/Links/QueryNavLink";
import { Colors } from "../constants/colors";
import { getJanijim } from "../services/janijim";

export default function Janijim() {
    let janijim = getJanijim()
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <div style={{ display: "flex" }}>
            <nav
                style={{
                    borderRight: "solid 1px",
                    padding: "1rem"
                }}
            >
                <input
                    className="form-control"
                    value={searchParams.get("filter") || ""}
                    onChange={event => {
                        let filter = event.target.value;
                        if (filter) {
                            setSearchParams({ filter });
                        } else {
                            setSearchParams({});
                        }
                    }}
                />
                {
                    janijim
                        .filter(invoice => {
                            let filter = searchParams.get("filter");
                            if (!filter) return true;
                            let name = invoice.name.toLowerCase();
                            return name.startsWith(filter.toLowerCase());
                        })
                        .map(janij => (
                            <QueryNavLink
                                style={({ isActive }: any) => {
                                    return {
                                        display: "block",
                                        margin: "1rem 0",
                                        color: isActive ? Colors.primary : Colors.secondary
                                    };
                                }}
                                to={`/janijim/${janij.ID}`}
                                key={janij.ID}
                            >
                                {janij.name}
                            </QueryNavLink>
                        ))}
            </nav>
            <Outlet />
        </div>
    );
}