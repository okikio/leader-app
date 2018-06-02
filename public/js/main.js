var Rye = window.Rye;
var $ = function $(arg) {
    return new Rye(arg);
};
var Navbar = $(".navbar");
var Menu = $(".navbar-menu");
var FootTop = $(".footer-top");
var NavList = $(".navbar-list");
var Content = $(".fadeOut");

var _Animate, Anim, Avail, _Screen = {};
var Ease = function Ease(start, stop, vel) {
    return start + (stop - start) / vel;
};

var SetScreen = function SetScreen() {
    return {
        height: document.body.scrollHeight,
        fullHeight: window.outerHeight
    };
};

Menu.on("click", function() {
    return NavList.toggleClass("navbar-list-show");
});

FootTop.on("click", function() {
    return window.requestAnimationFrame(_Animate = function Animate() {
        if (window.scrollY > 0) {
            window.requestAnimationFrame(_Animate);
            window.scrollTo(0, Ease(window.scrollY, 0, 5));
        }
    });
});

window.onload = function(e) {
    Content.addClass("fadeIn");
    setTimeout(function () {
        Content.removeClass("fadeOut");
    }, 4000);
    window.onscroll = function() {
        _Screen = SetScreen();
        Avail = _Screen.height - _Screen.fullHeight;
        Navbar.toggleClass("navbar-shadow", window.scrollY > 50);
        FootTop.toggleClass("footer-top-focus", window.scrollY > (Avail / 2));
    };
};
