import { connectDB } from "/Users/jyp/Documents/GitHub/quiz_project/src/util/db.js";
import Checkbox from "./Checkbox";

export default async function Newquiz() {
  const client = await connectDB;
  const db = client.db("Quiz_Data");
  let result = await db.collection("Quiz").find().toArray();
  console.log(result);
  return (
    <>
      <div className="container">
        <Checkbox></Checkbox>
      </div>
      <div className="howto">
        <h2>퀴즈 작성하는법</h2>
        <h4>1) 문제의 내용을 입력해줍니다.</h4>
        <h4>2) 5문항 모두 문제를 작성해줍니다.</h4>
        <h4>3) 정답인 문항의 왼쪽에 체크표시를 해줍니다.</h4>
      </div>
    </>
  );
}
