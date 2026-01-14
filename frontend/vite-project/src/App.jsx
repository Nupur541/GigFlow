import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import PostGig from "./pages/PostGig";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/post-gig"
          element={
            <ProtectedRoute>
              <PostGig />
            </ProtectedRoute>
          }
        />

        <Route path="/gigs/:id" element={<GigDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
