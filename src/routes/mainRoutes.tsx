import App from '../App';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Janijim from '../pages/Janijim';
import Groups from '../pages/Groups';
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard';
import Areas from '../pages/Areas';
import Families from '../pages/Families';
import Login from '../pages/Login';

const MainRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    index
                    element={<Dashboard />}
                />
                <Route path="janijim" element={<Janijim />} />
                <Route path="areas" element={<Areas />} />
                <Route path="groups" element={<Groups />} />
                <Route path="families" element={<Families />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
}

export default MainRoutes
