class ChessEngine {
    constructor(config) {
        this.board_html = config.board;

        this.k_btn = $('#' + config.kingcastling);
        this.k_btn.on('click', config.doKingsideCastling);

        this.q_btn = $('#' + config.queencastling);
        this.q_btn.on('click', config.doQueensideCastling);

        this.e_btn = $('#' + config.enpassant);
        this.e_btn.on('click', config.doEnPassant);

        this.promotion_options = $('#' + config.promotionoptions);
        this.option = config.option;

        config = {
            draggable: config.draggable,
            onMouseoverSquare: config.onMouseoverSquare,
            onDragStart: config.onDragStart,
            onDrop: config.onDrop,
            pieceTheme: '../img/chesspieces/wikipedia/{piece}.png'
        }

        this.board = new Chessboard(this.board_html, config);
        this.game = new Chess();
        this.sync();

        this.whiteSquareGrey = '#a9a9a9';
        this.blackSquareGrey = '#696969';
    }

    loadFenString(fen) {
        this.game.load(fen);
        this.sync();
    }

    clear() {
        //
        this.game.clear();
        this.board.clear();
    }

    sync() {
        // this.board.clear();
        this.board.position(this.game.fen());
    }

    getPiece(square) {
        return this.game.get(square);
    }

    gameOver() {
        return this.game.game_over();
    }

    removeGreySquares() {
        $('#myBoard .square-55d63').css('background', '')
    }

    clearBoard() {
        this.removeGreySquares();
        this.k_btn.hide();
        this.q_btn.hide();
        this.e_btn.hide();
        this.promotion_options.hide();
    }

    greySquare(square) {
        var $square = $('#myBoard .square-' + square)

        var background = this.whiteSquareGrey
        if ($square.hasClass('black-3c85d')) {
            background = this.blackSquareGrey
        }

        $square.css('background', background)
    }

    getPossibleMoves(square) {
        return this.game.moves({ square: square, verbose: true });
    }

    getEveryPossibleMoves() {
        return this.game.moves({ verbose: true });
    }

    highlight(square) {
        this.greySquare(square);
    }

    showKingsideCastling() {
        this.k_btn.show();
    }

    showQueensideCastlig() {
        this.q_btn.show();
    }
    showEnPassant() {
        this.e_btn.show();
    }

    showPromotionOptions() {
        this.promotion_options.show();
    }

    getPromotionOption() {
        return $("input:radio[name=" + this.option + "]:checked").val(); // for Pawn
    }

    move(source, target) {
        this.game.move({ from: source, to: target });
    }

    promotive_move(source, target, option) {
        this.game.move({ from: source, to: target, promotion: option });
    }

    log() {
        console.log(this.game.fen());
        console.log(this.game.ascii());
    }

    getTurn() {
        return this.game.turn();
    }

    doKingsideCastling() {
        this.game.move("O-O");
    }

    doQueensideCastling() {
        this.game.move("O-O-O");
    }

    put(piece, square) {
        console.log(piece);
        this.game.put(piece, square);
        this.sync();
    }
}