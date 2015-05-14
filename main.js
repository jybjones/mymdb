var API_URL = "http://www.omdbapi.com/?t="
var API_URL2 = "&y=&plot=short&r=json"
var FIREBASE_URL ="https://moviedatabase.firebaseio.com/movies.json" 

/////////Begin Firebase////////
$.get(FIREBASE_URL, function (movieDetails) {
  Object.keys(movieDetails).forEach(function (id) {
    addMovieDetail(movieDetails[id], id);
  });
}); 

var $movieDetails = $('.Details');
  $movieDetails.on('click', '.btn', function () {
  var $movie = $(this).closest('.movie');
  var id = $movie.attr('data-id');
  var deleteUrl = FIREBASE_URL.slice(0, -5) + '/' + id + '.json';
    console.log(deleteUrl);

 $.ajax({
    url: deleteUrl,
    type: 'DELETE',
    success: function() {
      $movie.remove();
    }
  })
  
});
////////////////end Firebase////////
var $searchButton = $('.search-button');
$searchButton.click(function () {
  var title = $(this).prev().val();
  var url = API_URL + title + API_URL2;
  $.get(url, function (data) {
    $.post(FIREBASE_URL, JSON.stringify(data), function (res) {
      addMovieDetail(data, res.Title);
    });
  }, 'json');
});
// JSONP_CALLBACK
function addMovieDetail(data, id) {
  var detail = popMovieDetails(data, id);
  var $target = $('.movie-list');
  // $target.empty();
  $target.append(detail);
}

// CREATES DOM ELEMENT
function popMovieDetails(data, id) {
  var docFragment = document.createDocumentFragment(); // contains all gathered nodes
//beginning of function how things are pulled into pg//
var tbody = document.querySelector(".Details");
var tr = document.createElement('TR');
tr.setAttribute("class", "movie");
tr.setAttribute("data-id", id)
tbody.appendChild(tr);

var td = document.createElement('TD');
td.setAttribute("class", "Poster");
tr.appendChild(td);
var img = document.createElement('img')
var Poster = data.Poster
img.setAttribute("src", Poster);
td.appendChild(img);

var td_0 = document.createElement('TD');
td_0.setAttribute("class", "Title");
tr.appendChild(td_0);
var text_0 = document.createTextNode(data.Title);
td_0.appendChild(text_0);

var td_1 = document.createElement('TD');
td_1.setAttribute("class", "Year");
tr.appendChild(td_1);
var text_1 = document.createTextNode(data.Year);
td_1.appendChild(text_1);

var td_2 = document.createElement('TD');
td_2.setAttribute("class", "Rating");
tr.appendChild(td_2);
var text_2 = document.createTextNode(data.imdbRating);
td_2.appendChild(text_2);

var td_3 = document.createElement('TD');
td_3.setAttribute("class", "Watched");
tr.appendChild(td_3);

var text_3 = document.createTextNode("Watched");
var btn = document.createElement('button');
/*btn.setAttribute('class', 'btn btn-danger');*/
btn.setAttribute('class', 'btn btn-delete'); 
var btn_text = document.createTextNode('X');
  btn.appendChild(btn_text);
td_3.appendChild(btn);
  return docFragment;
  console.log(data.Poster);
}

/* /*///run function here//*/
function getJSON(url, cb) {
  var script = document.createElement('script');
  script.src = url + '&callback=' + cb;
  
  document.body.appendChild(script);
} 