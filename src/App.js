/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
import boardsSlice from "./redux/boardsSlice";
import Dashboard from "./components/Dashboard";
import ChartPage from "./components/ChartPage";
import Settings from "./components/Settings";

const Layout = ({ children, isBoardModalOpen, setIsBoardModalOpen }) => {
  return (
    <>
      <Header
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />
      {children}
    </>
  );
};

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  return (
    <div className="overflow-hidden overflow-x-scroll">
      <Routes>
        <Route
          path="/"
          element={
            boards.length > 0 ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <EmptyBoard type="add" />
            )
          }
        />
        <Route
          path="/project/:id"
          element={
            boards.length > 0 ? (
              <Layout
                isBoardModalOpen={isBoardModalOpen}
                setIsBoardModalOpen={setIsBoardModalOpen}
              >
                <Home
                  setIsBoardModalOpen={setIsBoardModalOpen}
                  isBoardModalOpen={isBoardModalOpen}
                />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            boards.length > 0 ? (
              <Layout
                isBoardModalOpen={isBoardModalOpen}
                setIsBoardModalOpen={setIsBoardModalOpen}
              >
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/chart"
          element={
            <Layout
              isBoardModalOpen={isBoardModalOpen}
              setIsBoardModalOpen={setIsBoardModalOpen}
            >
              <ChartPage />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout
              isBoardModalOpen={isBoardModalOpen}
              setIsBoardModalOpen={setIsBoardModalOpen}
            >
              <Settings />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
