import App from '../App';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Janijim from '../pages/janijim';
import JanijimList from '../pages/janijimList';
import Familias from '../pages/familias';
import Groups from '../pages/groups';
import Janij from '../pages/janij';
import NotFound from '../pages/notFound'

const MainRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    index
                    element={<Dashboard />}
                />
                <Route path="janijim" element={<JanijimList />}>
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
                <Route path="familias" element={<Familias />} />
                <Route path="groups" element={<Groups />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default MainRoutes
