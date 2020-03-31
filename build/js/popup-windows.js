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

  // Перед открытием попапа не Welcome
  var beforeOpen = function (popup) {
    var subcastCollection = popup.querySelectorAll('.pop-up__subcast');
    var SVGCollection = popup.querySelectorAll('.pop-up__openwide-svg');
    for (var i=0; i < subcastCollection.length; i++) {
      subcastCollection[i].classList.add('pop-up__noDisplay');
      SVGCollection[i].classList.remove('pop-up__openwide-rotate');
    }
  }

  // После открытием попапа не Welcome
  var afterOpen = function (popup) {
    var prevButton = popup.querySelector('.pop-up__nav--back');
    prevButton.addEventListener('click', onPrevWelcomeClick);

    var subcast = popup.querySelectorAll('.pop-up__list-item-wrapper');
    for (var i=0; i < subcast.length; i++) {
      subcast[i].addEventListener('click', onSubcastClick);
    }
  }

  // Basement
  var openBasement = function () {
    var popup = document.querySelector('.basement-popup');
    beforeOpen(popup);
    openPopup(popup);
    afterOpen(popup);
  }

  // Frame
  var openFrame = function () {
    var popup = document.querySelector('.frame-popup');
    beforeOpen(popup);
    openPopup(popup);
    afterOpen(popup);
  }

  // Fencing
  var openFencing = function () {
    var popup = document.querySelector('.fencing-popup');
    beforeOpen(popup);
    openPopup(popup);
    afterOpen(popup);
  }

  // Opening
  var openOpening = function () {
    var popup = document.querySelector('.opening-popup');
    beforeOpen(popup);
    openPopup(popup);
    afterOpen(popup);
  }

  // Обработчики для кнопок на попапах не Welcome
  var onSubcastClick = function (evt) {
    if (evt.which == 1) {
      var popupText = this.parentElement.offsetParent.querySelector('.pop-up__text');
      var subcastCurrent = this.parentElement.querySelector('.pop-up__subcast');
      var svgCurrent = this.querySelector('.pop-up__openwide-svg');
      subcastShowHide(popupText, subcastCurrent, svgCurrent);
    }
  }

  // Скрытие или показ подкаста в попапе
  var subcastShowHide = function (popupText, subcastCurrent, svgCurrent) {

    if (subcastCurrent.classList == 'pop-up__subcast pop-up__noDisplay') {
      subcastCurrent.classList.remove('pop-up__noDisplay');
      popupText.classList.add('pop-up__dark-text');
      svgCurrent.classList.add('pop-up__openwide-rotate');
    } else {
      subcastCurrent.classList.add('pop-up__noDisplay');
      popupText.classList.remove('pop-up__dark-text')
      svgCurrent.classList.remove('pop-up__openwide-rotate');
    }
  }

  // Временное принудительное открытие окна
  openBasement();

})();
