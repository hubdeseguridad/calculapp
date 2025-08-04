import { Link } from "react-router-dom";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="home-page">
      <h1>CalculAPP</h1>
      <div className="button-group">
        <Link to="/sales">
          <Button text="Ir a Calculadora" />
        </Link>
        <Link to="/admin">
          <Button text="Ir a Administrador" />
        </Link>
      </div>
    </div>
  );
}
