$(function() {
    $(".thumbnail img").click(function() {
        $(".pic").attr("src", $(this).attr("src"));
    });
}); 