import './App.css';
import {Textbox} from "../Textbox/Textbox";
import io from "socket.io-client";

const host = 'http://192.168.0.122:3002/';
let socket = io.connect(host);

function App() {
    return (
        <div className="App">
            <h1>Simple Collaborative Editor</h1>
            <Textbox host={host} socket={socket}/>
        </div>
    );
}

export default App;
