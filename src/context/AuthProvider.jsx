import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const auth = getAuth();
  useEffect(() => {
    const unsubscrible = auth.onIdTokenChanged((authUser) => {
      console.log("onidtokenchanged", authUser?.uid);
      if (authUser?.uid) {
        setUser(authUser);
        if (authUser.accessToken !== localStorage.getItem("accessToken")) {
          window.location.reload();
          localStorage.setItem("accessToken", authUser.accessToken);
        }
        setIsLoading(false);
        return;
      }

      setUser({});
      localStorage.clear();
      setIsLoading(false);
      navigate("/login");
    });

    return () => {
      unsubscrible();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
