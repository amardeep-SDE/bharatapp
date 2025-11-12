import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";

const App: React.FC = () => (
  <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
