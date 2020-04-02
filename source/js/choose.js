'use strict';

//Функционал попап-окон помощи в выборе

(function () {

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

  // Обработчик кнопки закрытия текущего попапа
  var onCloseClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      closePopup(popup);
    }
  }

  // Закрытие попапа
  var closePopup = function (popup) {
    popup.querySelector('.choose__nav--close').removeEventListener('click', onCloseClick);
    var buttonPrev = popup.querySelector('.choose__nav--back');
    if (buttonPrev != null) {
      buttonPrev.removeEventListener('click', onPrevWelcomeClick);
    }
    var buttonsCollection = popup.querySelectorAll('.choose__button');
    for (var i = 0; i < buttonsCollection.length; i++) {
      buttonsCollection[i].removeEventListener('click', onInfoClick);
    }

    popup.classList.add('choose__noDisplay');
    popup.classList.remove('choose__Display');
    document.removeEventListener('resize', onResize);
  }

  // Обработчик кнопки prev
  var onPrevWelcomeClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      closePopup(popup);
      openWelcome();
    }
  }

  // Обработчик изменения ориентации экрана
  var onResize = function (evt) {
    var popup = document.querySelector('.choose__Display');
    setWrapperHeight(popup);
  }

  // Открытие попапа
  var openPopup = function (popup) {
    popup.classList.remove('choose__noDisplay');
    popup.classList.add('choose__Display');
    var closeButton = popup.querySelector('.choose__nav--close');
    closeButton.addEventListener('click', onCloseClick);
    setWrapperHeight(popup);

    document.querySelector('.choose').classList.add('choose__blackout')
    window.addEventListener('resize', onResize);

    // Если есть кнопка prev
    var prevButton = popup.querySelector('.choose__nav--back');
    if (prevButton != null) {
      // слушатель кнопки prev
      prevButton.addEventListener('click', onPrevWelcomeClick);

      // слушатели кнопок выбора
      var buttonsCollection = popup.querySelectorAll('.choose__button');
      for (var i = 0; i < buttonsCollection.length; i++) {
        buttonsCollection[i].addEventListener('click', onInfoClick);
      }
    }
  }

  // Welcome
  var openWelcome = function () {
    var popup = document.querySelector('.choose__window--0');
    openPopup(popup);
    var buttonWelcome = popup.querySelectorAll('.choose__button');
    for (var i = 0; i < buttonWelcome.length; i++) {
      buttonWelcome[i].addEventListener('click', onButtonWelcomeClick);
    }
  }

  // Обработчики для кнопок на попапе Welcome
  var onButtonWelcomeClick = function (evt) {
    if (evt.which == 1) {
      var popupOld = this.offsetParent;
      var buttonsWelcome = popupOld.querySelectorAll('.choose__button');
      for (var i=0; i<buttonsWelcome.length; i++) {
        buttonsWelcome[i].removeEventListener('click', onButtonWelcomeClick);
      }
      closePopup(popupOld);

      var buttonCurrent = this;
      var buttonsArray = Array.prototype.slice.call(buttonsWelcome);
      var buttonCurrentNumber = buttonsArray.indexOf(buttonCurrent);

      var className = '.choose__window--' + String(buttonCurrentNumber+1);
      var popupNew = document.querySelector(className);
      openPopup(popupNew)
    }
  }

  // Открытие окон info
  var openInfo = function (infoWindow) {
    document.querySelector('.choose').classList.remove('choose__blackout');
    var infoWrapper = infoWindow.parentElement;
    infoWrapper.classList.remove('choose__noDisplay');
    infoWrapper.classList.add('choose__blackout');
    infoWindow.classList.remove('choose__noDisplay');
    infoWindow.querySelector('.choose__nav--close').addEventListener('click', onClickCloseInfo);
  }

  // Закрытие окон info
  var closeInfo = function (infoWindow) {
    document.querySelector('.choose').classList.add('choose__blackout');
    var infoWrapper = infoWindow.parentElement;
    infoWrapper.classList.add('choose__noDisplay');
    infoWrapper.classList.remove('choose__blackout');
    infoWindow.classList.add('choose__noDisplay');
    infoWindow.querySelector('.choose__nav--close').removeEventListener('click', onClickCloseInfo);
  }

  // Обработчик кнопки закрытия info
  var onClickCloseInfo = function (evt) {
    var info = this.offsetParent;
    closeInfo(info);
  }

  // Обработчики для кнопок на попапах не Welcome
  var onInfoClick = function (evt) {
    if (evt.which == 1) {
      var popup = this.offsetParent;
      var buttons = popup.querySelectorAll('.choose__button');
      var buttonCurrent = this;
      var buttonsArray = Array.prototype.slice.call(buttons);
      var buttonCurrentNumber = buttonsArray.indexOf(buttonCurrent);

      var className = '.choose__info-window--' + String(buttonCurrentNumber+1);
      var infoWindow = document.querySelector(className);
      openInfo(infoWindow)
    }
  }

  // Временное принудительное открытие окна
  openWelcome();

})();
