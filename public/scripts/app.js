$(function () {

  function renderTweets(tweetsArr) {
    $('#tweets').empty();
    for (var tweet of tweetsArr) {
      $('#tweets').prepend(createTweetElement(tweet));
    }
  }

  function createTweetElement(tweetsArr) {
    return $('<article>', {
      html: [
        $('<header>', {
          'class': 'tweetHead clearfix',
          html: [
            $('<img>', {
              'class': 'images',
              'src': tweetsArr.user.avatars.regular
            }),
            $('<h2>', {
              'text': tweetsArr.user.name
            }), 
            $('<div>', {
              'class': 'headerP',
              'text': tweetsArr.handle
            })
          ]
        }),
        $('<div>', {
          'class':'tBody',
          html: [
            $('<p>', {
              'class': 'pBody',
              'text': tweetsArr.content.text
            })          
          ]
        }),
        $('<footer>', {
          'class': 'clearfix',
          html: [
            $('<div>', {
              'class': 'timestamp',
              'text': tweetsArr.created_at
            }),
          $('<img>', {
            'class': 'bottom',
            'src': "/images/bottomTweet.png"
          })]
        })
      ]  
    })
  };

  var allTweets = $('#tweets');

  function loadTweets() {
      //gets tweets from server
    $.ajax({
      method:'GET',
      url: '/tweets/'
    }).done(function(json) {
      renderTweets(json);
      //iterates over tweets
      // tweets.forEach(function (tweet) {
      //   allTweets.prepend(createTweetElement);
    });
  }

  loadTweets();

  $('section.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    var theForm= this;
    var data= $(this).serialize();
    var charCount = data.length - 5;
    if (charCount > 140) {
      alert("You have reached the maximum limit of characters allowed.");
    } else if (charCount < 1) {
      alert("You cannot submit an empty tweet, go ahead and fill it it!");
    } else {
      console.log("ajax ran", charCount);
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: data
      }).done(function() {
        theForm.reset();
        loadTweets();
      });
    }
  });

  // $('#nav-bar.composeBTN').on('click', function(event) {
  //   var newTweet= $('.containter').find('.new-tweet');
  //   newTweet.slideToggle( );


    $("#nav-bar").on('click', '.composeBTN', function(event){
      var newTweet= $('.container').find('.new-tweet');
      newTweet.slideToggle();
      newTweet.find('form').find('textarea').focus();
      
      // newTweet.slideToggle();
    });


});

