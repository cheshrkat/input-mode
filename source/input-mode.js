/**
 * inputMode. (c) Ben Buchanan, MIT license.
 * https://github.com/cheshrkat/input-mode
 *
 * @param {object} Pass all options as object.
 * @property {element} element - DOM element to apply the mode attribute to. Defaults to body element.
 * @property {string} attr - Attribute name to contain the mode strings. Defaults to data-inputmode
 * @property {int} delay - debounce delay in ms. Default 200.
 * @property {string} default - Sets default mode ('mouse'|'keyboard'|'touch'). Defaults to 'mouse'.
 */
function inputMode(opts) {
    var opts = opts || {};
    var el = opts.element || document.getElementsByTagName('body')[0];
    var attr = opts.attr || 'data-inputmode';
    var delay = opts.delay || 200;
    var mode = opts.default || 'mouse';

    // bail out in old browsers
    if (!document.addEventListener) { return; };

    // set default mode
    el.setAttribute(attr, mode);

    // set mode and mirror to data attribute
    function setMode(event) {
        // don't do anything if the mode hasn't changed
        if (event != mode) {
            mode = event;
            el.setAttribute(attr, mode);
        }
    };

    // shout out https://davidwalsh.name/javascript-debounce-function
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    window.addEventListener('mousemove', debounce(function() {
        setMode('mouse')
    }, delay, true));

    window.addEventListener('mousedown', debounce(function() {
        setMode('mouse')
    }, delay, true), true);

    window.addEventListener('pointerdown', debounce(function() {
        setMode('mouse')
    }, delay, true), true);

    window.addEventListener('touchstart', debounce(function() {
        setMode('touch')
    }, delay, true), true);

    window.addEventListener('keydown', debounce(function() {
        setMode('keyboard')
    }, delay, true), true);

}
