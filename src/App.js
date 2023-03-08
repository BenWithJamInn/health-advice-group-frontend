import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:4567/api/v1"
})

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/forecast" element={<Forecast />}/>
                        <Route path="*" element="404"/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
export { client }
