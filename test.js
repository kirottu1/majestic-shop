$(document).ready(function(){
    var links = $('.bound');
    var divs = $('div');
    links.click(function(event){
        divs.hide();
        divs.filter('.' + event.target.id).show();
    });
});