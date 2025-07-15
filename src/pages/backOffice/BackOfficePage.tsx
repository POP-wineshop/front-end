import BackOfficeSidebar from '@/components/backOffice/sidebar/BackOfficeSidebar';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPanel from '@/components/backOffice/dashboard/DashboardPanel';
import ProductListPanel from '@/components/backOffice/product/list/ProductListPanel';
import ProductRegisterPanel from '@/components/backOffice/product/register/ProductRegisterPanel';
import OrderPanel from '@/components/backOffice/order/OrderListPanel';
import UserListPanel from '@/components/backOffice/user/UserListPanel';

const BackOfficePage = () => {
  return (
    <>
      <div className="flex">
        <BackOfficeSidebar />
        <div className="flex w-full p-6">
          <Routes>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPanel />} />
            <Route path="product/list" element={<ProductListPanel />} />
            <Route path="product/register" element={<ProductRegisterPanel />} />
            <Route path="order/list" element={<OrderPanel />} />
            <Route path="user/list" element={<UserListPanel />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default BackOfficePage;
