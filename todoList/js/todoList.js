
(function(global){

    /*=======================================================
    
                todo 인트로 버튼 클래스 toggle
    * 개선점
    1. flag를 통해 class 유무를 판별하지 않고 요소의 클래스를 가져와
       유무를 판단하는 방법으로 바꾸자.
    2. addClass 함수를 유틸리티 모듈객체를 만들어서 추가시켜 사용.
    3. 최초 선언되는 Elements들도 객체에 넣어서 사용.
    =========================================================*/
    
    
    var utils = (function(){//IIFE Namespace

        /*==============================
                  [Validation]
        ================================*/
        /*==============================
        *[validateElement]
        *@func 
        *@param1 node - elementNode
        *@result boolean 
        *@desc elementNode인지 확인하는 함수
        *================================*/
        var validateElement = function(node) {
            return (node.nodeType === 1) ? true : false;
        }
        /*==============================
        *[validateData]
        *@func 
        *@param1 data - data
        *@param2 type - string
        *@result boolean
        *@desc data가 어떤 타입인지 확인하는 함수.
        *================================*/
        var validateData = function(data, type) {
            var temp = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
            if(temp === type) { return true; }
            else { return false; }
        }
        /*==============================
             [Element 생성 추가 삭제]
        ================================*/
        /*==============================
        *[createElement]
        *@func 
        *@param1 tag_name - string
        *@result elementNode
        *@desc elementNode를 생성하고 반환하는 함수.
        *================================*/
        var createElement = function(tag_name) {
            if( !validateData(name, 'string') ) { throw '문자열이 아닙니다.' }
            return document.createElement(tag_name);
        }
        /*==============================
        *[createQuerySelector]
        *@func 
        *@param1 selector - string
        *@result elementNode
        *@desc elementNode를 생성하고 반환하는 함수. 요소가 없으면 null값을 반환
        *================================*/
        var createQuerySelector = function(selector) {
            if( !validateData(name, 'string') ) { throw '문자열이 아닙니다.' }
            // 요소가 없으면 Null을 반환
            return document.querySelector(selector);
        }

        /*==============================
                   [Attribute]
        ================================*/

        var getAttribute = function(el, attr) {
            return el.getAttribute(attr);
        }

        var setAttribute = function(el, attr, value) {
            el.setAttribute(attr, value);
        }

        /*==============================
                    [Class]
        ================================*/
        /*==============================
        *[hasClass]
        *@func 
        *@param1 el - elementNode
        *@param2 class_name - string
        *@return boolean
        *@desc 클래스가 있는지 확인하는 함수
        *================================*/
        var hasClass = function(el, class_name) {
            if( !validateElement(el) ) { throw '엘리먼트 요소가 아닙니다.' }
            if( !validateData(class_name, 'string') ) { throw '문자열이 아닙니다.'}

            var reg = new RegExp('(^|\\s)' + class_name + '($|\\s)');
            console.log('hasClass', el, class_name, reg.test(getAttribute(el, 'class')));

            return  ( reg.test(getAttribute(el, 'class')) ) ? true : false;
        }
        /*==============================
        *[addClass]
        *@func 
        *@param1 el - elementNode
        *@param2 value - string
        *@return none
        *@desc 클래스를 추가하는 함수
        *================================*/
        var addClass = function(el, value) {
            if( !validateElement(el) ) { throw '엘리먼트 요소가 아닙니다.' }
            if( !validateData(value, 'string') ) { throw '문자열이 아닙니다.'}

            setAttribute(el, 'class', getAttribute(el, 'class') + ' ' + value);
        }
        /*==============================
        *[removeClass]
        *@func 
        *@param1 el - elementNode
        *@param2 value - string
        *@return none
        *@desc 클래스를 제거하는 함수
        *================================*/
        var removeClass = function(el, value) {
            if( !validateElement(el) ) { throw '엘리먼트 요소가 아닙니다.' }
            if( !validateData(value, 'string') ) { throw '문자열이 아닙니다.'}

            if( !hasClass(el, value) ) { return; }
            console.log('removeClass ', el, value);
             setAttribute(el, 'class', getAttribute(el, 'class').replace(value, '').trim());             
        }
        /*==============================
        *[toggleClass]
        *@func 
        *@param1 el - elementNode
        *@param2 class_name - string
        *@return none
        *@desc 클래스를 toggle시키는 함수
        *================================*/             
        var toggleClass = function(el, class_name) {
            if( !validateElement(el) ) { throw '엘리먼트 요소가 아닙니다.' }
            if( !validateData(class_name, 'string') ) { throw '문자열이 아닙니다.'}
            console.log('toggleClass ', el, class_name);

            if (hasClass(el, class_name)) {
                removeClass(el, class_name);
                
            } else {
                addClass(el, class_name);
            }
        }
        // 노출 패턴
        return {
            createElement: createElement,
            query: createQuerySelector,
            getAttr: getAttribute,
            toggleClass: toggleClass
        }
    }());



    var $ = utils,
        intro_btn = $.query('.intro-btn'), 
        todoList = $.query('.todoList'),
        class_object_arr = [
            {
                el: intro_btn,
                class: $.getAttr(intro_btn, 'class')
            },
            {
                el: $.query('.input-box'),
                class: $.getAttr($.query('.input-box'), 'class')
            },
            {
                el: todoList,
                class: $.getAttr(todoList, 'class')
            }      
        ];

    intro_btn.onclick = function() {

        for(var i = 0, len = class_object_arr.length; i < len; i++) {
            $.toggleClass(class_object_arr[i].el, 'actived');
        }
            
    }

    /*=======================================================
    
                           동적 생성 부분
    * 개선점
    1. 각각의 elements 생성 부분을 함수로 만들어 객체로 만들어 사용.
      - 이유는 일단 함수로 만들어 사용하면 깔끔해보임. 그리고 배열로
        사용할 수 있지만 순서를 기억해줘야 한다는 단점이 있어서 객체로
        만들어서 사용한다.
    2. elements를 동적으로 생성 삭제 등을 하는 함수들을 정리.
      - 통합적인 유틸리티 함수를 만들어서 다 넣어버릴까??

    * 추가 기능
    1. del-list의 item들을 더블클릭 했을 때 다시 todoList로 추가 시키기
    
    =========================================================*/ 
    // 동적 생성
    var add_btn = document.querySelector('.add-btn');
    var del_all_btn = document.querySelector('.del-all-btn');
    var input_text = document.querySelector('#todoInput');
    var del_storage_list = document.querySelector('.del-list');

    console.log(del_storage_list);
    input_text.onkeypress = function(e) {
        if(e.keyCode === 13) { 
            setElements(this);
            return false; 
        }
    }
    
    add_btn.onclick = function() {
        // createElement
        if ( input_text.value === '' ) { throw '내용이 없습니다.' }
        
        setElements(input_text);
        
    }

    var del_el_arr = [];

    del_all_btn.onclick = function() {
        var list_length = todoList.querySelectorAll('li').length;    
        removeAll(list_length, true);
    }

    function checkedString(text) {
        var temp = text.value;
        if(temp === '' || temp.trim().length === 0) { 
            return false; 
        } else {
            return true;
        }
    }
    function remove(node) {
        var ul_class = node.parentNode.getAttribute('class');

        if(ul_class === 'todoList') {
            todoList.removeChild(node);
        } else if(ul_class === 'del-list') {
            del_storage_list.removeChild(node);
        }
    }
    function removeAll(len, isStored) {
        isStored = isStored || false;

        for(var i = 0; i < len; i++) {
            var li_el = document.querySelector('li');
            del_el_arr.push(li_el);
            todoList.removeChild(li_el);
        }
        console.log(del_el_arr, isStored);
        if(isStored) {
            for(var i = 0, l = del_el_arr.length; i < l; i++) {
                console.log(del_el_arr[i]);
                del_storage_list.appendChild(del_el_arr[i]);
            }
        }
    }
    var li_number = 0;

    function setElements(input) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        var del_btn = document.createElement('button');
        var close_marker = document.createElement('i');
        
        if(!checkedString(input)) { throw '내용이 없습니다.' }

        var text = document.createTextNode(input.value);
        input.value = '';

        close_marker.setAttribute('class', 'fa fa-times');
        close_marker.setAttribute('aria-hidden', 'true');
        del_btn.setAttribute('class', 'del-btn');
        li.setAttribute('role-index', li_number++);
        
        del_btn.onclick = function() {
            var parent_li = del_btn.parentNode;
            remove(parent_li);
        }

        span.appendChild(text); 
        del_btn.appendChild(close_marker);
        li.appendChild(span);
        li.appendChild(del_btn);
        todoList.appendChild(li);
    }
}(window));