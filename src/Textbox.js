import {useState, useEffect} from "react";
// import Axios from 'axios';
import io from 'socket.io-client';

export const Textbox = () => {

    const [text, setText] = useState('');

    const host = 'http://localhost:3002/';
    let socket = io.connect(host);

    // const getText = () => {
    //     Axios.get(host).then((response) => {
    //         setText(response.data[0].content);
    //     })
    // }

    useEffect(() => {
        console.log("Socket changed")
        socket.on("getData", (data) => {
            console.log(`Get new data ${data}`)
            setText(data);
        })
    }, [socket]);

    // useEffect(() => {
    //     let intervalId = setInterval(getText, 10);
    //     return () => clearInterval(intervalId);
    // }, [text])

    const updateText = async () => {
        // Axios.put(host + '1', {
        //     content:value,
        // }).then((response) => {
        //
        // })
        if (text) {
            const data = {
                id: 1,
                text: text
            };
            await socket.emit("edit", data);
        }
    }

    // const handleTextChange = (e) => {
    //     const currentText = e.target.value;
    //     if (!currentText) {
    //         setText('')
    //     }
    //     else {
    //         setText(currentText);
    //         updateText(currentText);
    //     }
    // }

    return (
        <div className="main">
            <div>
                <textarea name="" id="textarea" cols="100" rows="60" placeholder="Enter text" onChange={(e) => {
                    setText(e.target.value)
                    updateText().then(r => console.log("UPDATE"))
                }} value={text}/>
            </div>
        </div>

    )
}
