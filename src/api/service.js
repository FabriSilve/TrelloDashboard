const TRELLO_TOKEN = 'trello_token';
const BOARD = 'board'

class Service {
  constructor() {
    this.token = localStorage.getItem(TRELLO_TOKEN);
    const board = localStorage.getItem(BOARD);
    if (board) {
      this.board = board;
    }
  }

  saveBoard(board) {
    this.board = board;
    localStorage.setItem(BOARD, board);;
  }

  checkToken() {
    this.token = localStorage.getItem(TRELLO_TOKEN);
    return this.token;
  }

  clear() {
    this.token = null;
    this.board = null;
    localStorage.removeItem(BOARD);
  }
}

const service = new Service();

export default service;