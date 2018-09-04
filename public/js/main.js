var $ = window.$;
$(document).ready(function() {
    $("a[href^='/']").click(function() {
        $("div.cover").addClass("load");
    });
});
