import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import axios from "axios";
import ArticleBrowser from "./pages/ArticleBrowser";
import ArticleViewer from "./pages/ArticleViewer";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HealthTrackingPage from "./pages/HealthTrackingPage";
import ProtectedRoute from "./components/ProtectedRoute";

let client;

if (window.localStorage.getItem("logged-in") === "true") {
    client = axios.create({
        baseURL: "http://localhost:4567/api/v1",
        headers: {
            Authorization: window.localStorage.getItem("token")
        }
    })
} else {
    client = axios.create({
        baseURL: "http://localhost:4567/api/v1"
    })
}

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/forecast" element={<Forecast />}/>
                        <Route path="/articles" element={<ArticleBrowser />}/>
                        <Route path="/articles/viewer/:id" element={<ArticleViewer />}/>
                        <Route path="/tracker" element={<ProtectedRoute><HealthTrackingPage/></ProtectedRoute>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="/signin" element={<SignInPage/>}/>
                        <Route path="*" element="404"/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
export { client }
