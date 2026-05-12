import "./index.css";
import InterceptLandingPage from "./page.jsx";
import { ViteReactSSG } from "vite-react-ssg";

export const createRoot = ViteReactSSG(<InterceptLandingPage />);
