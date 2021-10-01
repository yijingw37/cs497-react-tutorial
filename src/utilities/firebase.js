import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADYPn5fY1sc81sUTADtSwjLsH7JqbeaGI",
  authDomain: "react-tutorial-a0997.firebaseapp.com",
  databaseURL: "https://react-tutorial-a0997-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-a0997",
  storageBucket: "react-tutorial-a0997.appspot.com",
  messagingSenderId: "24998682452",
  appId: "1:24998682452:web:8ebc3b0ef0e33e42c6f2c1",
  measurementId: "G-FKLRLTJCBC",
};

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) {
      console.log(`loading ${path}`);
    }
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) {
          console.log(val);
        }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);