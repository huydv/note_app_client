import React, { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // console.log("user login get from auth context", user);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const data = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid,
        name
      }
    }`,
      variables: {
        uid,
        displayName,
      },
    });
  };
  // useEffect(() => {
  //   console.log("login effect", user?.uid);
  //   if (user?.uid) {
  //     navigate("/");
  //     return;
  //   }ro
  // }, []);
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
