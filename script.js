Array.prototype.allSameValues = function () {
    if (this[0] === "") { return false; }
    for (let i = 1; i < this.length; i++) {
        if (this[i] !== this[0]) { return false; }
    }
    return true;
}

const gameboard=(()=>{
    let _boards= ["","","","","","","","",""];
    let indexvalid=[];


    function saveMarkInboards(mark, index) {
        _boards[index] = mark;
    }
    
    function checkIfWin(){
        let win = false;
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const markersArray = this.getMarks;

        winningCombos.forEach(arr => {
            const a = markersArray[arr[0]];
            const b = markersArray[arr[1]];
            const c = markersArray[arr[2]];
            if ([a, b, c].allSameValues()){
                win = true;
                indexvalid.splice(0,indexvalid.length);
                indexvalid.push(arr[0],arr[1],arr[2]);
                resetArray();
                return;
            }
        });
        return win;
    }

    function checkIfFull() {
        return this.getMarks.every((field) => field);
    }

    function resetArray() {
        _boards = ['', '', '', '', '', '', '', '', ''];
    }
    
    return{
        get getMarks (){
            return _boards;
        },
        saveMarkInboards, checkIfWin, checkIfFull, resetArray,indexvalid}
})();

const createplayer=(name,mark)=>{
    return {name,mark}
}


const displaycontroller=(()=>{
    
    const divplayer1 =document.querySelector('.displayplayer1');
    const divplayer2 =document.querySelector('.displayplayer2');
    const backboard =document.querySelector('.content-game');
    const result =document.querySelector('.Result');
    const infohedear = document.querySelector('.informationgame');
    const replay = document.querySelector('#replay');
    const backtomenu=document.querySelector('#menu');
    const x=document.querySelector('.X');
    const o=document.querySelector('.O');
    const vs=document.querySelector('.VS');
    const board = document.querySelectorAll('.item');
    const infogame=document.querySelector('.info-game');
    const playnow=document.querySelector('.playnow');
    const infoplayer=document.querySelector('.infoplayer');
    const formgame = document.getElementById('formulaire-game');



    const showReplayandMenu=()=>{
        replay.style.display='block';
        backtomenu.style.display='block';
        clickreplay();
        clickMenu();
    }
    const hideReplayandMenu=()=>{
        replay.style.display='none';
        backtomenu.style.display='none';
    }


    const shownewBoard=()=>{
        board.forEach(item => {
            item.style.display='block';
            item.classList.remove('itemresult');
            item.textContent='';
            });
    }
    const clearandhideboard=()=>{
        backboard.style.backgroundColor='#ffffff';
        board.forEach(item => {
            item.style.display='none';
            item.classList.remove('itemresult');
            item.textContent='';
            });
    }


    const Showformdetailplayer=()=>{
        infogame.classList.remove('xo-background');
        infogame.classList.add('info-game');
        playnow.style.display="flex";
        infoplayer.style.display="block";
    }
    const hideformdetailplayer=()=>{
        playnow.style.display="none";
        infoplayer.style.display="none";
        infogame.classList.remove('info-game');
        infogame.classList.add('xo-background');
    }

    const Showtableplayer=(player1,player2)=>{
        backboard.style.backgroundColor='#172554';
        result.textContent='';
        result.style.cssText='background-color:#083344;color:#ffffff;';
        result.appendChild(x);
        result.appendChild(vs);
        result.appendChild(o);    
        infohedear.insertBefore(divplayer1,result);
        infohedear.appendChild(divplayer2);
        infohedear.classList.remove('informationgame');
        infohedear.classList.remove('displayresult');
        infohedear.classList.add('blockinformation');
        divplayer1.textContent=player1;
        divplayer2.textContent=player2;
    }
    
    const ShowResult=(winner)=>{
        divplayer1.remove();
        divplayer2.remove();
        x.remove();
        o.remove();
        vs.remove();
        result.textContent=`${winner} has Won!`;
        result.style.cssText='background-color:#030712; color:#dc2626; border-radius:15px; border: 2px solid;';
        infohedear.classList.remove('blockinformation');
        infohedear.classList.add('displayresult');
    }

    const hidetableplayer=()=>{
        infohedear.classList.remove('displayresult');
        infohedear.classList.add('informationgame');
    }

    const clickMenu=()=>{
        backtomenu.addEventListener('click',()=>{
            clearandhideboard();
            hideReplayandMenu();
            hidetableplayer();
            Showformdetailplayer();
            game.playergame=undefined;
            formgame.reset();
            game.begin();
        });
    }


    const clickreplay=()=>{
        replay.addEventListener('click',()=>{
            hideReplayandMenu();
            shownewBoard();
            game.playgame();
        });
    }

    const selectitemvalid=(id1,id2,id3)=>{
        const item1=document.getElementById(id1);
        const item2=document.getElementById(id2);
        const item3=document.getElementById(id3);
        item1.classList.add('itemresult');
        item2.classList.add('itemresult');
        item3.classList.add('itemresult');
    }

    const resultend=(winner)=>{
        ShowResult(winner);
        showReplayandMenu();
    }
    

    function exportplayer(input1,input2){
        let player1=createplayer(input1,"X");
        let player2=createplayer(input2,"O");
        let playergame=[player1,player2];
        return playergame;
    }
    
 

     const turnplayer1=()=>{
        divplayer1.style='border-color:#1d4ed8';
        divplayer2.style='border-color:black';
     }

     const turnplayer2=()=>{
        divplayer1.style='border-color:black';
        divplayer2.style='border-color:#1d4ed8';
     }

    const startgame=(player1,player2)=>{
        shownewBoard();
        Showtableplayer(player1,player2);
        hideformdetailplayer();
    }
    return{startgame,exportplayer,turnplayer1,turnplayer2,resultend,selectitemvalid,clickreplay,showReplayandMenu,hideReplayandMenu,clickMenu,shownewBoard,clearandhideboard,Showformdetailplayer,hideformdetailplayer,Showtableplayer,ShowResult,hidetableplayer}
})();
    
const game=((board)=>{

    var playergame=undefined;
    var turn =undefined;
    var winner=false;
    const item = document.querySelectorAll('.item');


    const logicgame=()=>{
        board.resetArray();
        displaycontroller.startgame(playergame[0].name,playergame[1].name);
        displaycontroller.turnplayer1();
        turn =playergame[0].mark;
        winner=false;
         
        
        item.forEach(item => {
            item.addEventListener('click',()=>{
                
                if(turn===playergame[0].mark && item.innerHTML=="" && winner===false)
                {
                    item.textContent=playergame[0].mark;
                    board.saveMarkInboards(playergame[0].mark,item.id);
                    if(board.checkIfWin()){
                        winner=true;
                        displaycontroller.resultend(playergame[0].name);
                        let index=board.indexvalid;
                        displaycontroller.selectitemvalid(index[0],index[1],index[2]);
                        return;
                    }
                    turn=playergame[1].mark;
                    displaycontroller.turnplayer2();
                }
                else if(turn===playergame[1].mark && item.innerHTML=="" && winner===false)
                {
                    item.textContent=playergame[1].mark;
                    board.saveMarkInboards(playergame[1].mark,item.id);
                    if(board.checkIfWin()){
                        winner=true;
                        displaycontroller.resultend(playergame[1].name);
                        let index=board.indexvalid;
                        displaycontroller.selectitemvalid(index[0],index[1],index[2]);
                        return;
                    }
                    turn=playergame[0].mark;
                    displaycontroller.turnplayer1();
                }
                if(board.checkIfFull())
                    {
                        board.resetArray();
                        displaycontroller.showReplayandMenu();
                        return;
                    }
            });
        });
    }
    const playgame=()=>{
            logicgame();
        }
    const begin=()=>{
            const formgame = document.getElementById('formulaire-game');
            formgame.addEventListener('submit',function (e){
                e.preventDefault();
                const input1=document.getElementById('player1').value;
                const input2=document.getElementById('player2').value;
                playergame=displaycontroller.exportplayer(input1,input2);
                playgame();
            });
        }
    return {playergame,logicgame,playgame,begin};
})(gameboard);

game.begin();








