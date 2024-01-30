const 정답 = "APPLE";
let attempts = 0; // 몇 번 시도 했는가.
let index = 0; // let으로 지정하게 되면 수정이 가능한 변수다.
let timer; // 일단은 초기화 해주지 않았다.

// 자바스크립트에서는 변수명을 정하거나 함수명을 정할 때 camel 표기법을 쓴다. 변수나 함수명은 띄어쓸 수 없다.
// 전체를 하나의 함수로 감싸서 할 거다.
function appStart() {
  // 로직들

  // 아예 JavaScript로 HTML, CSS를 만들어 본다.
  const displayGameover = () => {
    const div = document.createElement("div"); // 다큐먼트에 엘레멘드를 만들 수가 있다. createElement("div") => div라는 엘레멘트를 만든다.
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:35%; background-color:white; width: 200px; height:100px;"; // => CSS 코드를 "" 안에 넣으면 된다.
    document.body.appendChild(div); // body의 밑에다가 삽입한다. appendChild() => 딱 봐도 자식을 추가한다는 의미.
  };

  // const handleKeydown = () => {
  //   console.log("키가 눌렸습니다!!"); // console.log => console에 log를 남기는 함수.
  // };
  /*
  근데 어떤 키가 눌렸는지 모른다. 어떻게 알까?
  addEventListener 안에 있는 함수는 암죽적으로 이벤트가 전달이 된다.
  const handleKeydown = () => {};
  () 안에 파라미터로 이벤트가 전달된다.
  const handleKeydown = (e) => {};
  이벤트를 e라고 표시해도 되고 다른 걸로 해도 된다. 이거는 자유다.
  보기 쉽게 event라고 해본다.
  */

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const gameover = () => {
    // 게임이 종료되면 키보드 이벤트가 안 먹어야 된다.
    window.removeEventListener("keydown", handleKeydown); // => 이벤트 리스너가 지워지면서 키 입력이 안 먹는다.
    displayGameover();
    clearInterval(timer); // setIntertval의 id가 저장된 timer를 () 안에 넣어주면 된다.
  };

  const handleEnterKey = () => {
    // 정답확인.

    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i]; // 정답은 "APPLE"이니까 정답[i]는 APPLE에서 몇 번 인덱스 글자인지 알 수 있다.
      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  // thisBlock을 받아서 다시 만들 필요 없이 쓴다.
  // const handleBackspace = (thisBlock) => {
  //   /*
  //   tisBlock을 handleKeydown 함수 안에 선언했으니까 여기다 또 만들지 말고 파라미터로 전달받는다.
  //   파라미터로 전달받으면 중복해서 변수를 또 선언할 필요없다.
  //   */
  //   // const thisBlock = document.querySelector(
  //   //   `.board-column[data-index='${attempts}${index}']`
  //   // );

  //   thisBlock.innerText = ""; // => thisBlock을 빈 문자열로 만들어버린다.
  //   if (index !== 0) index--;
  // };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  // const로도 함수를 선언할 수 있다고 했다.
  const handleKeydown = (event) => {
    // console.log("키가 눌렸습니다!! event=>", event);
    // console.log(event.key, event.keyCode);
    /*
    두 개 한번 출력을 해본다. 키코드는 유니크한 거기 때문에 겹칠 수 없다.
    이걸 이용해 가지고 특정 키를 뽑아서 그 키를 현재 위치에다가 업데이트 해본다.
    */

    const key = event.key.toUpperCase(); // toUpperCase() => 대문자로 바꿔주는 함수. 문자열에만 가능한 함수. 값을 봔환하고 그냥 나가버린다.
    const keyCode = event.keyCode;

    // 위에 변수를 어디다 업데이트 할까? 블럭에 업데이트 한다.
    // const thisBlock = document.querySelector(".board-column[data-index='00']"); // => .board-column 클래스 뒤에 어떤 옵션, 속성 값도 선택해서 뽑을 수 있다.
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    // if (event.key === "Backspace")
    //   handleBackspace(
    //     thisBlock
    //   ); // thisBlock을 파라미터로 전달해주면 handleBackspace 함수 안에 thisBlock을 만들지 안아도 된다.
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return; // 아무것도 안 하고 리턴을 한다. 함수 밖으로 나오는 거다.
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;

      // 완전히 같지는 않지만 그래도 여기서는 같은 표현이라 볼 수 있음.
      // index = index + 1;
      // index += 1;
      index++;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000); // setInterval은 id를 return 해주게 된다. timer에다가 id를 저장.
    // console.log(timer); // setInterval의 id가 나온다.
  };

  startTimer();

  /*
  입력되는 기준은 키보드 입력이다. 키가 눌렸을 때 입력이 되어야 된다. 
  이벤트 중에 키보드 키다운 이라는 이벤트가 있다. 
  키다운 이벤트를 이용해서 어떤 키가 눌리면 해당 블럭의 키를 업데이트 하면 된다. 
  keydown 이벤트는 어디에다 줘야 될까? 전체, 윈도우에 addEvensListener를 줘야 된다.
  */
  window.addEventListener("keydown", handleKeydown); // keyup을 하게 되면 누르고 뗐을 때 이벤트가 발생한다. 누르자마자 반응하려면 keydown이 좋다.
}

/* 
맨 밑에서 appStart를 호출해 줄 거다.
그러면 자바스크립트가 이 함수를 호출하면서 로직이 실행된다.
*/
appStart();
