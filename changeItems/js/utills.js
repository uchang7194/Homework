var utills = (function(global){//IIFE Namespace

    /*==============================
                [Validation]
    ================================*/
    /*==============================
    *[validateData]
    *@func 
    *@param1 data - data
    *@param2 type - string
    *@return boolean
    *@desc data가 어떤 타입인지 확인하는 함수.
    *================================*/
    var validateData = function(data, type) {
        var temp = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
        if(temp === type) { return true; }
        else { return false; }
    }
    /*==============================
    *[validateElement]
    *@func 
    *@param1 node - elementNode
    *@return boolean 
    *@desc elementNode인지 확인하는 함수
    *================================*/
    var validateElement = function(node) {
        if(validateData(node, 'undefined')) { throw 'undefined' }
        return (node.nodeType === 1) ? true : false;
    }
    
    /*==============================
    *[emptyString]
    *@func 
    *@param1 str - string
    *@result boolean
    *@desc 문자열이 공백인지 확인하는 함수.
    *================================*/
    var isEmptyString = function(str) {
        if( !validateData(str, 'string') ) { throw 'string이 아닙니다.'}
        
        if( str === '' || str.trim().length === 0 ) { 
            return false; 
        } 

        return true;
            
    }
    /*==============================
            [Element 생성 추가 삭제]
    ================================*/
    /*==============================
    *[createElement]
    *@func 
    *@param1 tag_name - string
    *@return elementNode
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
    *@return elementNode
    *@desc elementNode를 생성하고 반환하는 함수. 요소가 없으면 null값을 반환
    *================================*/
    var createQuerySelector = function(selector, parent) {
        if( !validateData(name, 'string') ) { throw '문자열이 아닙니다.' }
        // 요소가 없으면 Null을 반환
        parent = parent || document.body;

        return parent.querySelector(selector);
    }
    /*==============================
    *[createObjAddElement]
    *@func 
    *@param1 obj - object
    *@return obj - 속성이 추가된 obj를 반환
    *@desc obj객체의 el 속성에 elementNode속성을 추가시켜 반환하는 함수.
    *================================*/
    var createObjAddElement = function(obj) {
        
        if( !validateData(obj, 'object') ) { throw 'object 객체가 들어와야 합니다' }

        obj.el = createQuerySelector(obj.selector);
    
        return obj;
    }
    /*==============================
    *[appendChild]
    *@func 
    *@param1 el - elementNode
    *@param2 child - elementNode
    *@return none
    *@desc el에 child를 자식노드로 추가시켜주는 함수.
    *================================*/
    var appendChild = function(el, child) {
        if( !validateElement(el) ) { throw '첫번째 인자가 elementNode가 아닙니다.' }
        // if( !validateElement(child) ) { throw '두번째 인자가 elementNode가 아닙니다.' }

        el.appendChild(child);
    }
    /*==============================
    *[createTextNode]
    *@func 
    *@param1 text - string
    *@return elementNode
    *@desc textNode를 만들어 반환시켜주는 함수
    *================================*/
    var createTextNode = function(text) {
        if( !validateData(text, 'string') ) { throw '첫번째 인자가 String이 아닙니다.' }

        if( isEmptyString(text) ) { 
            return document.createTextNode(text);
        } else {
            throw '빈 문자열입니다.';
        }
    }
    /*==============================
    *[parent]
    *@func 
    *@param1 el - ElementNode 
    *@param2 depth - Number
    *@return ElementNode 
    *@desc depth만큼 부모를 찾아주는 함수.
    *================================*/
    var parent = function(el, depth) {
        if( !validateElement(el) ) { throw '첫번째 인자는 ElementNode가 아닙니다.' }

        depth = depth || 1;

        do{
            el = el.parentNode;
        } while (el && --depth)
        
        return el;
    }

    /*==============================
    *[removeChild]
    *@func 
    *@param1 parent - ElementNode
    *@param2 child - ElementNode
    *@return child 
    *@desc 부모요소에서 자식요소를 제거하는 함수.
    *================================*/
    var removeChild = function(parent, child) {
        if( !validateElement(parent) ) { throw '첫번째 요소가 ElementNode가 아닙니다.' }
        if( !validateElement(child) ) { throw '두번째 요소가 ElementNode가 아닙니다.' }

        if( !parent.hasChildNodes() ) { throw '자식요소가 없습니다.' }

        parent.removeChild(child);

        return child;
    }
    /*==============================
    *[removeAll]
    *@func 
    *@param1 parent - ElementNode
    *@return array - child노드들을 저장하고 있는 배열을 리턴한다. 
    *@desc 부모요소에 있는 자식요소들을 모두 제거하는 함수.
    *================================*/
    var removeAll = function(parent) {

        if( !validateElement(parent) ) { throw '첫번째 요소가 ElementNode가 아닙니다.' }
        if( !parent.hasChildNodes() ) { throw '자식요소가 없습니다.' }

        var childNode_storage = [],
            parent_class = getAttribute(parent, 'class').split(' ');
            console.log('parent_class:', parent_class[0]);
        for( var i = 0, len = parent.children.length; i < len; i++ ) {
            // parent.children은 유사배열이기 때문에 배열처럼 값을 가져올 때 문제가 생길 수 있음.
            var child = createQuerySelector('.' + parent_class[0] + ' li');

            childNode_storage.push(child);
            parent.removeChild(child);
        }

        return childNode_storage;
    }

    /*==============================
    *[nextSibling]
    *@func 
    *@param1 el - ElementNode
    *@return ElementNode 
    *@desc 자신의 앞의 형제노드를 반환하는 함수.
    *================================*/
    var nextSibling = function(el) {
        if( !validateElement(el) ) { throw '첫번째 요소가 ElementNode가 아닙니다.' }

        return el.nextSibling;
    }

    var insertBefore = function(parent, target, ref) {
        if( !validateElement(parent) ) { throw '첫번째 요소가 ElementNode가 아닙니다.' }
        if( !validateElement(target) ) { throw '첫번째 요소가 ElementNode가 아닙니다.' }
        if( !validateElement(ref) ) { throw '첫번째 요소가 ElementNode가 아닙니다.' }

        parent.insertBefore(target, ref);
    }
    /*==============================
                [Attribute]
    ================================*/


    /*==============================
    *[getAttribute]
    *@func 
    *@param1 el - elementNode
    *@param2 attr - string
    *@return elementNode
    *@desc elementNode의 속성값을 반환시켜주는 함수
    *================================*/
    var getAttribute = function(el, attr) {

        if( !validateElement(el) ) { return null; }
        if( !validateData(attr, 'string') ) { throw '두번째 인자는 문자열이 들어와야 합니다.'}

        return el.getAttribute(attr);
    }

    /*==============================
    *[setAttribute]
    *@func 
    *@param1 el - elementNode,
    *@param2 attr - string
    *@return value - string
    *@desc elementNode의 속성을 할당해주는 함수.
    *================================*/
    var setAttribute = function(el, attr, value) {
        if( !validateElement(el) ) { throw '첫번째 인자는 문자열이 들어와야 합니다.' }
        if( !validateData(attr, 'string') ) { throw '두번째 인자는 문자열이 들어와야 합니다.'}
        if( !validateData(attr, 'string') ) { throw '세번째 인자는 문자열이 들어와야 합니다.'}
        
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

        if (hasClass(el, class_name)) {
            removeClass(el, class_name);
            
        } else {
            addClass(el, class_name);
        }
    }
    /*==============================
                [Event]
    ================================*/
    /*==============================
    *[connectEvent]
    *@func 
    *@param1 event - string
    *@param2 fn - function
    *@return none
    *@desc elementNode의 event를 할당해주는 함수.
    *================================*/
    var connectEvent = function(event, fn) {
        this[event] = fn;
    }
    /*==============================
    *[setEvent]
    *@func 
    *@param1 obj - object
    *@param2 fn - function
    *@return none
    *@desc object 객체와 function을 받아와 validation 검사를 하고 connectEvent함수에 값을 넘겨주는 함수.
    *================================*/
    var setEvent = function(obj, fn) {

        if( !validateData(obj, 'object') ) {throw '첫번째 인자는 함수가 들어와야 합니다.'}
        if( !validateData(obj.event, 'string') ) {throw '두번째 인자는 문자열이 들어와야 합니다.'}
        if( !validateData(fn, 'function') ) {throw '세번째 인자는 함수가 들어와야 합니다.'}

        
        connectEvent.apply(obj.el, [obj.event, fn]);
    }

    /*==============================
                 [Sort]
    ================================*/

    /*==============================
    *[selectionSort]
    *@func 
    *@param1 storage - array
    *@return Array 
    *@desc storage(Array)에 있는 값을 오름차순으로 정렬하는 함수.
    *================================*/
    var selectionSort = function(storage) {
        if( !validateData(storage, 'array') ) { throw 'array 형식이 아닙니다.' }

        for(var i = 0, len = storage.length; i < len; i++) {
            var index = getAttribute(storage[i], 'role-index');
            index = Number(index);
            for(var j = i+1; j < len; j++) {
                var after_index = getAttribute(storage[j], 'role-index'),
                    temp = null;
            
                after_index = Number(after_index);

                if( index > after_index ) {
                    temp = storage[j];
                    storage[j] = storage[i];
                    storage[i] = temp;
                }
            }
            
        }

        return storage;
    }
    // 노출 패턴
    return {
        // 검증
        validateData: validateData,
        // Element
        createElement: createElement,
        createObjAddElement: createObjAddElement,
        createTextNode, createTextNode,
        query: createQuerySelector,
        appendChild: appendChild,
        removeChild: removeChild,
        removeAll: removeAll,
        parent: parent,
        nextSibling: nextSibling,
        insertBefore: insertBefore,
        // Attribute 
        setAttr: setAttribute,
        getAttr: getAttribute,
        // Class
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // Event
        setEvent: setEvent,
        // Sort
        selectionSort: selectionSort
    }
}(window));
