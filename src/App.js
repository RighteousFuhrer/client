import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CategoriesStats from "./components/categoriesStat";
import ItemList from "./components/ItemList";
import MyNavbar from "./components/navbar";
import TimeStats from "./components/timeStat";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="expenses" element={<ItemList />} />
        <Route path="stats/categories" element={<CategoriesStats />} />
        <Route path="stats/month" element={<TimeStats />} />
      </Routes>
    </>
  );
}

export default App;
