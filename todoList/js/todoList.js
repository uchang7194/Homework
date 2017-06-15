
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