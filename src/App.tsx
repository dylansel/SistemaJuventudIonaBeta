import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
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
  PricesByMonth,
  PricingCases, 
  Payments,
  Grants,
  SpecialPrices,
  AttendanceSelectArea,
  AttendanceSelectGroup,
  AttendanceList
} from "./pages"
import Navbar from './components/UI/Layout/HeaderNav';

function App() {
  const { isLoading, isAuthenticated } = useAuth0()

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
            <Route path="janijim" element={<Janijim />} />
            <Route path="areas" element={<Areas />} />
            <Route path="groups" element={<Groups />} />
            <Route path="families" element={<Families />} />
            <Route path="activities" element={<Activities />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/:activityId" element={<AttendanceSelectArea />} />
            <Route path="attendance/:activityId/:areaId" element={<AttendanceSelectGroup />} />
            <Route path="attendance/:activityId/:areaId/:groupId" element={<AttendanceList />} />
            <Route path="prices" element={<Prices />} />
            <Route path="prices/:month" element={<PricesByMonth />} />
            <Route path="payments" element={<Payments />} />
            <Route path="grants" element={<Grants />} />
            <Route path="pricingCases" element={<PricingCases />} />
            <Route path="SpecialPrices" element={<SpecialPrices />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;