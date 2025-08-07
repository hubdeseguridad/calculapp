import { Link } from "react-router-dom";
import Button from "@/components/Button";
import PageTitle from '../components/PageTitle';

export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <PageTitle>
        Bienvenido a la calculadora de precios
      </PageTitle>
      <p>Selecciona tu rol para continuar:</p>
      <div className="gp-buttons" style={{ justifyContent: 'center' }}>
        <Link to="/sales" className="button" style={{ width: 'auto', fontSize: '1.175rem', padding: '1rem 2rem' }}>
          <Button text="💰 Soy vendedor"/>
        </Link>
        <Link to="/admin" className="button secondary" style={{ width: 'auto', fontSize: '1.175rem', padding: '1rem 2rem' }}>
          <Button text="⚙️ Soy administrador" />
        </Link>
      </div>
    </div>
  );
}
