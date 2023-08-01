"use client";

import "./Checkbox.css"; // Import the CSS file for styling

export default function Checkbox() {
  let multiple_choice = [1, 2, 3, 4, 5];

  const onlyone = (checkThis) => {
    const checkboxes = document.getElementsByName("a");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const QuestionInput = event.target.elements.q;
    const inputElements = event.target.elements;
    const checkboxes = document.getElementsByName("a");

    // "c"가 포함된 "name"을 가진 input 중 하나라도 비어있는지 확인
    let isAnyInputEmpty = false;
    for (let i = 0; i < inputElements.length; i++) {
      const inputName = inputElements[i].name;
      if (inputName && inputName.includes("c") && !inputElements[i].value) {
        isAnyInputEmpty = true;
        break;
      }
    }
    let isAnyCheckboxChecked = false;
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        isAnyCheckboxChecked = true;
        break;
      }
    }

    if (!QuestionInput.value) {
      // 제목 또는 내용이 비어있는 경우
      alert("문제 내용을 입력해주세요!");
    } else if (isAnyInputEmpty) {
      alert("문제가 비었습니다!");
    } else if (!isAnyCheckboxChecked) {
      alert("체크박스를 체크하여 정답을 선택하세요!");
    } else {
      event.target.submit(); // 제출
    }
  };

  return (
    <form action="/api/write" method="POST" onSubmit={handleSubmit}>
      <div className="checkbox-container">
        <h1>퀴즈 만들기</h1>
        <input
          name="q"
          type="text"
          placeholder="문제의 내용을 입력하세요."
          autoComplete="off"
        ></input>
        {multiple_choice.map((a, i) => (
          <div className="checkbox-row" key={i}>
            <div className="num">{multiple_choice[i] + ")"}</div>
            <input
              type="text"
              name={"c" + multiple_choice[i]}
              placeholder={multiple_choice[i] + "번 문제"}
            />
            <input
              type="checkbox"
              name="a"
              value={"a" + multiple_choice[i]}
              onChange={(e) => onlyone(e.target)}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          제출하기
        </button>
      </div>
    </form>
  );
}
