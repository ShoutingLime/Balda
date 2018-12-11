(function f() {
  // Все клетки
  const letter11 = document.getElementById('letter11'),
    letter12 = document.getElementById('letter12'),
    letter13 = document.getElementById('letter13'),
    letter14 = document.getElementById('letter14'),
    letter15 = document.getElementById('letter15'),
    letter21 = document.getElementById('letter21'),
    letter22 = document.getElementById('letter22'),
    letter23 = document.getElementById('letter23'),
    letter24 = document.getElementById('letter24'),
    letter25 = document.getElementById('letter25'),
    letter31 = document.getElementById('letter31'),
    letter32 = document.getElementById('letter32'),
    letter33 = document.getElementById('letter33'),
    letter34 = document.getElementById('letter34'),
    letter35 = document.getElementById('letter35'),
    letter41 = document.getElementById('letter41'),
    letter42 = document.getElementById('letter42'),
    letter43 = document.getElementById('letter43'),
    letter44 = document.getElementById('letter44'),
    letter45 = document.getElementById('letter45'),
    letter51 = document.getElementById('letter51'),
    letter52 = document.getElementById('letter52'),
    letter53 = document.getElementById('letter53'),
    letter54 = document.getElementById('letter54'),
    letter55 = document.getElementById('letter55');

  // Ячейки результатов (слова и их длины)
  const ceilGamer1Words = document.querySelectorAll('.gamer1.words'),
    ceilGamer2Words = document.querySelectorAll('.gamer2.words'),
    ceilGamer1Counts = document.querySelectorAll('.gamer1.counts'),
    ceilGamer2Counts = document.querySelectorAll('.gamer2.counts');

  // Ряды в таблице результатов
  const steps = document.querySelectorAll('.steps');

  // Ячейки счета (итого)
  const scores = document.querySelector('.scores'),
    gamer1score = document.querySelector('.gamer1.score'),
    gamer2score = document.querySelector('.gamer2.score');

  // Кнопки
  const cancelBtn = document.getElementById('cancel'),
    reset = document.getElementById('reset');

  // Начальный счет
  let score1 = 0,
    score2 = 0;

  // Выбор и написание начального слова
  const tds = Array.prototype.slice.call(document.querySelectorAll('#playsquare td > label > input')),
    rand = Math.floor(Math.random() * nouns.length), // выбор начального слова
    playsquare = document.querySelector('#playsquare');
  const wordsFieldSpace = document.querySelector('.wordsfield-space');

  for (let i = 0; i < tds.length; i++) {
    if (((i + 3) % 5) === 0) {
      tds[i].value = nouns[rand][((i + 3) / 5) - 1];
    }
  }

  // Начальный ход
  let step = 0;

  let self;

  // Обработка кликов с делегированием
  let selectedTd;
  playsquare.onclick = function (event) {
    let target = event.target;
    while (target !== playsquare) {
      if (target.tagName === 'TD') {
        highlight(target);
        return;
      }
      target = target.parentNode;
    }
  };

  // Запрет на введение в ячейку более одного символа
  playsquare.oninput = function (event) {
    let target = event.target;
    oneLetter(target);
    truncate(target);
    oneLetterHide(target);
    russianLetter(target);
    openCeil(target);
    self = target;
    return self;
  };

  // Вывод рамки вокруг активной ячейки
  function highlight(node) {
    if (selectedTd) {
      selectedTd.classList.remove('highlight');
    }
    selectedTd = node;
    selectedTd.classList.add('highlight');
  }

  // Вывод сообщения о недопустимости ввода нескольких букв
  function oneLetter(e) {
    if (e.value.length > 1) {
      const showOneLetterMessage = document.createElement('div');
      const oneLetterMessage = document.querySelector('.showOneLetterMessage') || null;
      if (!e.parentNode.contains(oneLetterMessage)) {
        showOneLetterMessage.innerHTML = 'В одной клетке может быть только одна буква';
        showOneLetterMessage.classList.add('showOneLetterMessage');
        e.parentNode.appendChild(showOneLetterMessage);
      }
      return e;
    }
  }

  // Скрытие сообщения о недопустимости ввода нескольких букв
  function oneLetterHide(e) {
    setTimeout(function () {
      if (e.value.length === 0 || e.value.length === 1) {
        const showOneLetterMessage = document.querySelector('.showOneLetterMessage');
        if (showOneLetterMessage) {
          e.parentNode.removeChild(showOneLetterMessage);
        }
      }
    }, 1000);
  }

  // Удаление лишних букв в ячейке
  function truncate(e) {
    setTimeout(function () {
      e.value = e.value.slice(0, 1);
    }, 1000);
  }

  // Проверка, что вставляется русская буква
  function russianLetter(e) {
    if (!(e.value.match(/[а-яё]/i))) {
      showNonRussianLetter(e);
      deleteNonRussianLetter(e);
      hideNonRussianLetter(e);
    } else {
      e.setAttribute('disabled', 'disabled');
      showWord();
    }
  }

  // Показ сообщения о нерусских буквах
  function showNonRussianLetter(e) {
    const nonRussianLetterMessage = document.createElement('div');
    const nonRussianLetterMessageText = document.querySelector('.nonRussianLetterMessage') || null;
    if (!e.parentNode.contains(nonRussianLetterMessageText)) {
      nonRussianLetterMessage.innerHTML = 'Это не русская буква';
      nonRussianLetterMessage.classList.add('nonRussianLetterMessage');
      e.parentNode.appendChild(nonRussianLetterMessage);
    }
    return e;
  }

  // Удаление нерусских букв из клеток
  function deleteNonRussianLetter(e) {
    setTimeout(function () {
      e.value = e.value.slice(0, 0);
    }, 1000);
  }

  // Скрытие сообщения о недопустимости ввода не русских букв
  function hideNonRussianLetter(e) {
    setTimeout(function () {
      if (e.value.length === 0 || e.value.length === 1) {
        const nonRussianLetterMessage = document.querySelector('.nonRussianLetterMessage');
        if (nonRussianLetterMessage) {
          e.parentNode.removeChild(nonRussianLetterMessage);
        }
      }
    }, 1000);
  }

  // Разрешение ввода в дозволенные клетки
  function openCeil(e) {
    if ((e.value.match(/[а-яё]/i))) {
      if (e.parentNode.parentNode.classList.contains('letter12')) {
        if (letter11.firstElementChild.firstElementChild.value.length === 0) {
          letter11.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter22')) {
        if (letter21.firstElementChild.firstElementChild.value.length === 0) {
          letter21.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter32')) {
        if (letter31.firstElementChild.firstElementChild.value.length === 0) {
          letter31.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter42')) {
        if (letter41.firstElementChild.firstElementChild.value.length === 0) {
          letter41.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter52')) {
        if (letter51.firstElementChild.firstElementChild.value.length === 0) {
          letter51.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter14')) {
        if (letter15.firstElementChild.firstElementChild.value.length === 0) {
          letter15.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter24')) {
        if (letter25.firstElementChild.firstElementChild.value.length === 0) {
          letter25.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter34')) {
        if (letter35.firstElementChild.firstElementChild.value.length === 0) {
          letter35.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter44')) {
        if (letter45.firstElementChild.firstElementChild.value.length === 0) {
          letter45.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter54')) {
        if (letter55.firstElementChild.firstElementChild.value.length === 0) {
          letter55.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter11')) {
        if (letter21.firstElementChild.firstElementChild.value.length === 0) {
          letter21.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter21')) {
        if (letter11.firstElementChild.firstElementChild.value.length === 0) {
          letter11.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter21')) {
        if (letter31.firstElementChild.firstElementChild.value.length === 0) {
          letter31.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter31')) {
        if (letter21.firstElementChild.firstElementChild.value.length === 0) {
          letter21.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter31')) {
        if (letter41.firstElementChild.firstElementChild.value.length === 0) {
          letter41.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter41')) {
        if (letter31.firstElementChild.firstElementChild.value.length === 0) {
          letter31.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter41')) {
        if (letter51.firstElementChild.firstElementChild.value.length === 0) {
          letter51.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter51')) {
        if (letter41.firstElementChild.firstElementChild.value.length === 0) {
          letter41.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter15')) {
        if (letter25.firstElementChild.firstElementChild.value.length === 0) {
          letter25.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter25')) {
        if (letter15.firstElementChild.firstElementChild.value.length === 0) {
          letter15.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter25')) {
        if (letter35.firstElementChild.firstElementChild.value.length === 0) {
          letter35.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter35')) {
        if (letter25.firstElementChild.firstElementChild.value.length === 0) {
          letter25.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter35')) {
        if (letter45.firstElementChild.firstElementChild.value.length === 0) {
          letter45.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter45')) {
        if (letter35.firstElementChild.firstElementChild.value.length === 0) {
          letter35.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter45')) {
        if (letter55.firstElementChild.firstElementChild.value.length === 0) {
          letter55.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
      if (e.parentNode.parentNode.classList.contains('letter55')) {
        if (letter45.firstElementChild.firstElementChild.value.length === 0) {
          letter45.firstElementChild.firstElementChild.removeAttribute('disabled');
        }
      }
    }
  }

  // Новая игра
  reset.addEventListener('click', function () {
    window.location.reload();
  });

  //Отмена ввода последней буквы
  function cancelLastStep(e) {
    cancelBtn.addEventListener('click', function () {
      self.value = '';
      self.removeAttribute('disabled');
      if (self.parentNode.parentNode.classList.contains('letter12')) {
        if (letter11.firstElementChild.firstElementChild.value.length === 0 &&
          letter21.firstElementChild.firstElementChild.value.length === 0) {
          letter11.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter22')) {
        if (letter21.firstElementChild.firstElementChild.value.length === 0 &&
          letter11.firstElementChild.firstElementChild.value.length === 0 &&
          letter31.firstElementChild.firstElementChild.value.length === 0) {
          letter21.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter32')) {
        if (letter31.firstElementChild.firstElementChild.value.length === 0 &&
          letter21.firstElementChild.firstElementChild.value.length === 0 &&
          letter41.firstElementChild.firstElementChild.value.length === 0) {
          letter31.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter42')) {
        if (letter41.firstElementChild.firstElementChild.value.length === 0 &&
          letter31.firstElementChild.firstElementChild.value.length === 0 &&
          letter51.firstElementChild.firstElementChild.value.length === 0) {
          letter41.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter52')) {
        if (letter51.firstElementChild.firstElementChild.value.length === 0 &&
          letter41.firstElementChild.firstElementChild.value.length === 0) {
          letter51.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter14')) {
        if (letter15.firstElementChild.firstElementChild.value.length === 0 &&
          letter25.firstElementChild.firstElementChild.value.length === 0) {
          letter15.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter24')) {
        if (letter25.firstElementChild.firstElementChild.value.length === 0 &&
          letter15.firstElementChild.firstElementChild.value.length === 0 &&
          letter35.firstElementChild.firstElementChild.value.length === 0) {
          letter25.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter34')) {
        if (letter35.firstElementChild.firstElementChild.value.length === 0 &&
          letter25.firstElementChild.firstElementChild.value.length === 0 &&
          letter45.firstElementChild.firstElementChild.value.length === 0) {
          letter35.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter44')) {
        if (letter45.firstElementChild.firstElementChild.value.length === 0 &&
          letter35.firstElementChild.firstElementChild.value.length === 0 &&
          letter55.firstElementChild.firstElementChild.value.length === 0) {
          letter45.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter54')) {
        if (letter55.firstElementChild.firstElementChild.value.length === 0 &&
          letter45.firstElementChild.firstElementChild.value.length === 0) {
          letter55.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter11')) {
        if (letter21.firstElementChild.firstElementChild.value.length === 0 &&
          letter31.firstElementChild.firstElementChild.value.length === 0 &&
          letter22.firstElementChild.firstElementChild.value.length === 0) {
          letter21.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter21')) {
        if (letter11.firstElementChild.firstElementChild.value.length === 0 &&
          letter12.firstElementChild.firstElementChild.value.length === 0) {
          letter11.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
        if (letter31.firstElementChild.firstElementChild.value.length === 0 &&
          letter32.firstElementChild.firstElementChild.value.length === 0 &&
          letter41.firstElementChild.firstElementChild.value.length === 0) {
          letter31.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter31')) {
        if (letter21.firstElementChild.firstElementChild.value.length === 0 &&
          letter11.firstElementChild.firstElementChild.value.length === 0 &&
          letter22.firstElementChild.firstElementChild.value.length === 0) {
          letter21.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
        if (letter41.firstElementChild.firstElementChild.value.length === 0 &&
          letter42.firstElementChild.firstElementChild.value.length === 0 &&
          letter51.firstElementChild.firstElementChild.value.length === 0) {
          letter41.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter41')) {
        if (letter31.firstElementChild.firstElementChild.value.length === 0 &&
          letter21.firstElementChild.firstElementChild.value.length === 0 &&
          letter32.firstElementChild.firstElementChild.value.length === 0) {
          letter31.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
        if (letter51.firstElementChild.firstElementChild.value.length === 0 &&
          letter52.firstElementChild.firstElementChild.value.length === 0) {
          letter51.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter51')) {
        if (letter41.firstElementChild.firstElementChild.value.length === 0 &&
          letter31.firstElementChild.firstElementChild.value.length === 0 &&
          letter42.firstElementChild.firstElementChild.value.length === 0) {
          letter41.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter15')) {
        if (letter25.firstElementChild.firstElementChild.value.length === 0 &&
          letter35.firstElementChild.firstElementChild.value.length === 0 &&
          letter24.firstElementChild.firstElementChild.value.length === 0) {
          letter25.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter25')) {
        if (letter15.firstElementChild.firstElementChild.value.length === 0 &&
          letter14.firstElementChild.firstElementChild.value.length === 0) {
          letter15.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
        if (letter35.firstElementChild.firstElementChild.value.length === 0 &&
          letter34.firstElementChild.firstElementChild.value.length === 0 &&
          letter45.firstElementChild.firstElementChild.value.length === 0) {
          letter35.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter35')) {
        if (letter25.firstElementChild.firstElementChild.value.length === 0 &&
          letter15.firstElementChild.firstElementChild.value.length === 0 &&
          letter24.firstElementChild.firstElementChild.value.length === 0) {
          letter25.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
        if (letter45.firstElementChild.firstElementChild.value.length === 0 &&
          letter44.firstElementChild.firstElementChild.value.length === 0 &&
          letter55.firstElementChild.firstElementChild.value.length === 0) {
          letter45.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter45')) {
        if (letter35.firstElementChild.firstElementChild.value.length === 0 &&
          letter25.firstElementChild.firstElementChild.value.length === 0 &&
          letter34.firstElementChild.firstElementChild.value.length === 0) {
          letter35.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
        if (letter55.firstElementChild.firstElementChild.value.length === 0 &&
          letter54.firstElementChild.firstElementChild.value.length === 0) {
          letter55.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
      if (self.parentNode.parentNode.classList.contains('letter55')) {
        if (letter45.firstElementChild.firstElementChild.value.length === 0 &&
          letter35.firstElementChild.firstElementChild.value.length === 0 &&
          letter44.firstElementChild.firstElementChild.value.length === 0) {
          letter45.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
        }
      }
    });
  }

  cancelLastStep();

  // Показ введенного слова
  function showWord() {
    const wordsField = document.getElementById('wordsfield');
    wordsField.classList.remove('visually-hidden');
    enterWord();
  }

  // Обработка клика с делегированием
  function enterWord() {
    playsquare.onclick = function (event) {
      let target = event.target;
      while (target !== playsquare) {
        if (target.tagName === 'TD') {
          pickLetter(target);
          return;
        }
        target = target.parentNode;
      }
    };
  }

  // Составление слова посредством кликов
  let word = '';
  function pickLetter(e) {
    let i = e.querySelector('label > input').value;
    word = word + i;
    wordsFieldSpace.innerHTML = word;
    return word;
  }

  // Отправка слова на проверку и очистка поля ввода букв
  const wordsFieldOk = document.getElementById('wordsfield-ok');
  wordsFieldOk.addEventListener('click', function (e) {
    e.preventDefault();
    checkWord(word);
    word = '';
    return word;
  });

  // TODO Обеспечить корректность ввода букв при отправке слова на проверку
  // TODO Сделать модуль подведения итогов
  // TODO Изменить курсор на pointer при выборе букв в слово
  // TODO Вычистить или заменить словарь
  // TODO Исключить возможность последовательного ввода нескольких букв
  // TODO Предусмотреть игру с компьютером
  // TODO Предусмотреть игру с партнером по сети

  // Проверка наличия слова в словаре
  function checkWord(e) {
    const isWordInDictionary = document.querySelector('.is-word-in-dictionary')
    if (dictionary.includes(e)) {
      isWordInDictionary.innerHTML = 'Такое слово есть в словаре';
      isWordInDictionary.style.color = 'forestgreen';
      setTimeout(function () {
        isWordInDictionary.innerHTML = '';
        wordsFieldSpace.innerHTML = '';
        let k = Math.floor((step - 1) / 2);
        steps[k].classList.remove('invisible');
        scores.classList.remove('invisible');
        if((step - 1) % 2 === 0) {
          ceilGamer1Words[k].innerHTML = e;
          ceilGamer1Counts[k].innerHTML = e.length;
          score1 = score1 + e.length;
          gamer1score.innerHTML = score1;
        } else {
          ceilGamer2Words[k].innerHTML = e;
          ceilGamer2Counts[k].innerHTML = e.length;
          score2 = score2 + e.length;
          gamer2score.innerHTML = score2;
        }
      }, 1000);
      step++;
    } else {
      isWordInDictionary.innerHTML = 'Такого слова в словаре нет';
      isWordInDictionary.style.color = 'red';
      setTimeout(function () {
        isWordInDictionary.innerHTML = '';
        wordsFieldSpace.innerHTML = '';
        self.value = '';
        self.removeAttribute('disabled');
        if (self.parentNode.parentNode.classList.contains('letter12')) {
          if (letter11.firstElementChild.firstElementChild.value.length === 0 &&
            letter21.firstElementChild.firstElementChild.value.length === 0) {
            letter11.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter22')) {
          if (letter21.firstElementChild.firstElementChild.value.length === 0 &&
            letter11.firstElementChild.firstElementChild.value.length === 0 &&
            letter31.firstElementChild.firstElementChild.value.length === 0) {
            letter21.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter32')) {
          if (letter31.firstElementChild.firstElementChild.value.length === 0 &&
            letter21.firstElementChild.firstElementChild.value.length === 0 &&
            letter41.firstElementChild.firstElementChild.value.length === 0) {
            letter31.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter42')) {
          if (letter41.firstElementChild.firstElementChild.value.length === 0 &&
            letter31.firstElementChild.firstElementChild.value.length === 0 &&
            letter51.firstElementChild.firstElementChild.value.length === 0) {
            letter41.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter52')) {
          if (letter51.firstElementChild.firstElementChild.value.length === 0 &&
            letter41.firstElementChild.firstElementChild.value.length === 0) {
            letter51.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter14')) {
          if (letter15.firstElementChild.firstElementChild.value.length === 0 &&
            letter25.firstElementChild.firstElementChild.value.length === 0) {
            letter15.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter24')) {
          if (letter25.firstElementChild.firstElementChild.value.length === 0 &&
            letter15.firstElementChild.firstElementChild.value.length === 0 &&
            letter35.firstElementChild.firstElementChild.value.length === 0) {
            letter25.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter34')) {
          if (letter35.firstElementChild.firstElementChild.value.length === 0 &&
            letter25.firstElementChild.firstElementChild.value.length === 0 &&
            letter45.firstElementChild.firstElementChild.value.length === 0) {
            letter35.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter44')) {
          if (letter45.firstElementChild.firstElementChild.value.length === 0 &&
            letter35.firstElementChild.firstElementChild.value.length === 0 &&
            letter55.firstElementChild.firstElementChild.value.length === 0) {
            letter45.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter54')) {
          if (letter55.firstElementChild.firstElementChild.value.length === 0 &&
            letter45.firstElementChild.firstElementChild.value.length === 0) {
            letter55.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter11')) {
          if (letter21.firstElementChild.firstElementChild.value.length === 0 &&
            letter31.firstElementChild.firstElementChild.value.length === 0 &&
            letter22.firstElementChild.firstElementChild.value.length === 0) {
            letter21.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter21')) {
          if (letter11.firstElementChild.firstElementChild.value.length === 0 &&
            letter12.firstElementChild.firstElementChild.value.length === 0) {
            letter11.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
          if (letter31.firstElementChild.firstElementChild.value.length === 0 &&
            letter32.firstElementChild.firstElementChild.value.length === 0 &&
            letter41.firstElementChild.firstElementChild.value.length === 0) {
            letter31.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter31')) {
          if (letter21.firstElementChild.firstElementChild.value.length === 0 &&
            letter11.firstElementChild.firstElementChild.value.length === 0 &&
            letter22.firstElementChild.firstElementChild.value.length === 0) {
            letter21.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
          if (letter41.firstElementChild.firstElementChild.value.length === 0 &&
            letter42.firstElementChild.firstElementChild.value.length === 0 &&
            letter51.firstElementChild.firstElementChild.value.length === 0) {
            letter41.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter41')) {
          if (letter31.firstElementChild.firstElementChild.value.length === 0 &&
            letter21.firstElementChild.firstElementChild.value.length === 0 &&
            letter32.firstElementChild.firstElementChild.value.length === 0) {
            letter31.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
          if (letter51.firstElementChild.firstElementChild.value.length === 0 &&
            letter52.firstElementChild.firstElementChild.value.length === 0) {
            letter51.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter51')) {
          if (letter41.firstElementChild.firstElementChild.value.length === 0 &&
            letter31.firstElementChild.firstElementChild.value.length === 0 &&
            letter42.firstElementChild.firstElementChild.value.length === 0) {
            letter41.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter15')) {
          if (letter25.firstElementChild.firstElementChild.value.length === 0 &&
            letter35.firstElementChild.firstElementChild.value.length === 0 &&
            letter24.firstElementChild.firstElementChild.value.length === 0) {
            letter25.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter25')) {
          if (letter15.firstElementChild.firstElementChild.value.length === 0 &&
            letter14.firstElementChild.firstElementChild.value.length === 0) {
            letter15.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
          if (letter35.firstElementChild.firstElementChild.value.length === 0 &&
            letter34.firstElementChild.firstElementChild.value.length === 0 &&
            letter45.firstElementChild.firstElementChild.value.length === 0) {
            letter35.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter35')) {
          if (letter25.firstElementChild.firstElementChild.value.length === 0 &&
            letter15.firstElementChild.firstElementChild.value.length === 0 &&
            letter24.firstElementChild.firstElementChild.value.length === 0) {
            letter25.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
          if (letter45.firstElementChild.firstElementChild.value.length === 0 &&
            letter44.firstElementChild.firstElementChild.value.length === 0 &&
            letter55.firstElementChild.firstElementChild.value.length === 0) {
            letter45.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter45')) {
          if (letter35.firstElementChild.firstElementChild.value.length === 0 &&
            letter25.firstElementChild.firstElementChild.value.length === 0 &&
            letter34.firstElementChild.firstElementChild.value.length === 0) {
            letter35.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
          if (letter55.firstElementChild.firstElementChild.value.length === 0 &&
            letter54.firstElementChild.firstElementChild.value.length === 0) {
            letter55.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
        if (self.parentNode.parentNode.classList.contains('letter55')) {
          if (letter45.firstElementChild.firstElementChild.value.length === 0 &&
            letter35.firstElementChild.firstElementChild.value.length === 0 &&
            letter44.firstElementChild.firstElementChild.value.length === 0) {
            letter45.firstElementChild.firstElementChild.setAttribute('disabled', 'disabled');
          }
        }
      }, 1000);
    }
  }
}());
