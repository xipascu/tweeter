$(document).ready(function () {
  $('.new-tweet form').on('input', 'textarea' , function() {
    //console.log($(this), "heyo"); 
    var countUpdate = $(this).parent().find('.counter');
    var charLeft= 140 - $(this).val().length;
    // console.log(charLeft);
    countUpdate.text(charLeft);
    // $(".counter").css()
    var colorUpdate = (charLeft < 0) ? "#ff0000" : "#000000";
    countUpdate.css({
      color: colorUpdate
    }).text(charLeft);
  }); 
});

