import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

function ListHeader(props) {
  const [showModel, setShowModel] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(null);

  function signout() {
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }

  return (
    <div className="list-header">
      <h1>{props.listName}</h1>
      <div className="btn-container">
        <button className="add-btn" onClick={() => setShowModel(true)}>ADD</button>
        <button className="signout" onClick={signout}>SIGN OUT</button>
      </div>
      {showModel && <Modal mode={'create'} setShowModel={setShowModel} getData={props.getData} />}
    </div>
  );
}

export default ListHeader;
