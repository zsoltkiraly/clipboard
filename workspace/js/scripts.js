/*
Clipboard - Code by Zsolt Király
v1.0.1 - 2017-04-22
*/

'use strict';
var clipboard = function() {

    function signatura() {
        if (window['console']) {
            const text = {
                black: '%c     ',
                blue: '%c   ',
                author: '%c  Zsolt Király  ',
                github: '%c  https://zsoltkiraly.com/'
            }

            const style = {
                black: 'background: #282c34',
                blue: 'background: #61dafb',
                author: 'background: black; color: white',
                github: ''
            }

            console.log(text.black + text.blue + text.author + text.github, style.black, style.blue, style.author, style.github);
        }
    }

    signatura();

    function app(config) {

        var clipboardContainer = document.querySelectorAll('.clipboard-container');

        clipboardContainer.forEach((clipboard)=> {
            var clipboardButton = clipboard.querySelector('.clipboard-icon');

            clipboardButton.addEventListener('click', function(event) {

                var obj = this,
                    objectParent = obj.closest('.clipboard-container');

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
        {
            popupShowTime: 2000,
            popupDuration: 500
        }
    );
}, false);