import { redirect } from "next/navigation";

export default function Home() {

  redirect("/transactions");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Buenos días, Jorge</h1>
      <p className="mt-2 text-gray-600">Esto es lo que debes saber sobre tu dinero hoy</p>
    </div>
  );
}
