'use strict';

//Функционал попап-окон лоя помощи в выборе

(function () {

  // Обработчик кнопки закрытия текущего попапа
  var onCloseClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      closePopup(popup);
    }
  }

  // Закрытие попапа
  var closePopup = function (popup) {
    popup.querySelector('.pop-up__nav--close').removeEventListener('click', onCloseClick);
    var buttonPrev = popup.querySelector('.pop-up__nav--back');
    if (buttonPrev) {
      buttonPrev.removeEventListener('click', onPrevWelcomeClick);
    }
    popup.classList.add('pop-up__noDisplay');
  }

  // Обработчик кнопки возврата в попап Welcome
  var onPrevWelcomeClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      closePopup(popup);
      openWelcome();
    }
  }

  // Открытие попапа
  var openPopup = function (popup) {
    popup.classList.remove('pop-up__noDisplay');
    var closeButton = popup.querySelector('.pop-up__nav--close');
    closeButton.addEventListener('click', onCloseClick);
  }

  // Welcome
  var openWelcome = function () {
    var popup = document.querySelector('.welcome-popup');
    openPopup(popup);
    var buttonWelcome = popup.querySelectorAll('.pop-up__button');
    for (var i = 0; i < buttonWelcome.length; i++) {
      buttonWelcome[i].addEventListener('click', onButtonWelcomeClick);
    }
  }

  // Обработчики для кнопок на попапе Welcome
  var onButtonWelcomeClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      var buttonWelcome = popup.querySelectorAll('.pop-up__button');
      for (var i=0; i<buttonWelcome.length; i++) {
        buttonWelcome[i].removeEventListener('click', onButtonWelcomeClick);
      }
      var buttonCurrent = this;
      closePopup(popup);

      switch(buttonCurrent) {
        case buttonWelcome[0]:
          openBasement();
          break
        case buttonWelcome[1]:
          openFrame();
          break
        case buttonWelcome[2]:
          openFencing();
          break
        case buttonWelcome[3]:
          openOpening();
          break
      }

    }
  }

  var afterOpen = function (popup) {
    var prevButton = popup.querySelector('.pop-up__nav--back');
    prevButton.addEventListener('click', onPrevWelcomeClick);

    var subcast = popup.querySelectorAll('.pop-up__list-item-text');
    var subcastSVG = popup.querySelectorAll('.pop-up__openwide-svg');
    for (var i=0; i < subcast.length; i++) {
      subcast[i].addEventListener('click', onSubcastClick);
      subcastSVG[i].addEventListener('click', onSubcastClick);
    }
  }

  // Basement
  var openBasement = function () {
    var popup = document.querySelector('.basement-popup');
    openPopup(popup);
    afterOpen(popup);
  }

  // Frame
  var openFrame = function () {
    var popup = document.querySelector('.frame-popup');
    openPopup(popup);
    afterOpen(popup);
  }

  // Fencing
  var openFencing = function () {
    var popup = document.querySelector('.fencing-popup');
    openPopup(popup);
    afterOpen(popup);
  }

  // Opening
  var openOpening = function () {
    var popup = document.querySelector('.opening-popup');
    openPopup(popup);
    afterOpen(popup);
  }

  // Обработчики для кнопок на попапе Basement
  var onSubcastClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.parentElement.offsetParent;
      var subcast = popup.querySelectorAll('.pop-up__subcast');
      var subcastCurrent = this.nextElementSibling;

      switch(subcastCurrent) {
        case subcast[0]:
          subcastShowHide(popup, subcast, 0);
          break
        case subcast[1]:
          subcastShowHide(popup, subcast, 1);
          break
        case subcast[2]:
          subcastShowHide(popup, subcast, 2);
          break
        case subcast[3]:
          subcastShowHide(popup, subcast, 3);
          break
        case subcast[4]:
          subcastShowHide(popup, subcast, 4);
          break
      }

    }
  }

  // Скрытие или показ подкаста в попапе
  var subcastShowHide = function (popup, subcastCollection, subNo) {
    var SVGCollection = popup.querySelectorAll('.pop-up__openwide-svg')
    for (var i = 0; i < subcastCollection.length; i++) {
      if (i !== subNo) {
        subcastCollection[i].classList.add('pop-up__noDisplay');
        SVGCollection[i].classList.remove('pop-up__openwide-rotate');
      }
    }

    var popupText = popup.querySelector('.pop-up__text');
    var itemSVG = subcastCollection[subNo].parentElement.children[0];

    if (subcastCollection[subNo].classList == 'pop-up__subcast pop-up__noDisplay') {
      subcastCollection[subNo].classList.remove('pop-up__noDisplay');
      popupText.classList.add('pop-up__dark-text');
      itemSVG.classList.add('pop-up__openwide-rotate');
    } else {
      subcastCollection[subNo].classList.add('pop-up__noDisplay');
      popupText.classList.remove('pop-up__dark-text')
      itemSVG.classList.remove('pop-up__openwide-rotate');
    }
  }

  // Временное принудительное открытие окна
  openWelcome();

})();
