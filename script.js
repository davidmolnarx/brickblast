//sonyc
let figure;
let gamearea;
let buttonarea;
let scorearea;
let scoreareaitems;
let figurepos;
//brick item
let brick;
let bricktaken = false;
let activebrick = [];
let activebrickcount = 0;
let timelinediv;
let newLineInterval;
let checkInterval;
let i = -1;
let t = 0;
let activecolumn;
let goal = 0;
let bricks = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];
let helpbricks;
let brickarea;
let gameover;
let winner;
let empty = true;
let easy;
let medium;
let hard;
let score = 0;
let color;
let time = 0;
let scorediv;
let scoremultiplyer;
let end;
let timerInterval;
let minute = 0;
let second = 0;
let timerdiv;
$(document).ready(function (){
    gamearea = $('#gamearea')
    buttonarea = $('#buttonarea')
    scorearea = $('#scorearea')
    scoreareaitems = $('<p id="ranklist">Rank List</p> <div><label for="name" id="namelabel">Name: </label><input type="text" id="name" name="name"></div> <div id="scores"></div> <input class="button" type="button" id="sendbutton" value="Send">')
    let divpos = gamearea.offset();
    scorearea.css({
        left: divpos.left + 295,
        visibility: 'hidden'
    })
    scorearea.append(scoreareaitems)
    easy = $('<button class="button">Easy</button>');
    buttonarea.append(easy);
    easy.on('click', easylevel);
    medium = $('<button class="button">Medium</button>');
    buttonarea.append(medium);
    medium.on('click', mediumlevel);
    hard = $('<button class="button">Hard</button>');
    buttonarea.append(hard);
    hard.on('click', hardlevel);
    scorediv = $('<span id="score">Score: '+score+'</span>')
    buttonarea.append(scorediv);
    $("#sendbutton").on('click', sendingname);
    timerdiv=$('<span id="timer">Time: '+ '00' +':'+ '00' +'</span>');
    buttonarea.append(timerdiv)
})

function start(){
    timerInterval = setInterval(stopper, 1000);
    scorearea.css({
        visibility: 'hidden'
    })
    figure = $('<img src="figure.png" id="figure"/>')
    brickarea = $('<div id="brickarea"></div>')
    brick = $('<div class="brick"></div>')
    timelinediv = $('<div id="timelinediv"></div>')
    figure.on('load', init_figure)
    init_brickarea();
    gamearea.on('mousemove', figuremousemove)
    gamearea.on('click', takeputbrick);
    newLineInterval = setInterval(newline, time);
    checkInterval = setInterval(check, 30);
    gameover = $('<div id="gameover"><p id="gameovertext">GAME OVER</p></div>');
    winner = $('<div id="winer"><p id="winnertext">WINNNER</p></div>');
    timerdiv.remove();
    timerdiv=$('<span id="timer">Time: '+ '00' +':'+ '00' +'</span>');
    buttonarea.append(timerdiv)
}

function easylevel(){
    clear()
    color = 4;
    scoremultiplyer = 1.0;
    setTimeout(start,100);
}
function mediumlevel(){
    clear();
    color = 5;
    scoremultiplyer = 1.2;
    setTimeout(start,100);
}
function hardlevel(){
    clear();
    color = 6;
    scoremultiplyer = 1.4;
    setTimeout(start,100);
}

function drawingBricks(){
    brickarea.remove();
    brickarea = $('<div id="brickarea"></div>')
    init_brickarea();
    for (let k = 0; k <= 14; k++) {
        for (let j = 0; j < 10; j++) {
            if (bricks[k][j] !== 0 && bricks[k][j] !== undefined) {
                bricks[k][j].css({
                    left: j * 80,
                    top: k * 30
                })
                brickarea.append(bricks[k][j]);
            }
        }
    }
}

function check(){
    for(let d = 0; d < 10; d++) {
        if (bricks[14][d] !== 0 && bricks[14][d] !== undefined){
            clearInterval(newLineInterval);
            gameoverfunc();
        }
    }

empty = true;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 15; j++){
            if(bricks[i][j] !== 0 && bricks[i][j] !== undefined){
                empty = false;
            }
        }
    }
    if(empty && !bricktaken && i >= 3){
        winnerfunc();
    }
}

function winnerfunc(){
    winner.css({
        width : 300,
        height : 100,
        position : 'relative',
        margin : '0 auto',
        "background-color" : 'green',
        border : '3px solid',
        top : 250,
    })
    timelinediv.stop();
    gamearea.append(winner);
    score += (9000 * scoremultiplyer) + 2000 * (14 - i);
    scoreupdate();
    // console.log(score);
    clearInterval(newLineInterval);
    clearInterval(checkInterval)
    clearInterval(timerInterval);
    gamearea.off('click')
    gamearea.off('mousemove')
    timelinediv.stop()
    end = true;
    showranklist();
}

function gameoverfunc(){
    gameover.css({
        width : 300,
        height : 100,
        position : 'relative',
        margin : '0 auto',
        "background-color" : 'red',
        border : '3px solid',
        top : 250,
    })
    timelinediv.stop();
    gamearea.append(gameover);
    clearInterval(newLineInterval);
    clearInterval(checkInterval);
    clearInterval(timerInterval);
    gamearea.off('click')
    gamearea.off('mousemove')
    timelinediv.stop()
    end = true;
    showranklist();
}

function sendingname(){
    console.log($("#name").val());
    if($("#name").val()!==""){
        localStorage.setItem($("#name").val(), score);
    }
    deleteScores();
    listScores();
}

function deleteScores() {
    const item = document.getElementById("scores");
    item.innerHTML = "";
}

function listScores(){
    let keysArr = Object.keys(localStorage);
    let valuesMap = new Map();
    $.each(keysArr, function(i, k){
        let v = localStorage.getItem(k);
        valuesMap.set(k, v);
    });
    let sortedValues = new Map([...valuesMap.entries()].sort((x, y) => y[1] - x[1]));
    let topCount = 0;
    sortedValues.forEach(function(val, key) {
        if(topCount<10) {
            $("#scores").append($('<div class="scorerow">' + val + ' - ' + key + '</div>'));
        }
        topCount++;
    });
}




function takeputbrick(){
    $('#effect')[0].play();
    let x;
    if(bricktaken === false) {
        for (x = 14; x >= 0; x--) {
            if (bricks[x][activecolumn] !== 0 && bricks[x][activecolumn] !== undefined) {
                activebrick[activebrickcount] = bricks[x][activecolumn].clone();
                activebrickcount++;
                bricks[x][activecolumn] = 0;
                bricktaken = true;
                if(x > 0) {
                    let activebrickfeletti = bricks[x - 1][activecolumn].clone();
                    if (activebrick[activebrickcount-1].css("background-color") !== activebrickfeletti.css("background-color")) {
                        // console.log("Nem egyformak")
                        break;
                    }
                    // console.log("egyformak");
                }
            }
        }

        for(let x = 0; x < activebrickcount; x++) {
            activebrick[x].css(
                {
                    top: 440 - x*30,
                    left: activecolumn * 80
                }
            )
        }

        drawingBricks()

        for(let x = 0; x < activebrickcount; x++) {
            brickarea.append(activebrick[x]);
        }
        gamearea.append(brickarea);
        // console.log(bricktaken);
    }
///////////////////////////////////////////////////////////////////////////////
    else if(bricktaken === true) {
        let bonusbool = false
        for (x = 0; x <= 14; x++) {
            if (bricks[x][activecolumn] === 0) {
                for(let l = 0; l < activebrickcount; l++) {
                    console.log(activebrick[l].css("background-color"));
                    if(x < 15 && activebrick[l].css("background-color") !=  "rgb(255, 255, 255)" && activebrick[l].css("background-color") !=  "rgb(0, 255, 255)") {
                        bricks[x][activecolumn] = activebrick[l].clone();
                        x++;
                    }
                    else if(activebrick[l].css("background-color") ==  "rgb(255, 255, 255)"){
                        score += 1000 * scoremultiplyer;
                        bonusbool = true;
                        scoreupdate();
                    }
                    else if(activebrick[l].css("background-color") ==  "rgb(0, 255, 255)"){
                        bonusbool = true;
                        score += x * 100 *scoremultiplyer + 100*scoremultiplyer;
                        scoreupdate();
                        for(let y = x; y >= 0; y--){
                            bricks[y][activecolumn] = 0;
                        }
                    }
                }
                activebrick = [];
                activebrickcount = 0;
                break;
            }
        }
// console.log(bricks[x][activecolumn].css("background-color"))

        drawingBricks()
        // console.log(bricks[x][activecolumn].css("background-color"));
        gamearea.append(brickarea);
        bricktaken = false;
        // console.log(bricktaken);
        goal = 1;
        helpbricks = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ];
        if(!bonusbool) {
            check4(x - 1, activecolumn);
            deletee();
        }
    }

}

function check4(x, y){
    let aktualis = bricks[x][y].css("background-color");
    console.log(aktualis);
    helpbricks[x][y] = 1;
    if(x>=0 && x < 14 && y >=0 && y <= 9 && helpbricks[x+1][y] === 0 && bricks[x+1][y] !== 0 && bricks[x+1][y] !== undefined && aktualis === bricks[x+1][y].css("background-color")){
        goal++;
        helpbricks[x+1][y] = 1;
        check4(x+1,y);
    }
    if(x <= 14 && y >=0 && y <= 9 && x > 0  && helpbricks[x-1][y] === 0 && bricks[x-1][y] !== 0 && bricks[x-1][y] !== undefined && aktualis === bricks[x-1][y].css("background-color")){
        goal++;
        helpbricks[x-1][y] = 1;
        check4(x-1,y);
    }
    if(x>=0 && x <= 14 && y >=0 && y < 9 && helpbricks[x][y+1] === 0 &&  bricks[x][y+1] !== 0 && bricks[x][y+1] !== undefined && aktualis === bricks[x][y+1].css("background-color")){
        goal++;
        helpbricks[x][y+1] = 1;
        check4(x,y+1);
    }
    if(x>=0 && x <= 14 && y <= 9 && y > 0 && helpbricks[x][y-1] === 0 &&  bricks[x][y-1] !== 0 && bricks[x][y-1] !== undefined && aktualis === bricks[x][y-1].css("background-color")){
        goal++;
        helpbricks[x][y-1] = 1;
        check4(x,y-1);
    }
    // console.log(goal);
}

function deletee(){
    console.log(goal);
    if (goal > 3){
        score += goal*100 * scoremultiplyer;
        scoreupdate();}
    for(let q = 0; q < 15; q++){
        for(let y = 0; y < 10; y++){
            if(helpbricks[q][y] === 1 && goal > 3){
                bricks[q][y] = 0;
            }
        }
    }
    /////////////csusszon feljebb
    for(let q = 0; q < 10; q++){
        for(let y = 0; y < 15; y++){
            if(bricks[y][q] === 0){
                for(let z = y+1; z < 15; z++){
                    if(bricks[z][q] !== 0 && bricks[z][q] !== undefined){
                        bricks[y][q] = bricks[z][q]
                        bricks[z][q] = 0;
                        // console.log(bricks[y][q].css("background-color"))
                        break;
                    }
                }
            }
        }
    }
    drawingBricks()
    gamearea.append(brickarea);
}

function timeline2 (time){
    console.log(time);
    timelinediv.remove()
    timelinediv = $('<div id="timelinediv"></div>')
    timelinediv.animate({
        width : 800,
    }, time, "linear")
    timelinediv.css({
            height: 20,
            'margin-top' : 15,
            'margin-bottom' : 15,
            left : 0,
            top : 0,
            position : 'absolute',
            'background-color' : 'green'
        })
    gamearea.append(timelinediv)
}


function newline(){
    if(i === 14){
        i++;
        levelend();
        seged()
    }
    else {
        if(i >= 3) {
            setTimeout(seged, time)
            timeline2(time)
        }
        i += 1;
        t = 0;
        // console.log(i);
        let rand = [];
        for (let r = 0; r < 10; r++) {
            let randnum = Math.floor(Math.random() * color);
            let bonus = Math.random();
            let bomb = Math.random();
            if (bonus > 0.99) {
                rand[r] = 'bonus'
            }
            else if (bomb > 0.99) {
                rand[r] = 'bomb'
            }
            else {
                switch (randnum) {
                    case 0:
                        rand[r] = 'yellow';
                        break;
                    case 1:
                        rand[r] = 'orange';
                        break;
                    case 2:
                        rand[r] = 'red';
                        break;
                    case 3:
                        rand[r] = 'blue'
                        break;
                    case 4:
                        rand[r] = 'purple'
                        break;
                    case 5:
                        rand[r] = 'black'
                }
            }
        }

        for (let j = 13; j >= 0; j--) {
            for (let k = 0; k < 10; k++) {
                bricks[j + 1][k] = bricks[j][k];
            }
        }

        for (let r = 0; r < 10; r++) {
            if (rand[r] !== 'bonus' && rand[r] !== 'bomb') {
                brick.css({
                    width: 76,
                    height: 26,
                    position: 'absolute',
                    border: '1px black solid',
                    'background-image' : 'none',
                    'background-color': rand[r]
                })
                bricks[0][r] = brick.clone();
            }
            else if (rand[r] === 'bonus'){
                brick.css({
                    width: 76,
                    height: 26,
                    position: 'absolute',
                    border: '1px black solid',
                    'background-color' : 'white',
                    'background-image': 'radial-gradient(white, green)'
                })
                bricks[0][r] = brick.clone();
            }
            else if (rand[r] === 'bomb'){
                brick.css({
                    width: 76,
                    height: 26,
                    position: 'absolute',
                    border: '1px black solid',
                    'background-color' : 'cyan',
                    'background-image': 'radial-gradient(red, black)'
                })
                bricks[0][r] = brick.clone();
            }
        }
        drawingBricks()
        brickarea.append(activebrick);
    }
    }

    function seged(){
    clearInterval(newLineInterval)
    time -= 500;
    if(i < 15 && !end){
    newLineInterval = setInterval(newline, time)}
    }

function levelend(){
    let emptyrows = 0;
    for(let j = 0; j < 15; j++){
        let emptyrow = true;
        for(let k = 0; k < 10; k++){
            if(bricks[j][k] !== 0 && bricks[j][k] !== undefined){
                emptyrow = false;
            }
        }
        if(emptyrow === true){
            emptyrows++;
        }
    }
    clearInterval(newLineInterval)
    clearInterval(checkInterval)
    clearInterval(timerInterval);
    gamearea.off('click')
    gamearea.off('mousemove')
    timelinediv.stop()
    score += emptyrows * 600 * scoremultiplyer;
    scoreupdate();
    // console.log(score);
    showranklist();
}

function showranklist(){
    if(score > 0) {
        let divpos = gamearea.offset();
        scorearea.css({
            left: divpos.left + 275,
            visibility: 'visible'
        })
    }
}

function scoreupdate(){
    scorediv.remove();
    scorediv = $('<span id="score">Score: '+score+'</span>')
    scorediv.appendTo(buttonarea);
}

function init_figure(){
    figure.css({
        height: 100,
        bottom : 0,
        position : 'absolute'
    });
    gamearea.append(figure);
    newline();
    newline();
    newline();
    newline();
    newline();
}

function init_brickarea(){
    brickarea.css({
        width : 800,
        height: 450,
        left : 0,
        top : 50,
        position : 'absolute',
    });
    gamearea.append(brickarea);
}

function figuremousemove(e) {
    let divpos = gamearea.offset();
    let mousepos = Math.ceil(e.clientX - divpos.left);
    if (mousepos === 800) {
        mousepos -= 80;
    }
    // console.log(mousepos);
    activecolumn = Math.floor(mousepos / 80);
    // console.log(activecolumn);
    figurepos = Math.floor(mousepos / 80) * 80 + 7;
    if(figure !== undefined) {
        figure.css({
            left: figurepos,
        });
    }
    if (bricktaken === true) {
        for (let x = 0; x < activebrickcount; x++) {
            activebrick[x].css({
                left: activecolumn * 80
            })
        }
    }
}

function stopper(){
    second++;
    if(second===60){
        minute++;
        second=0;
    }
    let m, s;
    if (minute < 10) {m="0"}else {m=''}
    if (second < 10) {s="0"}else {s=''}
    timerdiv.remove()
    timerdiv=$('<span id="timer">Time: '+ m + minute +':'+ s +second +'</span>');
    buttonarea.append(timerdiv);
    timerdiv.css({
        width: 100
    })
}

function clear(){
    time = 10000;
    score = 0;
    scorediv.remove()
    scorediv = $('<span id="score">Score: '+score+'</span>');
    buttonarea.append(scorediv);
    gamearea.off('click');
    clearInterval(newLineInterval);
    clearInterval(checkInterval);
    clearInterval(timerInterval);
    if(timelinediv !== undefined){
    timelinediv.remove();}
    if(brickarea !== undefined) {
        brickarea.remove();}
    if(figure !== undefined){
        figure.remove();}
    if(winner !== undefined) {
        winner.remove();}
    if(gameover !== undefined) {
        gameover.remove();}
    figure = undefined;
    figurepos = undefined;
    brick = undefined;
    bricktaken = false;
    activebrick = [];
    activebrickcount = 0;
    timelinediv = undefined;
    newLineInterval = undefined;
    checkInterval = undefined;
    i = -1;
    t = 0;
    activecolumn = undefined;
    goal = 0;
    bricks = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    helpbricks = undefined;
    brickarea = undefined;
    gameover = undefined;
    winner = undefined;
    empty = true;
    end = false;
    minute = 0;
    second = 0;
}

