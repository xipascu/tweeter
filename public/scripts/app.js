$(function () {

// var tweetsArr = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

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

  $('section.new-tweet form').on('submit', function(event){
    event.preventDefault();
    var theForm= this;
    var data= $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: data
    }).done(function() {
      theForm.reset();
      
      loadTweets();
    });
  });
});