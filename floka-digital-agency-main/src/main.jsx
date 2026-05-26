import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "../src/route/Route";
import Preloader from "../src/components/Common/Preloader";
import "./index.css";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      <Preloader isLoading={isLoading} />

      {!isLoading && <RouterProvider router={router} />}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
