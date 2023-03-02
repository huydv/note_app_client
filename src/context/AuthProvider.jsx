import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const auth = getAuth();
  useEffect(() => {
    const unsubscrible = auth.onIdTokenChanged((authUser) => {
      console.log("onidtokenchanged", authUser?.uid);
      if (authUser?.uid) {
        setUser(authUser);
        if (authUser.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", authUser.accessToken);
        }
        return;
      }

      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubscrible();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
