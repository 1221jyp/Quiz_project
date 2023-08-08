"use client";
import LoadingPage from "../loading";
import "./style.css";
import React, { useEffect } from "react";

export default async function Util({ result, answer }) {
  const onlyone = (checkThis) => {
    const checkboxes = document.getElementsByClassName("q");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  useEffect(() => {
    //로딩이 완료되었다면 로딩페이지 제거
    // 변수/상수 선언
    const outer = document.querySelector(".outer");
    const innerList = document.querySelector(".inner-list");
    const inners = document.querySelectorAll(".inner");
    const loading = document.getElementById("load");
    const buttonRight = document.querySelector(".button-right");
    const showScore = document.querySelector("#score");
    const showResult = document.querySelector(".black-bg");
    const submitButton = document.querySelector(".submitButton");

    var count = 0;
    var score = 0;
    var IsitCorrect = new Object();

    //다음문제 버튼을 클릭하였을시 실행되는 함수
    buttonRight.addEventListener("click", () => {
      const parentComponent = document.getElementById(count);
      const countCheckbox = parentComponent.querySelectorAll('input[type="checkbox"]');

      let isChecked = false;

      // 모든 체크박스를 반복하며 체크 상태를 확인합니다.
      for (let i = 0; i < countCheckbox.length; i++) {
        if (countCheckbox[i].checked) {
          isChecked = true;
          break; // 하나라도 체크되어 있으면 루프를 종료합니다.
        }
      }

      //하나도 체크되어 있지 않다면
      if (!isChecked) {
        alert("체크박스를 체크하여 정답을 선택하세요!");
      }
      //그렇지 않으면
      else {
        //다음 문제로 넘기기
        currentIndex++;
        currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex;
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;

        //체크된 체크박스값 보기
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const checkedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);

        //19번째 문제에 도달했을때, 20번째 문제의 버튼은 '제출'로 보이게 하기
        if (count >= 18) {
          buttonRight.innerText = "제출";
        }
        //마지막 문제까지 제출하면, 결과 보여주기
        if (count == 19) {
          showResult.classList.add("show-modal");
        }

        //체크박스에 입력한 문제가 정답이라면 answer에 1을 넣고, 스코어 추가
        else if (checkedValues == result[answer[count]].a) {
          IsitCorrect["answer" + count] = 1;
          score++;
          showScore.innerText = `${score * 5}`;
        }
        //오답시 answer에 0을 넣기
        else {
          IsitCorrect["answer" + count] = 0;
        }
        //카운트 추가
        count++;
      }
    });

    submitButton.addEventListener("click", async () => {
      console.log(IsitCorrect);
      IsitCorrect["result"] = score * 5;
      await fetch("/api/result", {
        method: "POST",
        body: JSON.stringify(IsitCorrect),
      }).then(() => {
        console.log("success");
        alert("제출완료");
      });
    });

    //문제 개수만큼 div박스 늘리기
    let currentIndex = 0;

    if (outer && innerList && inners) {
      inners.forEach((inner) => {
        inner.style.width = `${outer.clientWidth}px`;
      });

      innerList.style.width = `${outer.clientWidth * inners.length}px`;
    }
    const onPageLoad = () => {
      loading.style.display = "none";
    };
    document.onreadystatechange = function () {
      if (document.readyState === "complete") {
        onPageLoad();
      } else {
        window.addEventListener("load", onPageLoad, false);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener("load", onPageLoad);
      }
    };
  }, []);
  return (
    <>
      <div id="load">
        <LoadingPage></LoadingPage>
      </div>
      <div className="black-bg">
        <div className="white-bg">
          <div className="my-score">
            <h1>당신의 점수는</h1>
            <h1 id="score"></h1>
            <h1>점 입니다.</h1>
            <button className="submitButton btn ">결과 제출하기</button>
            <a href="/" className="submitButton btn ">
              돌아가기
            </a>
          </div>
        </div>
      </div>
      <div className="outer">
        <div className="inner-list">
          {answer.map((a, i) => (
            <div key={a} id={i}>
              <div className="inner">
                <h1 className="question">
                  {i + 1}번문제) {result[a].q}
                </h1>
                <div className="contentbox">
                  <div className="content">{result[a].c1}</div>
                  <input
                    type="checkbox"
                    value={"1"}
                    className="q"
                    name={i}
                    onChange={(e) => onlyone(e.target)}
                  ></input>
                </div>
                <div className="contentbox">
                  <div className="content">{result[a].c2}</div>
                  <input
                    type="checkbox"
                    value={"2"}
                    className="q"
                    name={i}
                    onChange={(e) => onlyone(e.target)}
                  ></input>
                </div>
                <div className="contentbox">
                  <div className="content">{result[a].c3}</div>
                  <input
                    type="checkbox"
                    value={"3"}
                    className="q"
                    name={i}
                    onChange={(e) => onlyone(e.target)}
                  ></input>
                </div>
                <div className="contentbox">
                  <div className="content">{result[a].c4}</div>
                  <input
                    type="checkbox"
                    value={"4"}
                    className="q"
                    name={i}
                    onChange={(e) => onlyone(e.target)}
                  ></input>
                </div>
                <div className="contentbox">
                  <div className="content">{result[a].c5}</div>
                  <input
                    type="checkbox"
                    value={"5"}
                    className="q"
                    name={i}
                    onChange={(e) => onlyone(e.target)}
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="button-list">
        <button className="button-right btn">다음문제</button>
      </div>
    </>
  );
}
