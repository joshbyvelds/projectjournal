$.fn.toggleAttr = function(attr, val) {
    var test = $(this).attr(attr);
    if ( test ) {
        // if attrib exists with ANY value, still remove it
        $(this).removeAttr(attr);
    } else {
        $(this).attr(attr, val);
    }
    return this;
};