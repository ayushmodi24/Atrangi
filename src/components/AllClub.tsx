import { useParams } from "react-router-dom";
import Painting from "./Painting";

export default function AllClub() {
  const { title } = useParams<{ title: string }>();

  return (
    <div>
      {title === "Painting" && <Painting />}
      {title === "Chauk" && <h1>This is the Chauk Club Page</h1>}
      {title === "OpenShow" && <h1>This is the Drama Club Page</h1>}
      {!["Painting", "Chauk", "OpenShow"].includes(title ?? "") && (
        <h1>Page not found for "{title}"</h1>
      )}
    </div>
  );
}
