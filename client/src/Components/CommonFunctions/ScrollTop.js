
import $ from 'jquery';

const ScrollTop = () => {

    var hoverUp = $('#hoverUp');
    $(window).scroll(() => {
        if ($(window).scrollTop() > 20) {
            hoverUp.addClass('show');
        } else {
            hoverUp.removeClass('show');
        }
    });
    hoverUp.on('click', e => {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

}

export default ScrollTop
