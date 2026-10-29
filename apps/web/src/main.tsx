import { createRoot } from "react-dom/client";
import "./style.css";
import Login from "@ui/components/login";

createRoot(document.getElementById("app")!).render(<Login />);
