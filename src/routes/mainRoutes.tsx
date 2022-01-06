import App from '../App';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Janijim from './janijim';
import Familias from './familias';
import Groups from './groups';
import Janij from './janij';
import NotFound from './notFound'

const MainRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
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
                <Route path="familias" element={<Familias />} />
                <Route path="groups" element={<Groups />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default MainRoutes
