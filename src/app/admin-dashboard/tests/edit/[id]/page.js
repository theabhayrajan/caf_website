import EditClient from "./EditClient";

export default async function Page({ params }) {
  const { id } = await params; 

  return <EditClient id={id} />;
}