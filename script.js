$('.title-input').on('keyup', enableSubmit);
$('.body-input').on('keyup', enableSubmit);
$('.save-btn').on('click', createCard);
$('.bottom-box').on('click', deleteIdea);
// $('.upvote-btn').on('click', upVote);
// $('.downvote-btn').on('click', downVote);
 $('.save-btn').prop('disabled', true);
 
$(document).ready(getFromStorage);

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
     $('form')[0].reset();
};

function localStoreCard(cardObject) {
    var cardString = JSON.stringify(cardObject);
    localStorage.setItem(cardObject.id, cardString);
};

function getFromStorage() {
  for (i = 0; i < localStorage.length; i++) {
    var cardData = localStorage.getItem(localStorage.key(i));
    var parsedNewCard = JSON.parse(cardData);
    createHTML(parsedNewCard.title, parsedNewCard.body, 
      parsedNewCard.quality, parsedNewCard.id)
  }
}

function deleteIdea(event) {
  if (event.target.className === 'delete-btn');
    $(event.target).parent().remove();
    var id = $(event.target).parents('.card-container').data('id');
    localStorage.removeItem(id);
   
}
  



// else if (event.target.className === "delete-btn") {


  //       var cardHTML = $(event.target).closest('.delete-btn').remove();
  //       var cardHTMLId = cardHTML[0].id;
  //       localStorage.removeItem(cardHTMLId);

  // $(event.target).closest('.card-container').remove();
  //       var cardHTMLId = cardHTML[0].id;
  //       localStorage.removeItem(cardHTMLId);

// else if (event.target.className === "delete-btn") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }

// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote-btn" || event.target.className === "downvote-btn"){

//         if (event.target.className === "upvote-btn" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote-btn" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote-btn" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote-btn" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote-btn" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote-btn" && currentQuality === "genius") {
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
   
    
// });
      










