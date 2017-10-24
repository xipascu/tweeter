  //Updates the character count in footer as user inputs in form
$(document).ready(function () {
  $('.new-tweet form').on('input', 'textarea' , function() { 
    var countUpdate = $(this).parent().find('.counter');
    var charLeft= 140 - $(this).val().length;
    countUpdate.text(charLeft);
    var colorUpdate = (charLeft < 0) ? "#ff0000" : "#000000";
    countUpdate.css({
      color: colorUpdate
    }).text(charLeft);
  }); 
});

