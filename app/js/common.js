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

  // Массив клеток
  const ceilsArr = document.querySelectorAll('#playsquare td');

  // Имена игроков
  const name1 = document.querySelector('.name1 > label> input'),
    name2 = document.querySelector('.name2 > label> input');

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
    reset = document.getElementById('reset'),
    wordsFieldOk = document.getElementById('wordsfield-ok');

  // Поле для подсказок
  const hintItems = document.querySelector('.hint-items');

  // Начальный счет
  let score1 = 0,
    score2 = 0;

  // Выбор и написание начального слова
  const tds = Array.prototype.slice.call(document.querySelectorAll('#playsquare td > label > input')),
    rand = Math.floor(Math.random() * nouns.length), // выбор начального слова
    playsquare = document.querySelector('#playsquare');
  const wordsFieldSpace = document.querySelector('.wordsfield-space');
  name1.addEventListener('blur', function() { // проверяем указание имен игроков
    name2.addEventListener('blur', function() {
      if (name1.value !== '' && name2.value !== '') {
        for (let i = 0; i < tds.length; i++) {
          ceilsArr[i].classList.remove('nonclick');
          if (((i + 3) % 5) === 0) {
            tds[i].value = nouns[rand][((i + 3) / 5) - 1];
          }
        }
        hintItems.innerHTML = 'впишите букву в одну из белых клеточек так, чтобы получилось новое слово';
        cancelBtn.classList.remove('visually-hidden');
        reset.classList.remove('visually-hidden');
      }
    });
    name2.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) { // нажатие Enter
        if (name1.value !== '' && name2.value !== '') {
          for (let i = 0; i < tds.length; i++) {
            ceilsArr[i].classList.remove('nonclick');
            if (((i + 3) % 5) === 0) {
              tds[i].value = nouns[rand][((i + 3) / 5) - 1];
            }
          }
          hintItems.innerHTML = 'впишите букву в одну из белых клеточек так, чтобы получилось новое слово';
          cancelBtn.classList.remove('visually-hidden');
          reset.classList.remove('visually-hidden');
        }
      }
    })
  });

  // Начальный ход
  let step = 0;

  let self;

  console.log(step);

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
    console.log('Ой-ой-ой!');
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
    console.log('Отработала функция highlight');
  }

  // Вывод сообщения о недопустимости ввода нескольких букв
  function oneLetter(e) {
    if (e.value.length > 1) {
      const oneLetterMessage = document.querySelector('.showOneLetterMessage') || null;
      if (!e.parentNode.contains(oneLetterMessage)) {
        hintItems.innerHTML = 'в одной клетке может быть только одна буква';
        console.log('Отработала функция oneLetter');
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
          console.log('Отработала функция oneLetterHide');
        }
      }
    }, 1000);
  }

  // Удаление лишних букв в ячейке
  function truncate(e) {
    setTimeout(function () {
      e.value = e.value.slice(0, 1);
      console.log('Отработала функция truncate');
    }, 1000);
  }

  // Проверка, что вставляется русская буква
  function russianLetter(z) {
    if (!(z.value.match(/[а-яё]/i))) {
      showNonRussianLetter(z);
      deleteNonRussianLetter(z);
    }
    if(z.value.match(/[а-яё]/i)) {
      z.setAttribute('disabled', 'disabled');
      showWord();
      for (let l = 0; l < tds.length; l++) {
        if(tds[l].value.length === 0) {
          ceilsArr[l].classList.add('nonclick');
        } else {
          ceilsArr[l].classList.remove('nonclick');
        }
      }
      console.log('Отработала функция russianLetter');
    }
  }

  // Показ сообщения о нерусских буквах
  function showNonRussianLetter(e) {
    const nonRussianLetterMessageText = document.querySelector('.nonRussianLetterMessage') || null;
    if (!e.parentNode.contains(nonRussianLetterMessageText)) {
      hintItems.innerHTML = 'это не русская буква, введите русскую букву';
      console.log('Отработала функция showNonRussianLetter');
    }
    return e;
  }

  // Удаление нерусских букв из клеток
  function deleteNonRussianLetter(e) {
    setTimeout(function () {
      e.value = e.value.slice(0, 0);
      console.log('Отработала функция deleteNonRussianLetter');
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
      console.log('Отработала функция openCeil');
    }
  }

  // Новая игра
  reset.addEventListener('click', function () {
    window.location.reload();
  });

  //Отмена ввода последней буквы
  function cancelLastStep() {
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
    console.log('Отработала функция cancelLastStep');
  }

  cancelLastStep();

  // Показ введенного слова
  function showWord() {
    const wordsField = document.getElementById('wordsfield');
    wordsField.classList.remove('visually-hidden');
    hintItems.innerHTML = 'введите получившееся слово, кликая на соответствующие буквы, затем кликните на кнопку с' +
      ' галочкой или нажмите Enter';
    cancelBtn.removeAttribute('disabled');
    enterWord();
  }

  // Обработка клика с делегированием
  function enterWord() {
    playsquare.onclick = function (event) {
      let target = event.target;
      while (target !== playsquare) {
        if (target.tagName === 'TD' && target.firstElementChild.firstElementChild.value !== '') {
          pickLetter(target); // TODO Проблема здесь!
          return;
        }
        target = target.parentNode;
      }
    };
    console.log('Отработала функция enterWord');
  }

  // Составление слова посредством кликов
  let word = '';
  function pickLetter(e) {
    for (let m = 0; m < ceilsArr.length; m++) {
      tds[m].classList.remove('can-select');
    }
    let i = e.querySelector('label > input').value;
    word = word + i;
    if (e.classList.contains('letter11')) {
      letter11.firstElementChild.firstElementChild.classList.add('selected');
      if (letter12.firstElementChild.firstElementChild.value.length !== 0) {
        letter12.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter21.firstElementChild.firstElementChild.value.length !== 0) {
        letter21.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter12')) {
      letter12.firstElementChild.firstElementChild.classList.add('selected');
      letter13.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter11.firstElementChild.firstElementChild.value.length !== 0) {
        letter11.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter22.firstElementChild.firstElementChild.value.length !== 0) {
        letter22.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter13')) {
      letter13.firstElementChild.firstElementChild.classList.add('selected');
      if (letter12.firstElementChild.firstElementChild.value.length !== 0) {
        letter12.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter14.firstElementChild.firstElementChild.value.length !== 0) {
        letter14.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter23.firstElementChild.firstElementChild.value.length !== 0) {
        letter23.firstElementChild.firstElementChild.classList.add('can-select');
        letter23.firstElementChild.firstElementChild.classList.remove('nonclick');
      }
    }
    if (e.classList.contains('letter14')) {
      letter14.firstElementChild.firstElementChild.classList.add('selected');
      letter13.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter15.firstElementChild.firstElementChild.value.length !== 0) {
        letter15.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter24.firstElementChild.firstElementChild.value.length !== 0) {
        letter24.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter15')) {
      letter15.firstElementChild.firstElementChild.classList.add('selected');
      if (letter14.firstElementChild.firstElementChild.value.length !== 0) {
        letter14.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter25.firstElementChild.firstElementChild.value.length !== 0) {
        letter25.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter21')) {
      letter21.firstElementChild.firstElementChild.classList.add('selected');
      if (letter11.firstElementChild.firstElementChild.value.length !== 0) {
        letter11.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter22.firstElementChild.firstElementChild.value.length !== 0) {
        letter22.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter31.firstElementChild.firstElementChild.value.length !== 0) {
        letter31.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter22')) {
      letter22.firstElementChild.firstElementChild.classList.add('selected');
      letter23.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter12.firstElementChild.firstElementChild.value.length !== 0) {
        letter12.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter21.firstElementChild.firstElementChild.value.length !== 0) {
        letter21.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter32.firstElementChild.firstElementChild.value.length !== 0) {
        letter32.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter23')) {
      letter23.firstElementChild.firstElementChild.classList.add('selected');
      letter13.firstElementChild.firstElementChild.classList.add('can-select');
      letter33.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter22.firstElementChild.firstElementChild.value.length !== 0) {
        letter22.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter24.firstElementChild.firstElementChild.value.length !== 0) {
        letter24.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter24')) {
      letter24.firstElementChild.firstElementChild.classList.add('selected');
      letter23.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter14.firstElementChild.firstElementChild.value.length !== 0) {
        letter14.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter25.firstElementChild.firstElementChild.value.length !== 0) {
        letter25.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter34.firstElementChild.firstElementChild.value.length !== 0) {
        letter34.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter25')) {
      letter25.firstElementChild.firstElementChild.classList.add('selected');
      if (letter24.firstElementChild.firstElementChild.value.length !== 0) {
        letter24.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter15.firstElementChild.firstElementChild.value.length !== 0) {
        letter15.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter35.firstElementChild.firstElementChild.value.length !== 0) {
        letter35.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter31')) {
      letter31.firstElementChild.firstElementChild.classList.add('selected');
      if (letter21.firstElementChild.firstElementChild.value.length !== 0) {
        letter21.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter32.firstElementChild.firstElementChild.value.length !== 0) {
        letter32.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter41.firstElementChild.firstElementChild.value.length !== 0) {
        letter41.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter32')) {
      letter32.firstElementChild.firstElementChild.classList.add('selected');
      letter33.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter22.firstElementChild.firstElementChild.value.length !== 0) {
        letter22.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter31.firstElementChild.firstElementChild.value.length !== 0) {
        letter31.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter42.firstElementChild.firstElementChild.value.length !== 0) {
        letter42.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter33')) {
      letter33.firstElementChild.firstElementChild.classList.add('selected');
      letter23.firstElementChild.firstElementChild.classList.add('can-select');
      letter43.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter32.firstElementChild.firstElementChild.value.length !== 0) {
        letter32.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter34.firstElementChild.firstElementChild.value.length !== 0) {
        letter34.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter34')) {
      letter34.firstElementChild.firstElementChild.classList.add('selected');
      letter33.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter24.firstElementChild.firstElementChild.value.length !== 0) {
        letter24.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter35.firstElementChild.firstElementChild.value.length !== 0) {
        letter35.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter44.firstElementChild.firstElementChild.value.length !== 0) {
        letter44.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter35')) {
      letter35.firstElementChild.firstElementChild.classList.add('selected');
      if (letter25.firstElementChild.firstElementChild.value.length !== 0) {
        letter25.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter34.firstElementChild.firstElementChild.value.length !== 0) {
        letter34.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter45.firstElementChild.firstElementChild.value.length !== 0) {
        letter45.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter41')) {
      letter41.firstElementChild.firstElementChild.classList.add('selected');
      if (letter31.firstElementChild.firstElementChild.value.length !== 0) {
        letter31.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter42.firstElementChild.firstElementChild.value.length !== 0) {
        letter42.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter51.firstElementChild.firstElementChild.value.length !== 0) {
        letter51.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter42')) {
      letter42.firstElementChild.firstElementChild.classList.add('selected');
      letter43.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter32.firstElementChild.firstElementChild.value.length !== 0) {
        letter32.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter41.firstElementChild.firstElementChild.value.length !== 0) {
        letter41.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter52.firstElementChild.firstElementChild.value.length !== 0) {
        letter52.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter43')) {
      letter43.firstElementChild.firstElementChild.classList.add('selected');
      letter33.firstElementChild.firstElementChild.classList.add('can-select');
      letter53.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter42.firstElementChild.firstElementChild.value.length !== 0) {
        letter42.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter44.firstElementChild.firstElementChild.value.length !== 0) {
        letter44.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter44')) {
      letter44.firstElementChild.firstElementChild.classList.add('selected');
      letter43.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter34.firstElementChild.firstElementChild.value.length !== 0) {
        letter34.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter45.firstElementChild.firstElementChild.value.length !== 0) {
        letter45.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter54.firstElementChild.firstElementChild.value.length !== 0) {
        letter54.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter45')) {
      letter45.firstElementChild.firstElementChild.classList.add('selected');
      if (letter35.firstElementChild.firstElementChild.value.length !== 0) {
        letter35.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter44.firstElementChild.firstElementChild.value.length !== 0) {
        letter44.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter55.firstElementChild.firstElementChild.value.length !== 0) {
        letter55.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter51')) {
      letter51.firstElementChild.firstElementChild.classList.add('selected');
      if (letter41.firstElementChild.firstElementChild.value.length !== 0) {
        letter41.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter52.firstElementChild.firstElementChild.value.length !== 0) {
        letter52.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter52')) {
      letter52.firstElementChild.firstElementChild.classList.add('selected');
      letter53.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter42.firstElementChild.firstElementChild.value.length !== 0) {
        letter42.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter51.firstElementChild.firstElementChild.value.length !== 0) {
        letter51.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter53')) {
      letter53.firstElementChild.firstElementChild.classList.add('selected');
      letter43.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter52.firstElementChild.firstElementChild.value.length !== 0) {
        letter52.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter54.firstElementChild.firstElementChild.value.length !== 0) {
        letter54.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter54')) {
      letter54.firstElementChild.firstElementChild.classList.add('selected');
      letter53.firstElementChild.firstElementChild.classList.add('can-select');
      if (letter44.firstElementChild.firstElementChild.value.length !== 0) {
        letter44.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter55.firstElementChild.firstElementChild.value.length !== 0) {
        letter55.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    if (e.classList.contains('letter55')) {
      letter55.firstElementChild.firstElementChild.classList.add('selected');
      if (letter45.firstElementChild.firstElementChild.value.length !== 0) {
        letter45.firstElementChild.firstElementChild.classList.add('can-select');
      }
      if (letter54.firstElementChild.firstElementChild.value.length !== 0) {
        letter54.firstElementChild.firstElementChild.classList.add('can-select');
      }
    }
    for (let j = 0; j < ceilsArr.length; j++) {
      if (!(tds[j].classList.contains('can-select'))) {
        ceilsArr[j].classList.add('nonclick');
      } else {
        ceilsArr[j].classList.remove('nonclick');
      }
    }
    wordsFieldSpace.innerHTML = word;
    console.log('Отработала функция pickLetter');
    return word;
  }

  // Отправка слова на проверку и очистка поля ввода букв
  wordsFieldOk.addEventListener('click', function (e) {
    e.preventDefault();
    checkWord(word);
    for (let k = 0; k < ceilsArr.length; k++) {
      tds[k].classList.remove('selected');
      tds[k].classList.remove('can-select');
      ceilsArr[k].classList.remove('nonclick');
    }
    word = '';
    console.log('Отработала отправка слова на проверку');
    return word;
  });

  // TODO Задать последовательность действий: выбор имен, первый ход, ввод слова и т.д.
  // TODO Обеспечить корректность ввода букв при отправке слова на проверку
  // TODO Сделать проверку, что слово содержит последнюю введенную букву
  // TODO Сделать проверку, что введенное слово не совпадает с начальным и не вводилось раньше
  // TODO Сделать модуль подведения итогов
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
        hintItems.innerHTML = 'впишите букву в одну из белых клеточек так, чтобы получилось новое слово';
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



        console.log('Делаем кнопки с буквами некликабельными');
        if (letter11.firstElementChild.firstElementChild.value.length !== 0) {
          letter11.classList.add('nonclick');
        }
        if (letter12.firstElementChild.firstElementChild.value.length !== 0) {
          letter12.classList.add('nonclick');
        }
        if (letter13.firstElementChild.firstElementChild.value.length !== 0) {
          letter13.classList.add('nonclick');
        }
        if (letter14.firstElementChild.firstElementChild.value.length !== 0) {
          letter14.classList.add('nonclick');
        }
        if (letter15.firstElementChild.firstElementChild.value.length !== 0) {
          letter15.classList.add('nonclick');
        }
        if (letter21.firstElementChild.firstElementChild.value.length !== 0) {
          letter21.classList.add('nonclick');
        }
        if (letter22.firstElementChild.firstElementChild.value.length !== 0) {
          letter22.classList.add('nonclick');
        }
        if (letter23.firstElementChild.firstElementChild.value.length !== 0) {
          letter23.classList.add('nonclick');
        }
        if (letter24.firstElementChild.firstElementChild.value.length !== 0) {
          letter24.classList.add('nonclick');
        }
        if (letter25.firstElementChild.firstElementChild.value.length !== 0) {
          letter25.classList.add('nonclick');
        }
        if (letter31.firstElementChild.firstElementChild.value.length !== 0) {
          letter31.classList.add('nonclick');
        }
        if (letter32.firstElementChild.firstElementChild.value.length !== 0) {
          letter32.classList.add('nonclick');
        }
        if (letter33.firstElementChild.firstElementChild.value.length !== 0) {
          letter33.classList.add('nonclick');
        }
        if (letter34.firstElementChild.firstElementChild.value.length !== 0) {
          letter34.classList.add('nonclick');
        }
        if (letter35.firstElementChild.firstElementChild.value.length !== 0) {
          letter35.classList.add('nonclick');
        }
        if (letter41.firstElementChild.firstElementChild.value.length !== 0) {
          letter41.classList.add('nonclick');
        }
        if (letter42.firstElementChild.firstElementChild.value.length !== 0) {
          letter42.classList.add('nonclick');
        }
        if (letter43.firstElementChild.firstElementChild.value.length !== 0) {
          letter43.classList.add('nonclick');
        }
        if (letter44.firstElementChild.firstElementChild.value.length !== 0) {
          letter44.classList.add('nonclick');
        }
        if (letter45.firstElementChild.firstElementChild.value.length !== 0) {
          letter45.classList.add('nonclick');
        }
        if (letter51.firstElementChild.firstElementChild.value.length !== 0) {
          letter51.classList.add('nonclick');
        }
        if (letter52.firstElementChild.firstElementChild.value.length !== 0) {
          letter52.classList.add('nonclick');
        }
        if (letter53.firstElementChild.firstElementChild.value.length !== 0) {
          letter53.classList.add('nonclick');
        }
        if (letter54.firstElementChild.firstElementChild.value.length !== 0) {
          letter54.classList.add('nonclick');
        }
        if (letter55.firstElementChild.firstElementChild.value.length !== 0) {
          letter55.classList.add('nonclick');
        }




        let winner;
        if(step === 20) {
          if(score2 > score1) {
            winner = name2.value;
            hintItems.innerHTML = 'Игра окончена. Победитель – ' + winner + '.';
          }
          if(score2 < score1) {
            winner = name1.value;
            hintItems.innerHTML = 'Игра окончена. Победитель – ' + winner + '.';
          }
          if(score2 === score1) {
            hintItems.innerHTML = 'Игра окончена. Результат – ничья.';
          }
          playsquare.classList.add('nonclick');
        }
        console.log(score1);
        console.log(score2);
      }, 1000);
      step++;
      console.log('Отработала функция checkWord');
    } else {
      isWordInDictionary.innerHTML = 'Такого слова в словаре нет';
      isWordInDictionary.style.color = 'red';
      setTimeout(function () {
        isWordInDictionary.innerHTML = '';
        wordsFieldSpace.innerHTML = '';
        self.value = '';
        self.removeAttribute('disabled');
        hintItems.innerHTML = 'такого слова в нашем словаре нет, попробуйте другой вариант';
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
