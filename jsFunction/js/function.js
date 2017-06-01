// 두 수를 입력받아 큰 수를 반환하는 함수 function
function max(num1, num2) {
    return (num1 >= num2) ? num1 : num2;
}

console.log("max(5,3) : " + max(5,3));
console.log("max(4,8) : " + max(4,8));

// 숫자를 입력하면 요일을 반환하는 함수
function getDay(num) {
    //1. 배열
    //  - 배보다 배꼽이 큰 것같은 느낌
    //2. switch
    //  - 제일 유력
    //3. if
    //  - 소스가 보기 불편해 질 것 같다.
    //4. 객체
    //  - 소스가 보기 불편해 질 것 같다.
    //5. 그저 변수만으로 가능할 수 있을 듯.
    //  - 보기는 불편하겠지만.

    return ( ((num % 7) === 1 ) && console.log("월요일") ||
            ((num % 7) === 2 ) && console.log("화요일") ||
            ((num % 7) === 3 ) && console.log("수요일") ||
            ((num % 7) === 4 ) && console.log("목요일") ||
            ((num % 7) === 5 ) && console.log("금요일") ||
            ((num % 7) === 6 ) && console.log("토요일") ||
            ((num % 7) === 0 ) && console.log("일요일")
           );
}
getDay(1);
getDay(2);
getDay(3);
getDay(4);
getDay(5);
getDay(6);
getDay(0);

// 짝수 홀수 판단하는 함수

function getOddNEven (num) {
    return ( num % 2 == 0 ) ? console.log("짝수") : console.log("홀수");
}

getOddNEven(2);
getOddNEven(3);

// 숫자를 배열로 전달받아 숫자들의 평균을 반환하는 함수

function getSum (array) {
    var sum = 0;

    array.forEach(function(element) {
        sum += element;
    }, this);

    return sum;
}
function getAverage (array) {

    return getSum(array) / array.length;
}

console.log("[3, 4, 5, 2, 3]의 평균값: " + getAverage([3, 4, 5, 2, 3]));
console.log("[2, 7, 8, 11, 30]의 평균값: " + getAverage([2, 7, 8, 11, 30]));
console.log("[4, 8, 12, 31, 40]의 평균값: " + getAverage([4, 8, 12, 31, 40]));

// 문자를 배열로 전달받아 문자열 하나로 반환하는 함수

function getString (str_array) {
    
    var str = "";

    for (var i = 0; i < str_array.length; i++) {
        str += str_array[i];    
    }

    return str;
}

console.log("['a', 'b', 'c', 'd', 'e'] : " + getString(['a', 'b', 'c', 'd', 'e']));

// 세 수를 입력받아 큰 수를 반환하는 함수

function max_threeNum (num1, num2, num3) {
    var one_round_max = max(num1, num2);
    return ( one_round_max >= num3 ) ? one_round_max : num3;
}

console.log("max_threeNum(1, 2, 3) : " + max_threeNum(1, 2, 3));
console.log("max_threeNum(6, 9, 4) : " + max_threeNum(6, 9, 4));
console.log("max_threeNum(5, 5, 3) : " + max_threeNum(5, 5, 3));

// 전화번호를 입력하면 뒤에 4자리를 제외하고 *로 바꾸는 함수

function cellPhone (cell_phone) {
    return "0" + cell_phone;
}
function tel_num (tel) {
    
    if(Object.prototype.toString.call(tel).slice(8, -1).toLowerCase() == "number") {
       
       tel += "";

        if(tel.substring(0, 2) == "10") {
            console.log("check");
            tel = cellPhone(tel); 
        } 
    }
    
    var count = 0, 
        max_index_count = tel.length, 
        change_tel = "",
        isChange = false;

    while( max_index_count > count ) {

        if(count >= max_index_count - 4) {
            isChange = true;
        }

        if(!isChange && tel.charAt(count) == "-") {
            change_tel += "-";
        } else if (!isChange){
            change_tel += "*";
        } else {
            change_tel += tel.charAt(count);
        }
        
        count ++;
    }

    return change_tel;
} 

console.log(tel_num(01039272507));
console.log(tel_num("010-3927-2507"));

// E-mail Validation
function email_validation (email) {
    var atIndex = email.indexOf("@");
    
    if (atIndex > -1) {
        var notAt = email.slice(atIndex + 1, email.length);

        if (notAt.indexOf(".") > -1) {

            return "사용가능한 이메일입니다.";
            
        } else {

            return "사용가능하지 않은 이메일입니다.";
            
        }
    } else {

        return "사용가능하지 않은 이메일입니다.";

    }
}

console.log("heosu71@hanmail.net" + email_validation("heosu71@hanmail.net"));
console.log("heosu71@hanmailnet" + email_validation("heosu71@hanmailnet"));
console.log("heosu71hanmail.net" + email_validation("heosu71hanmail.net"));

// 비밀번호 문자열 validation 영어문자 숫자 포함.

function pw_validation (pw) {
    
    var isNumber = false, isChar = false, isUsingPw = false;
    

    for (var i = 0; i < pw.length; i++) {
        
        var char = pw.charCodeAt(i);

        if ( isNumber && isChar ) {
            isUsingPw = true;
        }    

        if ((char >= 48) && (char <= 57)) {
            isNumber = true;
        } else if (((char >= 65) && (char <= 90)) || ((char >= 97) && (char <= 122)) ) {
            isChar = true;
        }
    }

    if (isUsingPw) {
        console.log("사용할 수 있는 비밀번호입니다.");
    } else {
        console.log("사용할 수 없는 비밀번호입니다.");
    }
}

pw_validation("ad1adsad123");
pw_validation("adadsad");

// ascii 코드 이용, 