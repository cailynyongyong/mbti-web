
var person = {
    gender:'',
    mbti:''
}


var msgArr=[

    {
        type:'bot', //bot, gpt
        msg:'MBTI 질문을 시작할게요',
        buttons:['다음'],
        input:false
    },

    {
        type:'bot', //bot, gpt
        msg:'성별을 선택해주세요',
        buttons:['남자','여자'],
        input:false
    },

    {
        type:'bot', //bot, gpt
        msg:'MBTI',
        buttons:['enfj','intp'],
        input:false
    },

    {
        type:'bot', //bot, gpt
        msg:`$value 를 선택하셨군요. 이제 분석을 시작해보죠!.`,
        buttons:['다음'],
        input:false
    },

    {
        type:'gpt', //bot, gpt
        msg:'',
        buttons:['다음'],
        input:false
    },

];


var msgIndex=0;







$(document).ready(function(){

    init();

    handlerMsgBtn();

});



function handlerMsgBtn(){
    $(document).on('click','.msg-btn',function(){
        var value = $(this).data('value');
       
        msgIndex++;


        var msg = msgArr[msgIndex];
        if(value != '다음' || value != '시작하기'){
            msg.msg = msg.msg.replaceAll('$value',value);
        }

        //gpt
        if(msg.type=='gpt'){
            msg.msg = msg.msg.replaceAll('$value',value);

            const data = {
                model: 'gpt-3.5-turbo',
                temperature: 0.5,
                n: 1,
                messages:  msg.msg,
            }

            $.ajax({
                url: "https://api.openai.com/v1/chat/completions",
                type: 'POST',
                headers: {
                    Authorization: "Bearer " + api_key,
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),
                success:function(response){

                },
                error:function(err){
                    console.log(err);
                }
            })
        }


        $('#msg-list').append(buildMsg(msg));

    })
}



//초기 첫 대화 세팅
function init(){


    var msg = msgArr[msgIndex];
    $('#msg-list').append(buildMsg(msg));
}




//message bubble 만들기
function buildMsg(msg){
    var btns='';

    $.each(msg.buttons,function(index, item){
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