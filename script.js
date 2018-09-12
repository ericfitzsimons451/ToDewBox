$('.title-input').on('keyup', enableSubmit);
$('.body-input').on('keyup', enableSubmit);
$('.save-btn').on('click', createCard);
$('.bottom-box').on('click', deleteIdea);
$('.bottom-box').on('click', upVote);
$('.bottom-box').on('click', downVote);
$('.save-btn').prop('disabled', true);
$('.bottom-box').on('keyup', keyUpDelegator);
$('.bottom-box').on('click', '.card-container', changeToCompleted);

 
$(document).ready(getFromStorage);

function Card(title, body, quality) {
    this.title = title;
    this.body = body;
    this.quality = quality;
    this.id = Date.now();
    this.complete = false;
};

function createCard(event) {
  event.preventDefault();
  enableSubmit();
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var newCard = new Card(titleInput, bodyInput, 'swill');
  createHTML(newCard.title, newCard.body, newCard.quality, newCard.id);
  localStoreCard(newCard);
};

function createHTML(title, body, quality, id) {
    var newCard = 
             `<div class="card-container"  data-id=${id}> 
            <h2 contenteditable="true" class="title-of-card">${title}</h2> 
            <button class="delete-btn"></button>
            <p contenteditable="true" class="body-of-card">${body}</p>
            <p class="quality">
            <button class="upvote-btn"></button>
            <button class="downvote-btn"></button>
            quality: <span class="quality-variable">${quality}
            </span><button class='to-be-completed'>Completed</button></p>
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
    clearInputs();
};

function getFromStorage() {
  for (i = 0; i < localStorage.length; i++) {
    var cardData = localStorage.getItem(localStorage.key(i));
    }; 
    var parsedNewCard = JSON.parse(cardData);
    console.log(parsedNewCard);
    if (parsedNewCard.complete === false) {
    createHTML(parsedNewCard.title, parsedNewCard.body, 
      parsedNewCard.quality, parsedNewCard.id)
    } 
  };


function deleteIdea(event) {
  if (event.target.className === 'delete-btn') {
    var id = $(event.target).parents('.card-container').data('id');
    $(event.target).parent().remove();
    localStorage.removeItem(id);
 }; 
}; 

function upVote(event) {
  if (event.target.className === "upvote-btn") {
    var localStoreCard = JSON.parse(localStorage.getItem($(event.target).parents('.card-container').attr('data-id')));
    localStoreCard.quality = changeVoteUp(event.target);
    localStorage.setItem($(event.target).parents('.card-container').attr('data-id'), JSON.stringify(localStoreCard));
  };
};

function changeVoteUp(target) {
  if ($(target).siblings('.quality-variable').text() === 'swill') {
    $(target).siblings('.quality-variable').text('plausible');
    return 'plausible';
  } else {
    $(target).siblings('.quality-variable').text('genius');
    return 'genius';
  };
};

function downVote(event) {
    if (event.target.className === "downvote-btn") {
  var localStoreCard = JSON.parse(localStorage.getItem($(event.target).parents('.card-container').attr('data-id')));
        localStoreCard.quality = changeVoteDown(event.target);
      localStorage.setItem($(event.target).parents('.card-container').attr('data-id'), JSON.stringify(localStoreCard));
      };
};  

function changeVoteDown(target) {
  if ($(target).siblings('.quality-variable').text() === 'genius') {
      $(target).siblings('.quality-variable').text('plausible');
        return 'plausible';
      } else {
        $(target).siblings('.quality-variable').text('swill');
        return 'swill';
      };
};

function keyUpDelegator(event) {
  if (event.target.classList.contains('title-of-card')) {
    editContentTitle(event)
  } else if (event.target.classList.contains('body-of-card')) {
    editContentBody(event);
  };
};

function editContentTitle(event) {
  var updateEdit = JSON.parse(localStorage.getItem($(event.target).parents('.card-container').data('id')));
  updateEdit.title = event.target.innerText;
  localStorage.setItem($(event.target).parents('.card-container').data('id'), JSON.stringify(updateEdit));
}; 

function editContentBody(event) {
  var updateEdit = JSON.parse(localStorage.getItem($(event.target).parents('.card-container').data('id')));
  updateEdit.body = event.target.innerText;
  localStorage.setItem($(event.target).parents('.card-container').data('id'), JSON.stringify(updateEdit));
}; 

$(".filter-input").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $(".card-container").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

// function changeToCompleted(e) {
//   if (event.target.classList.contains('to-be-completed') {
//     event.target.classList.toggle('completed')
//   })
// }



// {
//   if (event.target.classList.contains('.to-be-completed') {
//     event.target.classList.toggle('completed');
//   });
// }


function changeToCompleted(e) {
  var completedCard = JSON.parse(localStorage.getItem($(e.target).parents('.card-container').data('id')));
  completedCard.complete = !completedCard.complete;
  localStorage.setItem($(e.target).parents('.card-container').attr('data-id'), JSON.stringify(completedCard));
  $(this).closest('.card-container').toggleClass('completed');
}
// }


























