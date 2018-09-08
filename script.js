$('.title-input').on('keyup', enableSubmit);
$('.body-input').on('keyup', enableSubmit);
$('.save-btn').on('click', createCard);
// $('.delete-btn').on('click', deleteIdea);
// $('.upvote-btn').on('click', upVote);
// $('.delete-btn').on('click', downVote);
 $('.save-btn').prop('disabled', true);
 
function Card(title, body, quality) {
    this.title = title;
    this.body = body;
    this.quality = quality;
    this.id = Date.now();
};

function createCard(event) {
  event.preventDefault();
  enableSubmit();
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var newCard = new Card(titleInput, bodyInput, 'swill');
  createHTML(newCard.title, newCard.body, newCard.quality, newCard.id);
  clearInputs();
  localStoreCard(newCard);
};


function createHTML(title , body , quality, id) {
    var newCard = 
             `<div class="card-container"  data-id=${id}> 
            <h2 contenteditable="true" class="title-of-card">${title}</h2> 
            <button class="delete-btn"></button>
            <p contenteditable="true" class="body-of-card">${body}</p>
            <p class="quality">
            <button class="upvote-btn"></button>
            <button class="downvote-btn"></button>
            quality: <span class="qualityVariable">${quality}</span></p>
            <hr>
            </div>`
  $('.bottom-box').prepend(newCard);
  $('.save-btn').prop('disabled', true);
};


function enableSubmit(event) {
    if ($('.title-input').val() === "" || $('.body-input').val() === "") {
       $('.save-btn').prop('disabled', false);
  };
};  

function clearInputs() {
    $('.title-input').val('');
    $('.body-input').val('');
};




function localStoreCard(cardObject) {
    var cardString = JSON.stringify(cardObject);
    localStorage.setItem(cardObject.id, cardString);
};

//     numCards++;
//     $( ".bottom-box" ).prepend(newCard('card' + numCards, $('.title-input').val(), $('.body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));



// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });
      










