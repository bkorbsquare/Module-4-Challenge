var scoreBoard = document.getElementById('display-scores');
var scoreObjs = JSON.parse(localStorage.getItem('scoreObj')) || []
console.log(scoreObjs)
var clearButton = document.getElementById('clear')

addEventListener('load', function () {
    scoreObjs = scoreObjs.sort(function (a, b) {
        return b.score - a.score
    })

    for (var i = 0; i < scoreObjs.length; i++) {
        var scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score-div');
        scoreDiv.textContent = scoreObjs[i].name + ": " + scoreObjs[i].score
        scoreBoard.appendChild(scoreDiv)
    }
});

clearButton.addEventListener('click', ()=> {
    localStorage.clear();
    location.reload();
})