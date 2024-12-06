const game = {
    gameBoard: [["#","#",'#'],
                ["#","#",'#'],
                ["#","#",'#']],
    turnCount: 0,
    init: function() {
        this.cacheDom();
        this.createBoard();
        this.bindEvents();
        this.render();
    },
    cacheDom: function() {
        this.gameContainer = document.querySelector(".game-container");  
        this.cells = this.gameContainer.querySelectorAll(".game-container div");
    },
    render: function() {
        console.log(this.gameBoard);
    },
    createCell: function(i, j) {
        const cell = document.createElement("div"); 
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        this.gameContainer.appendChild(cell);
        this.cacheDom();
    },
    createBoard: function() {
        for (let i = 0; i < this.gameBoard.length; i++) {
            for(let j = 0; j < this.gameBoard[i].length; j++) {
                this.createCell(i, j);
            }
        }
    },
    bindEvents: function() {
        console.log("bindEvents()")
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => {
                let x = cell.dataset.row;
                let y = cell.dataset.col;
                let mark = this.determineTurn();
                this.placeMarker(mark, x, y);
            });
        });
    },
    determineTurn: function() {
        if (this.turnCount % 2 === 0) {
            return "X";
        } else {
            return "O";
        }
    },
    placeMarker: function(mark, x, y) {
        let cell = this.gameContainer.querySelector(`.cell[data-row="${x}"][data-col="${y}"]`);
        this.gameBoard[x][y] = mark;
        cell.textContent = mark;
        this.turnCount += 1;
        this.render();
        this.checkOutcome();
    },
    checkOutcome: function() {
        // Columns
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (this.gameBoard[0][i] === this.gameBoard[1][i] &&
                this.gameBoard[1][i] === this.gameBoard[2][i] &&
                this.gameBoard[0][i] !== "#"
            ) {
                let winner = this.gameBoard[0][i];
                console.log(`Winner is: ${winner}`);
                this.resetGame();
                return;
            }
        };
        // Row
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (this.gameBoard[i][0] === this.gameBoard[i][1] && 
                this.gameBoard[i][1] === this.gameBoard[i][2] &&
                this.gameBoard[i][0] !== "#"
            ) {
                let winner = this.gameBoard[i][0];
                console.log(`Winner is: ${winner}`);
                this.resetGame();
                return;
            }
        };
        //diagonal
        if(
            this.gameBoard[0][0] === this.gameBoard[1][1] &&
            this.gameBoard[1][1] === this.gameBoard[2][2] &&
            this.gameBoard[0][0] !== "#"
        ) {
            let winner = this.gameBoard[1][1];
            console.log(`Winner is: ${winner}`);
            this.resetGame();
            return;
        }
        if(
            this.gameBoard[0][2] === this.gameBoard[1][1] &&
            this.gameBoard[1][1] === this.gameBoard[2][0] &&
            this.gameBoard[0][2] !== "#"
        ) {
            let winner = this.gameBoard[1][1];
            console.log(`Winner is: ${winner}`);
            this.resetGame();
            return;
        }
    },
    resetGame: function() {
        this.gameBoard = [["#","#",'#'],
                          ["#","#",'#'],
                          ["#","#",'#']]; 
        this.cells.forEach(cell => {
            cell.textContent = "";
        })
    },
};

game.init();
