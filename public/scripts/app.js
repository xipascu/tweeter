$(function () {

  function renderTweets(tweetsArr) {
    $('#tweets').empty();
    for (var tweet of tweetsArr) {
      $('#tweets').prepend(createTweetElement(tweet));
    }
  }
  
  function createTweetElement(tweetsArr) {
    var createdAt = moment(tweetsArr.created_at).fromNow();
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
              'text': tweetsArr.user.handle
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
              'text': createdAt 
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

      //Get tweets from server
  function loadTweets() {
    $.ajax({
      method:'GET',
      url: '/tweets/'
    }).done(function(json) {
      renderTweets(json);
    });
  }

  loadTweets();

    //Submits new tweets, includes errors, posts without refreshing
  $('section.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    var theForm = this;
    var data = $(this).serialize();
    var charCountLeft = Number($(this).text());
    if (charCountLeft < 0) {
      alert("You cannot submit an empty tweet, go ahead and fill it it!");
    } else if (charCountLeft >= 140) {
      alert("You have reached the maximum limit of characters allowed.");
    } else {
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

  $("#nav-bar").on('click', '.composeBTN', function(event){
    var newTweet= $('.container').find('.new-tweet');
    newTweet.slideToggle();
    newTweet.find('form').find('textarea').focus();
  });
});

