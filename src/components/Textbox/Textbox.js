import {useState, useEffect} from "react";
import Axios from 'axios';
import './Textbox.css';



export const Textbox = ({host, socket}) => {

    const [text, setText] = useState('');

    useEffect(() => {
        Axios.get(host + 'data').then((response) => {
            setText(response.data[0].content);
        })
    }, [])

    useEffect(() => {
        socket.on("updated_data", (data) => {
            setText(data);
        })
    }, [socket]);

    useEffect(() => {
        updateText().then(r => {
        })
    }, [text])


    const updateText = async () => {
        let dataToSend = text ? text : '';
        const data = {
            id: 1,
            text: dataToSend
        };
        await socket.emit("edit", data);
    }

    const handleOnChange = (e) => {
        const newText = e.target.value.length !== 0 ? e.target.value : '';
        setText(newText);
    }

    return (
        <div className="main">
            <div>
                <textarea name="" id="textarea" cols="100" rows="60" placeholder="Enter text" onChange={handleOnChange}
                          value={text}/>
            </div>
        </div>

    )
}
