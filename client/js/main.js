var Image = window.Image,
    $ = window.$,
    Element = window.Element,
    CharacterData = window.CharacterData,
    DocumentType = window.DocumentType,
    Node = window.Node,
    Navbar = $(".navbar"),
    Menu = $(".navbar-menu"),
    Body = $("body"),
    NavBackUp = $(".navbar-backup"),
    NavList = $(".navbar-list"),
    LoadImg = $("load-img");
var Hero = $(".layer-hero");
var HeroImg = $(".layer-hero-img");
var min = Math.min, max = Math.max;
var map = function (e, t, n, r, i) { return r + (i - r) * ((e - t) / (n - t)); };
var Scroll = function() {
    var Top = Body.scrollTop(),
        _Height = Hero.eq(0).height();
    var _Per = function (mn, mx) { return map(Top, 0, _Height, mn, mx); };
    Navbar[
        (window.scrollY > 50 ||
        (NavList.hasClass("navbar-list-show") && $(window).width() < 700)
            ? "add"
            : "remove") + "Class"
    ]("navbar-focus");
    Navbar.css({
        "box-shadow": "0 " + max(_Per(5, -10), 2.5) + "px 10px 5px rgba(0, 0, 0, 0.12)"
    });
    
    Hero.each(function(i, hero) {
        var _Hero = Hero.eq(i),
            Pos = _Hero.offset().top,
            Height = _Hero.height();
        var Per = function (mn, mx) { return map(Top, (Pos + Top), (Pos + Top) + Height, mn, mx); };
        if ((Pos <= 0 && (Height + Pos) >= 0) || 
            (Math.round(Per(0, 100)) == 0 || Math.round(Per(0, 100)) == 100)) {
            if (_Hero.hasClass("layer-hero-sub")) {
                _Hero.find(".layer-hero-overlay").css({
                    opacity: min(Per(0.45, 1), 0.99),
                    "z-index": i
                });
                _Hero.find(".layer-hero-img").css({
                    transform: "translate(-50%, -50%) scale(" + Per(1, 1.55) + ")",
                    "z-index": i
                });
                _Hero.find(".layer-hero-content").css({
                    "z-index": i
                });
            } else {
                _Hero.find(".layer-hero-overlay").css({
                    opacity: min(Per(0.55, 1), 0.99),
                    "z-index": i
                });
                _Hero.find(".layer-hero-img").css({
                    transform: "translate(-50%, -50%) scale(" + Per(1, 1.45) + ")",
                    "z-index": i
                });
                _Hero.find(".layer-hero-content").css({
                    transform: "translate(-50%, " + min(Per(- 50, 200), 100) + "%)",
                    opacity: max(Per(1, -0.4), 0.7),
                    "z-index": i
                });
                _Hero.find(".layer-hero-author").css({
                    opacity: max(Per(1, -5.9), 0),
                    "z-index": i
                });
            }
            
            _Hero.find(".layer-hero-godown").css({
                opacity: max(Per(1, -0.9), 0),
                "z-index": i
            })
        }
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
                        isNode
                            ? argItem
                            : document.createTextNode(String(argItem))
                    );
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
            !NavList.hasClass("navbar-list-show")
                ? "remove"
                : "add") + "Class"
        ]("navbar-focus")
    );
});
HeroImg.each(function() {
    $(this).css("background", "url(" + $(this).attr("data-src") + ")");
    $(this).after(
        $("<img/>").attr({
            src: $(this).attr("data-src"),
            class: $(this).attr("class")
        })
    );
});
NavBackUp.on("click", function() {
    Body.animate({ scrollTop: 0 }, 800, Scroll);
});
Body.scroll(Scroll);
$(document).ready(function() {
    $("div.cover").on("click", function() {
        $(this).removeClass("load");
    });
    setTimeout(function() {
        $("div.cover").removeClass("load");
        $("a[href^='/']").click(function(e) {
            $("div.cover").addClass("load");
        });
    }, 500);
    LoadImg.each(function(o, a) {
        var t = new Image(),
            n = a.getAttribute("src"),
            e = a.getAttribute("alt"),
            r = a.getAttribute("class");
        (t.onload = function() {
            var o = $(t);
            o.attr("alt", e),
                o.attr("class", r),
                a.before(o.get(0)),
                $(a).remove();
        }),
            (t.onerror = function(o) {
                console.log("One of the images didn't load " + o);
            }),
            (t.src = n);
    });
});
