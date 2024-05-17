$(document).ready(function () {
    $('img[data-enlargable]').click(function () {
        console.log("Image clicked");
        var src = $(this).attr('src');
        console.log("Image source: ", src);
        if (src) {
            $('<div>').addClass('fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center').click(function () {
                $(this).remove();
            }).append($('<img>').attr('src', src).addClass('max-w-full max-h-full cursor-zoom-out h-2/3 w-2/3 rounded-md')).appendTo('body');
        } else {
            console.error('Image source not found.');
        }
    });
});