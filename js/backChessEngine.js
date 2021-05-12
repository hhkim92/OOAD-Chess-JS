class ChessEngine {
    static _engine;

    static make(html) {
        var e = new ChessEngine(html);
        ChessEngine._engine = e;

        return e;
    }

    constructor(html) {
        var config = null;

        if (typeof html === 'string') {
            this.board_html = html;

            config = {
                pieceTheme: '../img/chesspieces/wikipedia/{piece}.png'
            }
        }
        else {
            console.log("Config: " + html.board);

            this.board_html = html.board;
            this.k_btn = $('#' + html.kingcastling)
            // this.k_btn.on('click', this.doKingsideCastling)

            this.q_btn = $('#' + html.queencastling)
            // this.q_btn.on('click', this.doQueensideCastling)

            config = {
                draggable: true,
                // position: 'start',
                onMouseoverSquare: html.onMouseoverSquare,
                onDragStart: html.onDragStart,
                onDrop: html.onDrop,
                // onMouseoutSquare: this.onMouseoutSquare,
                // onMouseoverSquare: this.onMouseoverSquare,
                // onDragStart: this.onDragStart,
                // onDrop: this.onDrop,
                pieceTheme: '../img/chesspieces/wikipedia/{piece}.png'
            }
        }

        console.log("HTML: " + html + " / " + (typeof html));
        console.log("HTML: " + this.board_html);

        this.board = new Chessboard(this.board_html, config);
        this.game = new Chess();
        this.game.clear();
        this.board.position(this.game.fen());

        // this.game.clear();
        this.whiteSquareGrey = '#a9a9a9';
        this.blackSquareGrey = '#696969';
    }

    enableCastling() {
        this.game.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        this.board.position(this.game.fen());
    }

    onMouseoutSquare(square, piece) {
        // console.log('onMouseoutSquare: ' + square + " / " + piece);
    }

    clearBoard() {
        this.removeGreySquares();
        this.hideKingsideCastlingButton();
        this.hideQueensideCastlingButton();
    }

    hideKingsideCastlingButton() {
        if (this.hasOwnProperty('k_btn')) this.k_btn.hide();
    }

    hideQueensideCastlingButton() {
        if (this.hasOwnProperty('q_btn')) this.q_btn.hide();
    }

    showKingsideCastlingButton() {
        if (this.hasOwnProperty('k_btn')) this.k_btn.show();
    }

    showQueensideCastlingButton() {
        if (this.hasOwnProperty('q_btn')) this.q_btn.show();
    }

    hookKingsideCastlingButton(func) {
        if (this.hasOwnProperty('k_btn')) {
            this.k_btn.unbind();
            this.k_btn.on('click', func);
        }
    }

    hookQueensideCastlingButton(func) {
        if (this.hasOwnProperty('q_btn')) {
            this.q_btn.unbind();
            this.q_btn.on('click', func);
        }
    }

    doKingsideCastling() {
        ChessEngine._engine.move('O-O')
    }

    doQueensideCastling() {
        ChessEngine._engine.move('O-O-O')
    }

    ascii() {
        return this.game.ascii();
    }

    fen() {
        return this.game.fen();
    }

    game_over() {
        return this.game.game_over();
    }

    turn() {
        return this.game.turn();
    }

    move(m) {
        var m_obj = this.game.move(m);
        this.board.position(this.game.fen());

        return m_obj;
    }

    put(piece, square) {
        this.game.put(piece, square)
        this.board.position(this.game.fen());
    }

    moves(square) {
        // console.log(square)

        return this.game.moves({
            square: square,
            verbose: true
        });
    }

    position(fen) {
        this.game.load(fen);
        this.board.position(fen);
    }

    removeGreySquares() {
        // $('#myBoard .square-55d63').css('background', '')
        $('#' + this.board_html + ' .square-55d63').css('background', '')
    }

    greySquare(square) {
        // var $square = $('#myBoard .square-' + square)
        var $square = $('#' + this.board_html + ' .square-' + square)

        var background = this.whiteSquareGrey
        if ($square.hasClass('black-3c85d')) {
            background = this.blackSquareGrey
        }

        $square.css('background', background)
    }
}