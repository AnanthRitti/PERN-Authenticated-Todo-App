import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Modal({ mode, setShowModel, task, getData }) {
    const [cookie, setCookie, removeCookie] = useCookies(null);

    const editMode = mode === 'edit' ? true : false;

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookie.Email,
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : 5
    });

    function handle(e) {
        const { name, value } = e.target;

        setData((data) => ({
            ...data,
            [name]: value
        }));
    }

    async function postData(e) {
        e.preventDefault();
        try {
            const resp = await axios.post('http://localhost:3000/todos/', data);
            if (resp.status === 200) {
                setShowModel(false);
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function editData(e) {
        e.preventDefault();
        try {
            const resp = await axios.put(`http://localhost:3000/todos/${task.id}`, data);
            if (resp.status === 200) {
                setShowModel(false);
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="title-container">
                    <h3>Lets create</h3>
                    <button onClick={() => setShowModel(false)}>X</button>
                </div>
                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder="Your task goes here"
                        name="title"
                        value={data.title}
                        onChange={handle}
                    />
                    <br />
                    <input
                        required
                        type="range"
                        min="0"
                        max="10"
                        name="progress"
                        value={data.progress}
                        onChange={handle}
                    />
                    <button onClick={editMode ? editData : postData}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
