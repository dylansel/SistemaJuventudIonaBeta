import React from 'react';
import './styles/App.css';
import { Route, Routes } from "react-router-dom";
import {
  Areas,
  Groups,
  Families,
  Dashboard,
  Login,
  NotFound,
  Janijim,
  Loading,
  Activities,
  Attendance,
  Prices,
  PricingCases, 
  Payments,
  Grants,
  SpecialPrices,
  AttendanceSelectArea,
  AttendanceSelectGroup,
  AttendanceList
} from "./pages"
import Navbar from './components/UI/Layout/HeaderNav';
import SelectDate from './pages/misc/SelectDate';
import useAuthJuventudIona from './auth/authUtils';

function App() {
  const { isLoading, isAuthenticated,user } = useAuthJuventudIona();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="container-fluid flex-grow-1">
        <Routes>
          <Route path="/">
            <Route
              index
              element={isAuthenticated ? <Dashboard /> : <Login />}
            />
            <Route path="janijim" element={!isAuthenticated?<Login />:<Janijim />} />
            {/* <Route path="areas" element={<Areas />} /> */}
            {/* <Route path="groups" element={!isAuthenticated?<Login />:<Groups />} /> */}
            {/* <Route path="families" element={!isAuthenticated?<Login />:<Families />} /> */}
            {/* <Route path="activities" element={<Activities />} /> */}
            <Route path="attendance" element={!isAuthenticated?<Login />:<Attendance />} />
            <Route path="attendance/:activityId" element={!isAuthenticated?<Login />:<AttendanceSelectArea />} />
            <Route path="attendance/:date/:area" element={!isAuthenticated?<Login />:<AttendanceSelectGroup />} />
            <Route path="attendance/:date/:area/:group" element={!isAuthenticated?<Login />:<AttendanceList />} />
            {/* <Route path="prices" element={<SelectDate name="Precios" goTo="prices"/>} /> */}
            {/* <Route path="prices/:month" element={<Prices />} /> */}
            {/* <Route path="payments" element={<Payments />} /> */}
            {/* <Route path="grants" element={<Grants />} /> */}
            {/* <Route path="pricingCases" element={<PricingCases />} /> */}
            {/* <Route path="specialPrices" element={<SpecialPrices />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;