import "./index.css";
import InterceptLandingPage from "./page.jsx";
import { ViteReactSSG } from "vite-react-ssg/single-page";

export const createRoot = ViteReactSSG(<InterceptLandingPage />);
