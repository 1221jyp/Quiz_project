import Checkbox from "./Checkbox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Newquiz() {
  let session = await getServerSession(authOptions);
  return (
    <>
      <div className="container">
        <Checkbox session={session}></Checkbox>
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
