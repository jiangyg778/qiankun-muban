import { Routes, Route } from "react-router-dom";
import Control from "@/pages/control";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Control />} />

      <Route path="/react/control" element={<Control />} />
    </Routes>
  );
}
export default Router;
