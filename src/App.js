import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/home/HomePage";
import Navigation from "./components/layout/Navigation";
import AdminPage from "./components/admin/AdminPage";
import EditPage from "./components/admin/pages/EditPage";
import Page from "./components/home/page/Page";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/page/:id" element={<Page />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/edit/:id" element={<EditPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
