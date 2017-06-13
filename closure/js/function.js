/*1.



한 개발자가 아래와 같이 `forestFright`라는 함수 선언을 만들어 두었지만, 
메모리 상에 보관하지 않기로 결정했다. 
이 함수를 익명 함수 표현식으로 바꾸고, `runaway`라는 변수에 할당해라.*/
var runaway = function () {
  var toAlert = "";
  for (var i = 0; i < 5; i++) {
    toAlert = toAlert + "Lions, Tigers, and Bears, Oh My!!\n";
  }
  alert(toAlert);
};

/*2. 
최병광 조교님은 수강생들의 행복지수를 조사하고자, 
아래와 같은 특별한 수식을 만들었다. 
이 식은 시험 점수, 출석률, 수업 만족도를 기반으로 만들었다.

var happinessGenerated = function(testScore, attendanceRate, satisfactionLevel) {
  var ability = testScore * attendanceRate;
  var feeling = satisfactionLevel * satisfactionLevel * satisfactionLevel;
  var totalHappiness = feeling + ability;
  return totalHappiness;
};

- `happinessGenerated` 공식을 분석해라.
- `test`, `attendance`, `satisfaction` 변수에 적절한 값을 넣어, 
수강생 성취도가 100점 초과, 400점 미만이 되도록 만들어라.
- `happinessGenerated` 함수를 호출하고 인자에 변수를 넣어라.
- 그 값을 새로운 변수인 `happiness`에 저장한다.

*/

var happinessGenerated = function(testScore, attendanceRate, satisfactionLevel) {
  var ability = testScore * attendanceRate;
  var feeling = satisfactionLevel * satisfactionLevel * satisfactionLevel;
  var totalHappiness = feeling + ability;
  return totalHappiness;
};

var happiness = happinessGenerated(80, 1.5, 6);


/*
3.
`alert`를 통하여, 위 `happinessGenerated` 함수를 실행하는 것이 아니라 
함수 내용을 보여주려면 어떻게 해야 할까?*/

// alert(happinessGenerated);

/*
4. 

조교님은 행복지수에 따라 수강생들에게 알림 메시지가 가도록 코드를 짜려고 한다. 

- `happinessMessage` 함수 표현식에는 조건문(if ~ else 등)을 넣어 `happiness` 정수값을 
체크하려고 한다. `happiness`의 범위에 따라서, `confirm` 함수를 호출하는 것을 반환한다. 
200보다 적으면 아래와 같이 출력되도록 반환한다.*/

// ----------------------
// Happiness Level: LOW
// 계속 하실 수 있죠?
// ----------------------

//   *
//  ***
// *****
//  ***
//   *
var star = function(num) {
    var count = Math.floor(num / 2), countFlag = false, str = "";
    for(var i = 1; i <= num; i++) {
        str = "";
        //빈공간 넣기
        
        for (var j = 0; j < count; j++) {
            str += " ";
        }

        for (var z = 0; z < (num - count * 2); z++) {
            str += "*";
        }

        if (count === 0) {
            countFlag = true;
        }
        if(!countFlag) {
            count--;
        } else {
            count++;
        }
        console.log(str);   
    }
}

star(15);