//utils.js

// 전역과 구분되는 독립된 공간을 형성
// 모듈을 구현해서 내부에 접근 가능한 객체를 만들자.

var FDS = function(){
 
    function type(data) {
        return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
    }
    function isType(data, kind) {
        return type(data) === kind;
    }
    function valid(data, kind, error_message) {
        if ( type(data) === kind ) {
            // throw error_message;
            throw error_message || '두 값은 동일하기에 오류입니다.';
        }
        return '오류는 발생하지 않았습니다';
    }
    function invalid(data, kind, error_message) {
        if ( type(data) !== kind ) {
            throw error_message || '두 값이 다르기에 오류입니다.';
        }
        return '오류는 발생하지 않았습니다';
    }
    function validate(data, kind, error_message) {
        if ( kind.indexOf('!') > -1 ) {
            invalid(data, kind.slice(1), error_message);
        } else {
            valid(data, kind, error_message);
        }
    }
    function randomNumber (number) {
        number = number || 2;
        // 데이터 타입 validation은 하지 않음
        validate(number, '!number', '숫자 값을 전달해주세요.');
        return Math.floor(Math.random() * number);
        }
        function randomMinMax (min, max) {
        // 데이터 타입 validation은 하지 않음
        return Math.round(Math.random() * (max - min) + min);
    }
    function getCurrentDay (weekDay) {
        var weekdays = ['일','월','화','수','목','금','토'];

        var printDay = function (str) {
            // console.log(str);
            // validate(str, "string", "문자열이 들어와야 합니다.");  
            console.log(str + "요일입니다.");
        }
        
        if(weekDay === 1 || weekDay === 3 || weekDay === 5) {
            console.log("월/수/금은 시간이 됩니다.");
        } else {
            console.warn("월/수/금 이외에는 시간이 안됩니다.");
        }
        
        switch (weekDay) {
            case 1 :
            case 3 :
            case 5 :
            console.log("월/수/금은 시간이 됩니다.");
            break;
            default :
            console.warn("월/수/금 이외에는 시간이 안됩니다.");
        }

        if(weekDay === 0) { printDay(weekdays[0]) }
        else if(weekDay === 1) { printDay(weekdays[1]) }
        else if(weekDay === 2) { printDay(weekdays[2]) }
        else if(weekDay === 3) { printDay(weekdays[3]) }
        else if(weekDay === 4) { printDay(weekdays[4]) }
        else if(weekDay === 5) { printDay(weekdays[5]) }
        else if(weekDay === 6) { printDay(weekdays[6]) }
        else {console.warn("존재하지 않는 요일입니다.")}

        switch (weekDay) {
            case 0: printDay(weekdays[0]); break;
            case 1: printDay(weekdays[1]); break;
            case 2: printDay(weekdays[2]); break;
            case 3: printDay(weekdays[3]); break;
            case 4: printDay(weekdays[4]); break;
            case 5: printDay(weekdays[5]); break;
            case 6: printDay(weekdays[6]); break;
        }
    }
    function isNumber(data) {
        return isType(data, 'number') && !Number.isNaN(data);
    }
    function isString(data) {
        return isType(data, 'string') && data !== "";
    }
    function isBoolean(data) {
        return isType(data, 'boolean');
    }
    function isFunction(data) {
        return isType(data, 'function') && data !== undefined;
    }
    function isArray(data) {
        return isType(data, 'array');
    }
    function isPlainObject(data) {
        return isType(data, 'object');
    }
    function makeArray(arg) {
        return Array.prototype.slice.call(arg);
    }
    function id(target){
        validate(target, "!string", "전달인자는 문자열이어야 합니다.");
        return document.getElementById(target);
    }
    function tagAll(target, context) {
        validate(target, "!string", "전달인자는 문자열이어야 합니다.");
        if( context && context.nodeType !== 1 && context !== document ) { throw '두번째 전달인자는 요소노드여야 합니다.' }
        return (context || document).getElementsByTagName(target);
    }
    function tag(target, context) {
        return tagAll(target, context)[0];
    }
    /*function classes(name, context) {
        return (context || document).getElementsByClassName(name);
    }*/
    var classAll = function() {
        var _classes = null;

        if('getElementsByClassName' in Element.prototype) {
            _classes = function(name, context) {
                validate(name, '!string', '첫번째 인자는 문자열을 입력해야 합니다.');
                if(context && context.nodeType !== 1) { throw '두번째 인자는 요소노드여야 합니다.' }
                return (context || document).getElementsByClassName(name);
            };
        } else {
            _classes = function(name) {
                validate(name, '!string', '첫번째 인자는 문자열을 입력해야 합니다.');
                context = context || document;
                var all_els = tagAll('*', context);
                console.log('all_els', all_els);
                var match_collection = []; 
                var match = new RegExp('(^|\\s)' + name + '(^|\\s)');
                
                for(var i = 0, len = all_els.length; i < len; i++) {
                    var el = all_els.item(i);
                    /*if( el.className === name && name !== '' ) {
                        match_collection.push(el.className);
                    }*/

                    if(match.test(el.className)) {
                        match_collection.push(el.className);
                    }
                }

                return match_collection;
            };
        }

        return _classes;
    }()
    var classSingle = function(name, context) {
        return classAll(name, context)[0];
    }
    var queryAll = function(selector, context) {
        validate(selector, '!string', '첫번째 요소는 문자요소가 들어와야 합니다.');
        context = context || document.body;

        if(context && context.nodeType !== 1) { throw '두번째 요소는 요소노드가 들어와야 합니다.'}

        return context.querySelectorAll(selector);
    }
    var query = function(selector, context) {
        validate(selector, '!string', '첫번째 요소는 문자요소가 들어와야 합니다.');
        context = context || document.body;

        if(context && context.nodeType !== 1) { throw '두번째 요소는 요소노드가 들어와야 합니다.'}
         
        return context.querySelector(selector); 
    }
    var firstChild = function(){
        var _firstChild = null;

        if('firstElementChild' in Element.prototype ) {
            _firstChild = function(el_node) {
            return el_node.firstElementChild;
            }
        } else {
            _firstChild = function(el_node) {
            return el_node.children[0];
            }
        }

        return _firstChild;
    }()
    var lastChild = function(){
        var _lastChild = null;

        if('lastElementChild' in Element.prototype ) {
            _lastChild = function(el_node) {
            return el_node.lastElementChild;
            }
        } else {
            _lastChild = function(el_node) {
            var children = el_node.children;
            return el_node.children[ --children ];
            }
        }

        return _lastChild;
    }()
    var nextSibling = function() {
        var _nextSibling = null;

        if( 'nextElementSibling' in Element.prototype ) {
            _nextSibling = function(el_node) {
                return el_node.nextElementSibling;
            }
        } else {
            _nextSibling = function(el_node) {
                do {
                    el_node = el_node.nextSibling;
                } while( el_node && el_node.nodeType !== 1)

                return el_node;
            }
        }

        return _nextSibling;
    }()
    var previousSibling = function() {
        var _previousSibling = null;

        if( 'previousElementSibling' in Element.prototype ) {
            _previousSibling = function(el_node) {
                return el_node.previousElementSibling;
            }
        } else {
            _previousSibling = function(el_node) {
                do {
                    el_node = el_node.previousSibling;
                } while( el_node && el_node.nodeType !== 1)

                return el_node;
            }
        }

        return _previousSibling;
    }()
    var parent = function(node, depth) {
        depth = depth || 1;

        for(var i = 0; i < depth; i++) {
            node = node.parentNode;
        }
        
        return node;
    }
    var hasChild = function (data) {
        if(data.nodeType !== 1) { throw '노드가 아닙니다.' }
        return data.hasChildNodes();
    }

    return {
        info: {
            version: "0.0.1v",
            author: "",
            repository: "",
            license: ""
        },
        type: isType,
        isNumber: isNumber,
        isFunction: isFunction,
        isArray: isArray,
        isPlainObject: isPlainObject,
        makeArray: makeArray,
        validate: validate,
        id: id,
        tagAll: tagAll,
        tag: tag,
        firstChild: firstChild,
        lastChild: lastChild,
        nextSibling: nextSibling,
        previousSibling: previousSibling,
        parent: parent,
        hasChild: hasChild,
        // classAll: classAll,
        // classSingle: classSingle
        query: query,
        queryAll: queryAll
    };
}();