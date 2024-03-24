import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user);

  // useEffect(() => {
  //   // If the user object does not have an id, it means the user is not logged in
  //   if (!user) {
  //     history.push('/home');
  //   }
  // }, [user, history]);

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {
        dispatch({ type: "LOGOUT" });
        history.push("/home");
      }}
    >
      LOG OUT
    </button>
  );
}

export default LogOutButton;
