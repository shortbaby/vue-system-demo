var isDragging = false;

var isIE8 = Number(document.documentMode) < 9;

var fixEvent = function(event) {
    var scrollTop = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0);
    var scrollLeft = Math.max(window.scrollX || 0, document.documentElement.scrollLeft || 0);

    event.target = event.srcElement;
    event.pageX = scrollLeft + event.clientX;
    event.pageY = scrollTop + event.clientY;
};

export default function(element, options) {
    var moveFn = function(event) {
        if (isIE8) {
            fixEvent(event);
        }
        if (options.drag) {
            options.drag(event);
        }
    };
    var upFn = function(event) {
        if (isIE8) {
            fixEvent(event);
        }
        document.removeEventListener('mousemove', moveFn);
        document.removeEventListener('mouseup', upFn);
        document.onselectstart = null;
        document.ondragstart = null;

        isDragging = false;

        if (options.end) {
            options.end(event);
        }
    };
    element.addEventListener('mousedown', function() {
        if (isIE8) {
            fixEvent(event);
        }
        if (isDragging) return;
        document.onselectstart = function() {
            return false;
        };
        document.ondragstart = function() {
            return false;
        };

        document.addEventListener('mousemove', moveFn);
        document.addEventListener('mouseup', upFn);

        isDragging = true;
        if (options.start) {
            options.start(event);
        }
    });
}