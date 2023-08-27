import { connectDB } from "/Users/jyp/Documents/GitHub/quiz_project/src/util/db.js";
import "./style.css";

export default async function Ranking() {
  const client = await connectDB;
  const db = client.db("Score");
  let result = await db.collection("userscore").find().sort({ result: -1 }).toArray();

  return (
    <div className="list">
      <h1>순위판</h1>
      {result.map((a, i) => (
        <div className="container">
          <div className="text"> {i + 1} 위</div>
          <div className="text">이름 : {result[i].user}</div>
          <div className="text">점수 : {result[i].result}</div>
        </div>
      ))}
    </div>
  );
}
