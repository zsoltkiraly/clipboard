/*
Clipboard - Code by Zsolt Király
v1.0.1 - 2017-04-22
*/

'use strict';
var clipboard = function() {

    var config;

    function forEach(array, callback, scope) {
        var i = 0,
            len = array.length;
        if(len > 0) {
            for (; i < len; i++) {
                callback.call(scope, i, array[i]);
            }
        }
    }

    function findAncestor(element, elementClass) {
        while ((element = element.parentElement) && !element.classList.contains(elementClass));
        return element;
    }

    function app() {
        var clipboardContainer = document.querySelectorAll('.clipboard-container');

        forEach(clipboardContainer, function(index, clipboard) {
            var clipboardButton = clipboard.querySelector('.clipboard-icon');

            clipboardButton.addEventListener('click', function(event) {
                var obj = this,
                    objectParent = findAncestor(obj, 'clipboard-container');

                var emailLink = objectParent.querySelector('.clipboard-text'),
                    popup = objectParent.querySelector('.clipboard-popup.hide');

                if(popup) {
                    var range = document.createRange();
                    range.selectNode(emailLink);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();

                    popup.style.WebkitTransitionDuration = config.popupDuration + 'ms';
                    popup.style.transitionDuration = config.popupDuration + 'ms';
                    popup.classList.remove('hide');

                    setTimeout(function() {
                        popup.classList.add('show');
                    }, 50);

                    setTimeout(function() {
                        popup.classList.remove('show');

                        setTimeout(function() {
                            popup.classList.add('hide');
                        }, config.popupDuration);
                    }, config.popupShowTime);
                }
            }, false);
        });
    };

    return {
        app: app
    }

}();

window.addEventListener('load', function() {
    clipboard.app(
        config = {
            popupShowTime: 2000,
            popupDuration: 500
        }
    );
}, false);
