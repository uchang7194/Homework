
(function(global){


    var intro_btn = document.querySelector('.intro-btn');
    var input_box = document.querySelector('.input-box');
    var todoList = document.querySelector('.todoList');

    var intro_btn_class_flag = false;
    
    var class_object_arr = [
        {
            el: intro_btn,
            class: intro_btn.getAttribute('class')
        },
        {
            el: input_box,
            class: input_box.getAttribute('class')
        },
        {
            el: todoList,
            class: todoList.getAttribute('class')
        }      
    ];

    intro_btn.onclick = function() {

        // var _intro_btn_class = intro_btn_class;
        // var _input_box_class = input_box_class;
        // var _todoList_class = todoList_class;

        if( !intro_btn_class_flag ) {
            addClasses('-actived');
            intro_btn_class_flag = true;
        } else {
            addClasses();
            intro_btn_class_flag = false;
        }
            
    }

    function addClasses(name) {

        name = name || '';

        for(var i = 0, len = class_object_arr.length; i < len; i++) {
            var obj = class_object_arr[i];
            var element = obj.el;
            var element_class = obj.class;

            if(name !== '') {
                var _temp = element_class + ' ' + element_class + name;
                element.setAttribute('class', _temp);    
            } else {
                element.setAttribute('class', element_class);    
            }
        }
    }

    // 동적 생성
    var add_btn = document.querySelector('.add-btn');
    var input_text = document.querySelector('#todoInput');

    function setElements(input) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        var text = document.createTextNode(input.value);
        var del_btn = document.createElement('button');
        var close_marker = document.createElement('i');
        
        input.value = '';

        close_marker.setAttribute('class', 'fa fa-times');
        close_marker.setAttribute('aria-hidden', 'true');
        del_btn.setAttribute('class', 'del-btn');
        
        del_btn.onclick = function() {
            var parent_li = del_btn.parentNode;
            todoList.removeChild(parent_li);
        }

        span.appendChild(text); 
        del_btn.appendChild(close_marker);
        li.appendChild(span);
        li.appendChild(del_btn);
        todoList.appendChild(li);
    }

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

}(window));