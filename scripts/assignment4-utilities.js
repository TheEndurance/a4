var ErrorUtilities = {
    AppendToElement: function (id, text, elementType, newElementId, nameOfClass) {
        'use strict';
        if (typeof id == 'string'
            && typeof text == 'string'
            && typeof elementType == 'string'
        ) {
            var output = document.getElementById(id);
            var newElement = document.createElement(elementType);
            var textNode = document.createTextNode(text);
            if (typeof nameOfClass == 'string') {
                newElement.className = nameOfClass;
            }
            newElement.appendChild(textNode);
            output.appendChild(newElement);
        }
    },

    AppendToParent: function (id, text, elementType, newElementId, nameOfClass) {
        'use strict';
        if (typeof id == 'string'
            && typeof text == 'string'
            && typeof elementType == 'string'
            && typeof newElementId == 'string'
        ) {
            //get the output element
            var output = document.getElementById(id);
            //create the new element and set its ID
            var newElement = document.createElement(elementType);
            newElement.id = newElementId
            //add the error message
            var textNode = document.createTextNode(text);
            //append the message
            newElement.appendChild(textNode);
            //check if a class name has been specified and set it if it has
            if (typeof nameOfClass == 'string' && nameOfClass.length > 0) {
                newElement.className = nameOfClass;
            }
            output.parentNode.appendChild(newElement);
        }
    },
    //Function to find a parent of an element based on class name
    AddClassOnParentElement: function (id, parentClassName, newClassName) {
        "use strict";
        var currentElement = document.getElementById(id);
        var parent = currentElement.parentElement;
        while (!parent.classList.contains(parentClassName)) {
            parent = parent.parentElement
        }
        parent.classList.add(newClassName);
    },

    RemoveClassOnParentElement: function (id, parentClassName, newClassName) {
        "use strict";
        var currentElement = document.getElementById(id);
        var parent = currentElement.parentElement;
        while (!parent.classList.contains(parentClassName)) {
            parent = parent.parentElement
        }
        parent.classList.remove(newClassName);
    },

    FocusOnElement: function (id) {
        "use strict";
        if (typeof id == "string") {
            var focusElement = document.getElementById(id);
            focusElement.focus();
        }
    },
}