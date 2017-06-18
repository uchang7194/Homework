
(function(global, $){

    /*=======================================================
    
                todo 인트로 버튼 클래스 toggle
    * 개선점
    1. flag를 통해 class 유무를 판별하지 않고 요소의 클래스를 가져와
       유무를 판단하는 방법으로 바꾸자.
    2. addClass 함수를 유틸리티 모듈객체를 만들어서 추가시켜 사용.
    3. 최초 선언되는 Elements들도 객체에 넣어서 사용.
    =========================================================*/

    var intro_btn = $.query('.intro-btn'), 
        todoList = $.query('.todoList'),
        changed_objects = [
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

        for(var i = 0, len = changed_objects.length; i < len; i++) {
            $.toggleClass(changed_objects[i].el, 'actived');
        }
    }

    /*=======================================================
    
                           동적 생성 부분
    * 개선점
    1. 각각의 elements 생성 부분을 함수로 만들어 객체로 만들어 사용.
      - 이유는 일단 함수로 만들어 사용하면 깔끔해보임. 그리고 배열로
        사용할 수 있지만 순서를 기억해줘야 한다는 단점이 있어서 객체로
        만들어서 사용한다.
      => 만들어보니 결국 배열도 사용하게 됨..
    2. elements를 동적으로 생성 삭제 등을 하는 함수들을 정리.
      - 통합적인 유틸리티 함수를 만들어서 다 넣어버릴까??

    * 추가 기능
    1. del-list의 item들을 더블클릭 했을 때 다시 todoList로 추가 시키기
    
    =========================================================*/ 
    /* ================================
                [동적 생성]
    ================================= */
    
    var add_btn = {
            selector: '.add-btn',
            event: 'onclick'
        }, 
        removeAll_btn = {
            selector: '.del-all-btn',
            event: 'onclick'
        },
        input = {
            selector: '#todoInput',
            event: 'onkeypress'
        }
    var removed_list = $.query('.removed-list'); 
    console.log(removed_list);
    add_btn = $.createObjAddElement(add_btn);
    removeAll_btn = $.createObjAddElement(removeAll_btn);
    input = $.createObjAddElement(input);

    
    /* ================================
                [event 할당]
    ================================= */

    $.setEvent(add_btn, function(){
        console.log(this);
        setElements.call(undefined, input.el.value);
    });
    $.setEvent(removeAll_btn, function(){
        removeListAndMove(todoList, true);
    });
    $.setEvent(input, function(e){
        if(e.keyCode === 13) { 
            console.log(this);
            setElements.call(undefined, input.el.value);
            return false; 
        }
    });

    function removeListAndMove(parent, isMoved) {
        isMoved = isMoved || false;
        
        var storage = $.removeAll(parent);
        if(isMoved) {
            console.log('starage.length:', storage.length);
            for( var i = 0, len = storage.length; i < len; i++ ) {
                console.log('storage[i]:', storage[i]);
                $.appendChild(removed_list, storage[i]);
            } 
        }
    }

    var role_index = 0;

    function setElements(text) {
        var li = $.createElement('li'),
            span = $.createElement('span'),
            del_btn = $.createElement('button'),
            close_marker = $.createElement('i'),
            del_btn_obj = {
                selector: '',
                event: 'onclick',
                el: del_btn
            };
        
        // textNode 생성
        var text = $.createTextNode(text);
        input.el.value = '';

        // attribute 추가
        $.setAttr(close_marker, 'class', 'fa fa-times');
        $.setAttr(close_marker, 'aria-hidden', 'true');
        $.setAttr(del_btn, 'class', 'del-btn');
        $.setAttr(li, 'role-index', role_index++);

        // del_btn_obj에 selector 속성 추가 
        del_btn_obj.selector = $.getAttr(del_btn_obj.el, 'class');
        // event 생성
        $.setEvent(del_btn_obj, function(){

            var parent = $.parent(del_btn_obj.el, 2),
                child = $.parent(del_btn_obj.el, 1);

            $.removeChild(parent, child);
        });
        
        
        // 결합.
        $.appendChild(span, text);
        $.appendChild(del_btn, close_marker);
        $.appendChild(li, span);
        $.appendChild(li, del_btn);
        $.appendChild(todoList, li);
    }
}(window, window.utills));