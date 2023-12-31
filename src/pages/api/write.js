import { connectDB } from "/Users/jyp/Documents/GitHub/quiz_project/src/util/db.js";
export default async function handler(req, res) {
  try {
    const db = (await connectDB).db("Quiz_Data");
    db.collection("Quiz").insertOne(req.body);
    //작업이 끝나면 메인 페이지로 이동
    res.redirect(302, "/");
    //오류발생시 실행될 함수
  } catch (error) {
    return res.status(500).json("서버 오류");
  }
}
