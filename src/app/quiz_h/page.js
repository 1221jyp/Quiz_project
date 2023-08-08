import Util from "./util";
import { connectDB } from "/Users/jyp/Documents/GitHub/quiz_project/src/util/db.js";

export default async function Quiz_h() {
  const client = await connectDB;
  const db = client.db("Quiz_Data"); //mongodb 불러오기
  let NumberOfQuestion = await db.collection("Quiz").count(); //Quiz collection 안에 있는 데이터의 개수 불러오기
  let result = await db.collection("Quiz").find().toArray(); //Quiz collection 안에 있는 모든 데이터 불러오기

  //_id를 문자열로 변환
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });

  //문제가 랜덤하게 나올수 있도록 Quiz collection 안에 있는 데이터의 개수의 범위 안에서 20개의 랜덤숫자 생성하기

  const numbers = [];

  for (let i = 0; i < NumberOfQuestion; i++) {
    numbers.push(i);
  }
  //

  const answer = [];

  for (let n = 0; n < 20; n++) {
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index]);
    numbers.splice(index, 1);
  }
  return (
    <>
      <Util answer={answer} result={result}></Util>
    </>
  );
}
