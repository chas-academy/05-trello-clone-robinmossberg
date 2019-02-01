import $ from 'jquery';
import 'jquery-ui/themes/base/all.css';
import './widget';

require('webpack-jquery-ui');
import '../css/styles.css';
// import dialog from 'jquery-ui/ui/widgets/dialog';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function () {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    DOM.$thingsToBeDestroyed = $('list button')
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {
    $('#tabs').tabs();
  }

  function openDialog() {
    DOM.$listDialog.dialog('open');
   
  };

  function createDialogs() {
    DOM.$listDialog.dialog({
      autoOpen: false,
      modal: true,
      show: {effect: 'bounce', duration: 600, times: 2},
      buttons: [
        {
          text: "Ok",
          click: function () {
            let $inputValue = $(this).find('input[name="title"]').val();
            let $dateValue = $('#datepicker').val();
            $(this).dialog('close');
            createList($inputValue, $dateValue);
          }
        }
      ]
    });
  }
  function dragCards() {
    $('.list-cards').sortable({ connectWith: '.list-cards' });
    $('.column').sortable({ connectWith: '.column' });
  };

  function pickDate(){
    $('#datepicker').datepicker();
  }

  function nuke(){
    $('.column').boomBaby('BOOOOOOM!!!')
  }

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$board.on('click', '.list-header > button.delete', deleteList);
    DOM.$board.on('click', 'button#new-list', openDialog);
    DOM.$board.on('click', '.boom', nuke);

    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card > button.delete', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList(inputVal, dateVal) {
    event.preventDefault();
    $('.column:last')
      .before(`<div class="column">
      <div class="list">
            <div class="list-header">
                ${inputVal} 
                <button class="button delete">X</button><br>
                ${dateVal}
            </div>
            <ul class="list-cards">
                <li class="add-new">
                    <form class="new-card" action="index.html">
                        <input type="text" name="title" placeholder="Please name the card" />
                        <button class="button add">Add new card</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>`);


  };

  function deleteList() {
    $(this).closest('.column').remove();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    let cardValue = $(this).find('input[name=title]')
    let getCardValue = cardValue.val();
    $(this)
      .closest('.add-new')
      .before('<li class="card ui-sortable">' + getCardValue + '<button class="button delete">X</button></li>');
    cardValue.val("");
    dragCards();
  }

  function deleteCard() {
    $(this).parent().fadeOut(500, function () {
      $(this).closest('.card').remove();
    });
  }


  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    dragCards();
    bindEvents();
    pickDate();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function () {
  jtrello.init();
  
});
