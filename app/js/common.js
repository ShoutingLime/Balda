(function () {
  const tds = Array.prototype.slice.call(document.querySelectorAll('#playsquare td > input'));
  const nouns = ["балда", "дурак", "пурга", "сосед", "кабан", "диван", "топор", "пирог", "комод", "ясень"];
  const rand = Math.floor(Math.random() * nouns.length);
  console.log(nouns[rand]);
  console.log(tds);
  for(let i = 0; i < tds.length; i++) {
    if(((i + 3) % 5) === 0) {
      tds[i].value = nouns[rand][((i + 3) / 5) - 1];
    }
  }
}());
