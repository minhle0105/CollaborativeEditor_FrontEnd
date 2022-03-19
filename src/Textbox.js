import {useState, useEffect} from "react";
import Axios from 'axios';

export const Textbox = () => {

    const [text, setText] = useState('');

    const host = 'http://192.168.0.122:3001/';

    const getText = () => {
        Axios.get(host).then((response) => {
            setText(response.data[0].content);
        })
    }

    useEffect(() => {
        getText()
    }, [text]);

    useEffect(() => {
        let intervalId = setInterval(getText, 10);
        return () => clearInterval(intervalId);
    }, [text])

    const updateText = (value) => {
        Axios.put(host + '1', {
            content:value,
        }).then((response) => {

        })
    }

    const handleTextChange = (e) => {
        const currentText = e.target.value;
        if (!currentText) {
            setText('')
            updateText('');
        }
        else {
            setText(currentText);
            updateText(currentText);
        }
    }

    return (
        <div className="main">
            <div>
                <textarea name="" id="textarea" cols="100" rows="60" placeholder="Enter text" onChange={handleTextChange} value={text}/>
            </div>
        </div>

    )
}
