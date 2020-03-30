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

  // Обработчик кнопки возврата в главный попап
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
    for (var i=0; i<buttonWelcome.length; i++) {
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

  // Basement
  var openBasement = function () {
    var popup = document.querySelector('.basement-popup');
    openPopup(popup);
    var prevButton = popup.querySelector('.pop-up__nav--back');
    prevButton.addEventListener('click', onPrevWelcomeClick, { once: true });
  }

  // Временное принудительное открытие окна
  openWelcome();

})();
