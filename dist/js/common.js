(function () {
  const tds = Array.prototype.slice.call(document.querySelectorAll('#playsquare td > input'));
  const nouns = ["балда", "дурак", "пурга", "сосед", "кабан", "диван", "топор", "пирог", "комод", "ясень"];
  const rand = Math.floor(Math.random() * nouns.length);
  const playsquare = document.querySelector('#playsquare');
  console.log(nouns[rand]);
  console.log(tds);
  for(let i = 0; i < tds.length; i++) {
    if(((i + 3) % 5) === 0) {
      tds[i].value = nouns[rand][((i + 3) / 5) - 1];
    }
  }

  // Обработка кликов с делегированием
  let selectedTd;
  playsquare.onclick = function(event) {
    let target = event.target;

    // цикл двигается вверх от target к родителям до table
    while (target !== playsquare) {
      if (target.tagName === 'TD') {
        // нашли элемент, который нас интересует!
        highlight(target);
        return;
      }
      target = target.parentNode;
    }
  };

  function highlight(node) {
    if (selectedTd) {
      selectedTd.classList.remove('highlight');
    }
    selectedTd = node;
    selectedTd.classList.add('highlight');
  }
}());


