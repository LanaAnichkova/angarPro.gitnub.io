'use strict';

//Функционал попап-окон помощи в выборе

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
    popup.classList.remove('pop-up__Display');
    document.removeEventListener('resize', onResize);
  }

  // Обработчик кнопки возврата в попап Welcome
  var onPrevWelcomeClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      closePopup(popup);
      openWelcome();
    }
  }

  // Расчет размера враппера окна
  var setWrapperHeight = function (popup) {
    var heightPopup = popup.offsetHeight + 50;
    var heightWindow = document.defaultView.innerHeight;

    if (heightPopup > heightWindow) {
      popup.offsetParent.style.height = String(heightPopup) + 'px';
    } else {
      popup.offsetParent.style.height = '100%';
    }
  }

  // Обработчик изменения ориентации экрана
  var onResize = function (evt) {
    var popup = document.querySelector('.pop-up__Display');
    setWrapperHeight(popup);
  }

  // Открытие попапа
  var openPopup = function (popup) {
    popup.classList.remove('pop-up__noDisplay');
    popup.classList.add('pop-up__Display');
    var closeButton = popup.querySelector('.pop-up__nav--close');
    closeButton.addEventListener('click', onCloseClick);
    setWrapperHeight(popup);

    window.addEventListener('resize', onResize);
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

  // После открытием попапа не Welcome
  var afterOpen = function (popup) {
    var prevButton = popup.querySelector('.pop-up__nav--back');
    prevButton.addEventListener('click', onPrevWelcomeClick);

    var buttonsCollection = popup.querySelectorAll('.pop-up__button');
    for (var i = 0; i < buttonsCollection.length; i++) {
      buttonsCollection[i].addEventListener('click', onSubcastClick);
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

  // Обработчики для кнопок на попапах не Welcome
  var onSubcastClick = function (evt) {
    if (evt.which == 1) {
      closePopup(this.offsetParent);
    }
  }

  // Скрытие или показ подкаста в попапе
  var subcastShowHide = function () {

  }

  // Временное принудительное открытие окна
  openWelcome();

})();
