import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./page/Landing/Landing";
import Main from "./page/Main/Main";
import Signin from "./page/Auth/Signin";
import Signup from "./page/Auth/Signup";
import MyDay from "./page/Myday/MyDay";
import Important from "./page/Important/Important";
import Task from "./page/Task/Task";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import GlobalState from "./Context/ContextProvider.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <GlobalState>
                  <Main/>
                </GlobalState>
              </ProtectedRoute>
            }
          >
            <Route index element={<MyDay />} />
            <Route path="myday" element={<MyDay />} />
            <Route path="important" element={<Important />} />
            <Route path="tasks" element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
