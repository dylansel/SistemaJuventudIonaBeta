import App from '../App';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Janijim from '../pages/Janijim';
import Families from '../pages/Families';
import Groups from '../pages/Groups';
import Janij from '../pages/Janij';
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard';

const MainRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    index
                    element={<Dashboard />}
                />
                <Route path="janijim" element={<Janijim />}>
                    <Route
                        index
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>Elegí un janij</p>
                            </main>
                        }
                    />
                    <Route path=":ID" element={<Janij />} />
                </Route>
                <Route path="familias" element={<Families />} />
                <Route path="groups" element={<Groups />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default MainRoutes
