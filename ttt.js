function checkWin(arr,marker){
    let r=c=d1=d2=n=0;
    for(i=0;i<3;i++){
        for (j=0;j<3;j++){
            arr[i][j] == marker ? r++ : null;
            arr[j][i] == marker ? c++ : null;
            (i==j && arr[i][j] == marker) ? d1++ : null;
            (i+j==2 && arr[i][j] == marker) ? d2++ : null;
            arr[i][j] == null ? n++ : null;
        }
        if (r==3) return 'r';
        if (c==3) return 'c';
        r = c = 0;
    }
    if (d1==3) return 'd1';
    if (d2 ==3) return 'd2';
    if (n=0) return 'draw';
    return false;
}

const gameBoard = {
    board: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ],
    positions: [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ],
    formatGameboard: function (){
        let formattedGameboard = this.board.map(row => row.map(element => '| ' + (element==null ? '_' : element)));
        let formattedpositions = this.positions.map(row => row.map(element => '| ' + element));
        let combined = formattedGameboard.map((row,index) => row.concat(['\t\t']).concat(formattedpositions[index]));
        let string = '';
        combined.map(row => {
            row.map(element => string += element + '\t');
            string += '\n';
        });
        return string;
    }
}

class Player {
    constructor(name, marker, wins = 0) {
        this.name = name;
        this.marker = marker;
        this.wins = wins;
    }
}

const game = {
    player1: new Player('Player 1', 'X'),
    player2: new Player('Player 2', 'O'),
    turn: null,
    startingPlayer: null,
    gameflag: 1,
    roundflag: 1,
    reset: function(){
        gameBoard.board = gameBoard.board.map(row => row.map (element=>null));
        this.startingPlayer === this.player1 ? this.startingPlayer = this.player2 : this.startingPlayer = this.player1;
        this.turn = this.startingPlayer;
    },
    init: function(){
        this.startingPlayer = this.turn = this.player1;
        this.player1.wins = this.player2.wins = 0;
        while(this.gameflag){
             while(this.roundflag){
                this.play();
                this.turn === this.player1 ? this.turn = this.player2 : this.turn = this.player1;
            }
            if (this.gameflag) {
                this.reset();
                this.roundflag = 1;
            }
        }
        console.log('GAME OVER');

    },
    inputmove: function(){
        console.log(gameBoard.formatGameboard());
        let inputFlag = 1;
        while (inputFlag){
            //userInput = prompt(this.turn.name + '\'s turn [' + this.turn.marker + ']');
            if (!((userInput % 1 === 0) && (userInput >= 1 && userInput <=9))) {
                console.log('Enter integer from 1 to 9');
            }
            else {
                let rowIndex = Math.floor((userInput-1)/3);
                let columnIndex = (userInput-1)%3;
                if (gameBoard.board[rowIndex][columnIndex]!=null) {
                    console.log('Position is already filled');
                }
                else {
                    gameBoard.board[rowIndex][columnIndex] = this.turn.marker;
                    inputFlag = 0;
                }
            }
        }

    },
    play: function(){
        this.inputmove();
        let chk = checkWin(gameBoard.board,this.turn.marker);
        if ((chk == 'r')||(chk == 'c')||(chk == 'd1')||(chk == 'd2')) {
            console.log(gameBoard.formatGameboard());
            this.turn.wins++;
            console.log('Winner is: ' + this.turn.name + '\n' + 'Win Stats:\t' + this.player1.name + ':' + this.player1.wins + '\t' + this.player2.name + ":" +  this.player2.wins);
            //prompt('One more game? [y/n]') == 'y' ? this.gameflag=1 : this.gameflag = 0;
            this.roundflag = 0;
        }
        if (chk == 'draw') {
            console.log(gameBoard.formatGameboard());
            console.log('Draw: No one wins' + '\n' + 'Win Stats:\t' + this.player1.name + ':' + this.player1.wins + '\t' + this.player2.name + ":" + this.player2.wins);
            //prompt('One more game? [y/n]') == 'y' ? this.gameflag=1 : this.gameflag = 0;
            this.roundflag = 0;
        }
    }
    
};

function startGame(){
    game.init();
}
