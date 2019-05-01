var Image = window.Image,
    $ = window.$,
    Element = window.Element,
    CharacterData = window.CharacterData,
    DocumentType = window.DocumentType,
    Node = window.Node,
    Navbar = $(".navbar"),
    Menu = $(".navbar-menu"),
    NavLink = $(".navbar-link"),
    Body = $("body"),
    NavBackUp = $(".navbar-backup"),
    NavList = $(".navbar-list");
var Hero = $(".layer-hero");
var GoDown = $(".layer-hero-godown-anim, .layer-godown");
var HeroImg = $(".layer-hero-img-div");
var min = Math.min,
    max = Math.max;
var map = function map(e, t, n, r, i) { return r + (i - r) * ((e - t) / (n - t)); };
var Scroll = function Scroll() {
    var Top = Body.scrollTop(),
        _Height = Hero.eq(0).height();
    var _Per = function _Per(mn, mx) { return map(Top, 0, _Height, mn, mx); };
    Navbar[
        (window.scrollY > 50 ||
            NavList.hasClass("navbar-list-show") && $(window).width() < 700 ? "add" : "remove") + "Class"](
        "navbar-focus");
        
    if (Body.scrollTop() < ($(window).height() - Navbar.height())) {
        Navbar.css({
            "box-shadow": "0 " + max(_Per(2.5, -10), 0) + "px 10px 5px rgba(0, 0, 0, 0.12)"
        });
    } else {
        Navbar.css({
            "box-shadow": "0 " + min(_Per(-2.5, 10), -2.5) + "px 10px 5px rgba(0, 0, 0, 0.12)"
        });
    }
    
    $('.layer-content').each(function() {
        var $thisDist = $(this).offset().top;
        if (Top + 300 >= $thisDist + Top && $(this).attr('id')) {
            var makeActive = $(this).attr('id');
            $("li.navbar-link").removeClass('navbar-link-focus');
            $('li.navbar-link a[link="' + makeActive + '"]').parent(".navbar-link").addClass('navbar-link-focus');
        }
    });

    Hero.each(function(i, hero) {
        var _Hero = Hero.eq(i),
            Pos = _Hero.offset().top,
            Height = _Hero.height();
        var Per = function Per(mn, mx) { return map(Top, Pos + Top, Pos + Top + Height, mn, mx); };
        var Sub = function Sub() {
            if (_Hero.hasClass("layer-hero-sub")) {
                _Hero.find(".layer-hero-img").css({
                    transform: "translate(-50%, -" + (60 - max(min(Per(0, 20), 50), 0)) + "%)",
                    "z-index": i
                });

                _Hero.find(".layer-hero-overlay").css({
                    opacity: max(min(Per(0.45, 1), 0.99), 0.45),
                    "z-index": i
                });

                _Hero.find(".layer-hero-content").css({
                    "z-index": i
                });

            }
        };
        Sub();
        if (Pos <= 0 && Height + Pos >= 0 ||
            Math.round(Per(0, 100)) == 0 || Math.round(Per(0, 100)) == 100) {
            if (_Hero.hasClass("layer-hero-sub")) { Sub(); }
            else {
                _Hero.find(".layer-hero-overlay").css({
                    opacity: max(min(Per(0.55, 1), 0.99), 0.55),
                    "z-index": i
                });

                _Hero.find(".layer-hero-img").css({
                    transform: "translate(-50%, -50%) scale(" + max(min(Per(1, 1.45), 1.45), 1) + ")",
                    "z-index": i
                });

                _Hero.find(".layer-hero-content").css({
                    transform: "translate(-50%, " + max(min(Per(-50, 200), 100), -50) + "%)",
                    opacity: max(max(Per(1, -0.4), 0.7), -0.4),
                    "z-index": i
                });

            }

            _Hero.find(".layer-hero-godown-anim").css({
                opacity: min(max(Per(1, -3.9), 0), 1),
                "z-index": i
            });

        }
    });
};
var ImgLoad = function() {
    $("load-img").each(function(o, a) {
        var t = new Image(),
            n = a.getAttribute("src"),
            e = a.getAttribute("alt"),
            r = a.getAttribute("class");
        t.onload = function() {
            var o = $(t);
            o.attr("alt", e),
            o.attr("class", r + " load-img"),
            a.before(o.get(0)),
            $(a).remove();
        },
        t.onerror = function(o) {
            console.log("One of the images didn't load: " + o)
        },
        t.src = n;
    });
};
Scroll();

// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/before()/before().md
// Polyfill for IE
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty("before")) {
            return;
        }
        Object.defineProperty(item, "before", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function before() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(
                        isNode ? argItem : document.createTextNode(String(argItem)));

                });

                this.parentNode.insertBefore(docFrag, this);
            }
        });

    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
Menu.on("click", function() {
    return (
        NavList.toggleClass("navbar-list-show"),
        Navbar[
            (window.scrollY < 50 &&
                $(window).width() < 700 &&
                !NavList.hasClass("navbar-list-show") ?
                "remove" :
                "add") + "Class"](
            "navbar-focus"));

});
HeroImg.each(function(i) {
    $(this).css("background", "url(" + $(this).attr("data-src") + ")");
    $(this).after(
        $("<load-img/>").attr({
            src: $(this).attr("data-src"),
            class: $(this).attr("class"),
            alt: $(this).attr("alt"),
            id: "img" + i
        }));
        
    var a = $("load-img#img" + i);
    var t = new Image();
    var _src = $(this).attr("data-src");
    var _class = $(this).attr("class");
    var _alt = $(this).attr("alt");
    t.src = _src;
    t.onload = function() {
        var o = $(t);
        o.attr("alt", _alt),
        o.attr("class", _class + " load-img");
        a.after(t);
        $(a).remove();
    },
    t.onerror = function(o) {
        console.log("One of the images didn't load: " + o)
    };
});
NavBackUp.on("click", function() {
    Body.animate({ scrollTop: 0 }, 800, Scroll);
});
NavLink.on("click", function() {
    var Top = Body.scrollTop();
    var id = $(this).find("a").html().toLowerCase();
    var layer = $(".layer-content#" + id);
    Body.animate({ scrollTop: layer.offset().top + Top + 1 }, 600, Scroll);
});
GoDown.on("click", function() {
    var Top = Body.scrollTop();
    var End = $(this).parents(".layer-content").next(".layer-content");
    Body.animate({ scrollTop: End.offset().top + Top + 1 }, 600, Scroll);
});
Body.scroll(Scroll);
$(document).ready(function() {
    $("div.cover").on("click", function() {
        $(this).removeClass("load");
    });
    setTimeout(function() {
        $("div.cover").removeClass("load");
        $("a[href|='/']").click(function(e) {
            $("div.cover").addClass("load");
        });
    }, 500);
    ImgLoad();
});
