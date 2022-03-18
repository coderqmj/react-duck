import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Mine from '@/pages/profile';
import { Redirect } from './components/Redirect';
import { HomeRouteRender } from './pages/home/HomeRouter';
export default function RoutesRegister() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Redirect url="home" />} />
        <Route path="home" element={<HomeRouteRender />}>
          <Route path="home/detail" element={<Mine />} />
        </Route>
        <Route path="mine" element={<Mine />}>
          <Route path="mine/detail" element={<HomeRouteRender />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
