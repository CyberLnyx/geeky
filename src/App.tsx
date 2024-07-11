import { useEffect, useState } from "react";
import "./App.css";
import Router from "./router/Router";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
