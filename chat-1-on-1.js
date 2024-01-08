// 1. chat gpt full -> 채팅 UI + 백엔드
// 2. chat gpt api (python) + flask web backend
// 3. js script api -> 왜 가능하냐? gpt 측에서 2번을 만들어줌.
//    https://seill.tistory.com/1080 참고

var person = {
  gender: "",
  mbti: "",
};

var msgIndex = 0;
var msgArr = [
  //#0
  `
        <div class="msg-box left">
            <div class="bubble">
                <div>안녕하세요~&#128525;
                <br>생성형 AI를 활용한 <MBTI별 소개팅 공략집 - 준비편>입니다.
                </p>기본적으로 성별과 MBTI의 정보를 받아 AI를 통해 답변드리므로, 가끔 "통통" 튀는 답변들이 나올 수 있으니 참조 부탁드리며, 재미로 잘 봐주셨으면 좋겠습니다.
                </p>여러분들의 두근거리는 소개팅, 좋은 결실이 이뤄지길 바라며 지금부터 시작하겠습니다&#128591;
                <br>&#128071;아래 "다음" 버튼을 눌러주세요&#128071;</div>
                <div>
                    <button class="msg-btn-0"; style="margin-top: 10px;">다음</button>
                </div>
            </div>
        </div>
    `,
  //#1
  `
        <div class="msg-box left">
            <div class="bubble">
                <div>소개팅 상대방의 성별을 선택해주세요!&#x1F603;</div>
                <div>
                    <button class="msg-btn-1"; style="margin-top: 10px;" data-value="남자">남자</button>
                    <button class="msg-btn-1"; style="margin-top: 10px;" data-value="여자">여자</button>
                </div>
            </div>
        </div>
    `,
  //#2
  `
        <div class="msg-box left">
            <div class="bubble">
                <div>"$gender"를 선택 하셨네요!
                <br>소개팅 상대방의 성별은 "$gender"이시군요.
                </p>이제 상대방의 MBTI 를 입력해주세요!!&#128145;</div>
                <div>
                    <button class="msg-btn-2"; style="margin-top: 10px;">입력하기</button>
                </div>
            </div>
        </div>
    `,
  //#3
  `
        <div class="msg-box left">
            <div class="bubble">
                <div>"$mbti" "$gender"분에 대해서 알고 싶으시군요!
                <br>생성형 AI를 통한 답변 내용 말씀드리겠습니다&#128077;
                </p>먼저 상대방 $mbti $gender분의 성격유형에 대해서 설명드리겠습니다~
                <br>&#171;GPT로 만들어 둔 MBTI별 성별별 성격유형 답변&#187;
                </p>이어서 $mbti $gender분의 소개팅 공략법에 대해서 설명드리겠습니다~
                <br>&#171;GPT로 만들어 둔 MBTI별 성별별 소개팅 공략법 답변&#187;
                </p>마지막으로 소개팅 추천 질문은 아래와 같습니다.
                <br>추천 질문에 대한 구체적인 상황에 대하여 알아보시겠습니까?</div>
                <div>
                <button class="msg-btn-3"; style="margin-top: 10px;" data-value="예">예</button>
                <button class="msg-btn-3"; style="margin-top: 10px;" data-value="아니오">아니오</button>
                </div>
            </div>
        </div>
    `,
  //#4
  `
    <div class="msg-box left">
        <div class="bubble">
            <div>소개팅 구체적인 상황 예시입니다
            ~~~
            이상 구체적인 상황 모의 시뮬레이션이었습니다.

            소개팅 추천 질문 리스트를 받아보시겠습니까? 추천 질문은 총 5개 입니다.
            </div>
            <div>
                <button class="msg-btn-4"; style="margin-top: 10px;" data-value="예">예</button>
                <button class="msg-btn-4"; style="margin-top: 10px;" data-value="아니오">아니오</button>
                </div>
        </div>
    </div>
    `,
  //#5
  `
    <div class="msg-box left">
        <div class="bubble">
            <div>
            GPT를 활용한 소개팅 추천 질문 리스트 10개 입니다.

            새로 하시려면 '처음으로'를 그만하시려면 '그만하기'를
            AI를 활용한 소개팅 대화 시뮬레이션은 시뮬레이션을 선택해주세요.</div>
            <div>
            <button class="msg-btn-5"; style="margin-top: 10px;" data-value="처음으로">처음으로</button>
            <button class="msg-btn-5"; style="margin-top: 10px;" data-value="그만하기">그만하기</button>
            <button class="msg-btn-5"; style="margin-top: 10px;" data-value="시뮬레이션">시뮬레이션</button>
            </div>
        </div>
    </div>
    `,
  //#6
  `
    <div class="msg-box left">
        <div class="bubble">
            <div>지금까지 생성형 AI를 활용한 &#171;<MBTI별 소개팅 공략집 - 준비편>&#187; 이었습니다.
            <br>사람 모두가 개개인의 특성, 상황마다 다르므로 위의 해석과 방법이 모두 적용될 수는 없겠지만,
            <br>그래도 소개팅 하시는 동안 좋은 시간 보내시고, 좋은 결과 있으시길 바라며, 여러분들의 앞날을 축복하겠습니다!&#127881;
            </p>그리고 괜찮으셨다면 후기 공유와 응원의 댓글 작성해주시면 정말 감사드리겠습니다!
            <br>2024년 새해 복 많이 받으시고, 뜻하시는 바 모두 이루시길 바라곘습니다~ 감사합니다!&#128518;</div>
            <div>
            <button class="msg-btn-6"; style="margin-top: 10px;" data-value="확인">확인</button>
            </div>
        </div>
    </div>
    `,
  //#7
  `
    <div class="msg-box left">
        <div class="bubble">
            <div>지금부터 Chat GPT를 통해 소개팅 대화 시뮬레이션을 시작하겠습니다.</div>
            <p></p>
            <div>안녕하세요~ 저는 OOO입니다. 저의 MBTI는 $mbti 에요.</div>
            <div>
            <button class="msg-btn-7"; style="margin-top: 10px;" data-value="다음">다음</button>
            </div>
        </div>
    </div>
    `,
  //#8
  `
    <div class="msg-box right">
        <div class="bubble-right">
            <div>
                <input id="msg-8-input" placeholder="ESTP"/>
                <button class="msg-btn-8"; style="margin-top: 10px;">입력완료</button>
            </div>
        </div>
    </div>
    `,
  //#9
  `
    <div class="msg-box left">
        <div class="bubble-right">
            <div>$result</div>
            <div>
                <button class="msg-btn-9"; style="margin-top: 10px;">다음</button>
            </div>
        </div>
    </div>
    `,
  //#10
  `
    <div class="msg-box right">
        <div class="bubble-right">
            <div>
                <input id="msg-10-input" placeholder="대화 내용을 입력하세요."/>
                <button class="msg-btn-10"; style="margin-top: 10px;">입력완료</button>
            </div>
        </div>
    </div>
    `,
];

$(document).ready(function () {
  init();

  handlerMsgBtn();

  // //GTP 테스트
  // askChatGPT('개발자가 뭐야? 짧게 20자 내외로 말해줘').then((result)=>{
  //     console.log(result);
  // });
});

function handlerMsgBtn() {
  //#0 첫 시작 다음 클릭시 다음 질문으로 넘어가기
  $(document).on("click", ".msg-btn-0", function () {
    // msgIndex++;
    msgIndex = 1;
    var msgHTML = msgArr[msgIndex];
    $("#msg-list").append(msgHTML);

    //버튼 비활성화
    $(".msg-btn-0").prop("disabled", true);
  });

  //#1 남자, 여자 질문
  $(document).on("click", ".msg-btn-1", function () {
    var gender = $(this).data("value");

    person.gender = gender;

    msgIndex = 2;

    var msgHTML = msgArr[msgIndex];
    msgHTML = msgHTML.replaceAll("$gender", gender);
    $("#msg-list").append(msgHTML);

    // '남자', '여자' 버튼을 비활성화합니다.
    $(".msg-btn-1").prop("disabled", true);
  });

  //#2. mbti 조사
  $(document).on("click", ".msg-btn-2", function () {
    msgIndex = 8;

    var msgHTML = msgArr[msgIndex];
    $("#msg-list").append(msgHTML);

    //버튼 비활성화
    $(".msg-btn-2").prop("disabled", true);
  });

  //#8. 사용자의 mbti 입력
  $(document).on("click", ".msg-btn-8", function () {
    var mbti = $("#msg-8-input").val();

    const mbtiList = [
      "ISTJ",
      "ISFJ",
      "INFJ",
      "INTJ",
      "ISTP",
      "ISFP",
      "INFP",
      "INTP",
      "ESTP",
      "ESFP",
      "ENFP",
      "ENTP",
      "ESTJ",
      "ESFJ",
      "ENFJ",
      "ENTJ",
    ];

    if (!mbtiList.includes(mbti.toUpperCase())) {
      alert("올바른 MBTI 가 아닙니다.");
      return;
    }
    // if(mbti.length != 4){
    //     alert('올바른 MBTI 가 아닙니다.');
    //     return;
    // }

    person.mbti = mbti;
    msgIndex = 3;
    var msgHTML = msgArr[msgIndex];

    // Call the ChatGPT API to generate a response based on the first prompt
    askChatGPT(
      `Tell me about ${person.gender} ${person.mbti}. Please be concise and return the answer as a list.`
    )
      .then((response1) => {
        // Handle the first generated response here
        console.log(response1);

        msgHTML = msgHTML.replace(
          `&#171;GPT로 만들어 둔 MBTI별 성별별 성격유형 답변&#187;`,
          `${response1}`
        );

        // Now, call the ChatGPT API to generate a second response
        return askChatGPT(
          `Generate 5 questions to ask to ${person.gender} ${person.mbti} on a blind date in Korean.`
        );
      })
      .then((response2) => {
        // Handle the second generated response here
        console.log(response2);

        msgHTML = msgHTML.replaceAll("$gender", person.gender);
        msgHTML = msgHTML.replaceAll("$mbti", person.mbti);
        // Now, append the second response
        msgHTML = msgHTML.replace(
          `마지막으로 소개팅 추천 질문은 아래와 같습니다.`,
          `마지막으로 소개팅 추천 질문은 아래와 같습니다.\n ${response2}`
        );
        $("#msg-list").append(msgHTML);

        //버튼 비활성화
        $(".msg-btn-8").prop("disabled", true);
      });
  });

  //#3 MBTI & Gender 분석 설명
  $(document).on("click", ".msg-btn-3", function () {
    // 버튼에서 'data-value' 속성 값을 가져옵니다.
    var answer = $(this).data("value");

    // '예'와 '아니오'에 따라 다른 동작을 수행합니다.
    if (answer === "예") {
      // '예'를 눌렀을 때의 동작 -> #5
      console.log("예를 선택했습니다.");
      msgIndex = 5;
    } else if (answer === "아니오") {
      // '아니오'를 눌렀을 때의 동작 -> #6
      console.log("아니오를 선택했습니다.");
      msgIndex = 6;
    }

    var msgHTML = msgArr[msgIndex];
    $("#msg-list").append(msgHTML);

    //버튼 비활성화
    $(".msg-btn-3").prop("disabled", true);
  });

  //#4 소개팅 추천 예시 질문 리스트
  $(document).on("click", ".msg-btn-5", function () {
    // 버튼에서 'data-value' 속성 값을 가져옵니다.
    var answer = $(this).data("value");

    if (answer === "처음으로") {
      console.log("처음으로를 선택했습니다.");
      // -> #0
      msgIndex = 0;
    } else if (answer === "그만하기") {
      console.log("그만하기를 선택했습니다.");
      msgIndex = 6;
      // -> #6
    } else if (answer === "시뮬레이션") {
      console.log("시뮬레이션을 선택했습니다.");
      // -> #7

      msgIndex = 7;
    }

    var msgHTML = msgArr[msgIndex];
    msgHTML = msgHTML.replaceAll("$mbti", person.mbti);
    $("#msg-list").append(msgHTML);

    //버튼 비활성화
    $(".msg-btn-5").prop("disabled", true);
  });

  //#7
  $(document).on("click", ".msg-btn-7", function () {
    msgIndex = 9;
    //버튼 비활성화
    $(".msg-btn-7").prop("disabled", true);
  });

  //#10
  $(document).on("click", ".msg-btn-10", function () {
    var result = $("#msg-10-input").val();

    msgIndex = 11;

    //버튼 비활성화
    $(".msg-btn-10").prop("disabled", true);

    // askChatGPT(`${person.gender} 이면서 ${person.mbti} 에 대한 설명을 10자 내외로 짧게해줘`).then((result) => {
    //     console.log(result);
    //     msgIndex = 9;
    //     var msgHTML = msgArr[msgIndex];
    //     msgHTML = msgHTML.replaceAll('$result', result);
    //     $('#msg-list').append(msgHTML);
    // });
  });
}

// function handlerShareBtn() {
//     //#공유하기 - 카카오톡
//     $(document).on('click', 'kakaoShare-btn', function () {
//     });
// }

//초기 첫 대화 세팅
function init() {
  var msg = msgArr[msgIndex];
  $("#msg-list").append(msg);
}

//message bubble 만들기
function buildMsg(msg) {
  var btns = "";

  $.each(msg.buttons, function (index, item) {
    btns += `<button class="msg-btn" data-value="${item}">${item}</button>`;
  });

  return `
        <div class="msg-box left">
            <div class="bubble">
                    <div>${msg.msg}</div>
                    <div>${btns}</div>
            </div>
        </div>
    `;
}

const api_key = "내 api key로 바꿔주기";
// GPT Ask 함수
function askChatGPT(askingText) {
  return new Promise((resolve, reject) => {
    // 로딩 보여주기
    $("#loading").css("display", "flex");

    // GPT 테스트
    const messages = [
      {
        role: "system",
        content: `'지금부터 역할극을 시작하겠습니다.
            당신의 역할은 다음과 같으며, 역할에 맞게 대화를 진행해주시면 되겠습니다.
            1. MBTI 유형 : $mbti
            2. 성별 : $gender
            3. 상황 : 소개팅 처음 만나는 자리`,
      },
      { role: "user", content: askingText }, // 여기서 askingText는 사용자의 입력을 나타냅니다.
    ];

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 15, // 대화 중 컴퓨터가 15번 답변
      messages: messages,
    };

    $.ajax({
      url: "https://api.openai.com/v1/chat/completions",
      type: "post",
      headers: {
        Authorization: "Bearer " + api_key,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      success: function (response) {
        $("#loading").fadeOut(1000, function () {
          $("#loading").hide();
        });
        resolve(response.choices[0].message.content);
        // console.log(response.choices[0].message.content);
      },
      error: function (err) {
        $("#loading").css("display", "none");
        alert("네트워크 에러 발생");
        reject(err);
        // console.log(err)
      },
    });
  });
}
