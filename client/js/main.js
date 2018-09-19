var Image = window.Image,
    $ = window.$,
    Navbar = $(".navbar"),
    Menu = $(".navbar-menu"),
    Body = $("html, body"),
    FootTop = $(".footer-top"),
    NavList = $(".navbar-list"),
    LoadImg = $("load-img");
Menu.on("click", function() {
        return NavList.toggleClass("navbar-list-show"), Navbar[(window.scrollY < 50 && $(window).width() < 700 && !NavList.hasClass("navbar-list-show") ? 'remove' : 'add') + 'Class']("navbar-focus")
    }),
    FootTop.on("click", function() {
        Body.animate({ scrollTop: 0 }, 500)
    }),
    $(window).scroll(function() {
        Navbar[(window.scrollY > 50 || NavList.hasClass("navbar-list-show") && $(window).width() < 700 ? 'add' : 'remove') + 'Class']("navbar-focus")
    }),
    LoadImg.each(function(o, a) {
        var t = new Image,
            n = a.getAttribute("src"),
            e = a.getAttribute("alt"),
            r = a.getAttribute("class");
        t.onload = function() {
            var o = $(t);
            o.attr("alt", e), o.attr("class", r), a.before(o.get(0)), $(a).remove()
        }, t.onerror = function(o) { console.log("One of the images didn't load " + o) }, t.src = n
    }), $(document).ready(function() { $("a[href^='/']").click(function() { $("div.cover").addClass("load") }) });
