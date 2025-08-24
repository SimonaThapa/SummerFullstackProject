import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateQuestionSetPage from "./pages/QuestionSet/CreateQuestionSetPage";
import { jwtDecode } from "jwt-decode";
import ListQuestionSetPage from "./pages/QuestionSet/ListQuestionSetPage";
import AttemptQuizPage from "./pages/QuestionSet/AttemptQuizPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

// ----------------- Interfaces -----------------
export interface IAuthState {
  isAuth: boolean;
  roleState: "admin" | "professional" | "guest";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JWTDecode {
  role: "admin" | "professional";
  id: string;
}

// ----------------- Context -----------------
export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  roleState: "guest",
  setAuthState: () => {},
});

// ----------------- Main App -----------------
function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    roleState: "guest",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("state => ", authState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // ✅ CHANGE THIS URL to match your backend verify endpoint!
        const response = await axios.get("http://localhost:5000/users/verify", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("verify response =>", response.data);

        // Decode role from token
        const { role }: JWTDecode = jwtDecode(accessToken as string);

        setAuthState({
          isAuth: true,
          roleState: role,
        });
      } catch (error: any) {
        console.error("verify/me error =>", error);

        localStorage.clear();

        alert(
          error?.response?.data?.message ||
            error.message ||
            "An error occurred during verification"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth: authState.isAuth,
          roleState: authState.roleState,
          setAuthState: setAuthState,
        }}
      >
        <Navbar />
        <Routes>
          {/* normal */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {/* unauth routes */}
          {!authState?.isAuth && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}

          {/* auth routes */}
          {authState?.isAuth && (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/questionset/list"
                element={<ListQuestionSetPage />}
              />
              <Route
                path="questionset/:id/attempt"
                element={<AttemptQuizPage />}
              />
            </>
          )}

          {/* admin routes */}
          {authState?.roleState === "admin" && (
            <>
              <Route
                path="/admin/questionset/create"
                element={<CreateQuestionSetPage />}
              />
            </>
          )}

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;

