import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { VLink, HaloMotif } from "@/brand/ui";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="v-site v-dark" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", textAlign: "center", padding: 24 }}>
      <div className="v-kolam" />
      <HaloMotif style={{ position: "absolute", width: 700, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} opacity={0.2} />
      <div style={{ position: "relative" }}>
        <img src="/vedamala-mark.png" alt="Vedamala Group" style={{ width: 110, margin: "0 auto" }} />
        <h1 className="v-display v-display-l" style={{ marginTop: 28 }}>Page not found</h1>
        <p className="v-lead" style={{ marginTop: 14 }}>The page you're looking for has moved or doesn't exist.</p>
        <VLink to="/" className="v-btn v-btn-brass" style={{ marginTop: 30 }}>Return home</VLink>
      </div>
    </div>
  );
};

export default NotFound;
