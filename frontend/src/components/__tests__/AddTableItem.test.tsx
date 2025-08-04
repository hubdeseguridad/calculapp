import { render, screen } from "@testing-library/react";
import AddTableItem from "../AddTableItem";
import { vi } from "vitest";

test("renderiza el formulario de agregar curso", () => {
    render(<AddTableItem onAddItem={vi.fn()} />);
    expect(screen.getByText(/Agregar/i)).toBeInTheDocument();
});
