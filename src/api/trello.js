class TrelloClient {
  logout() {
    localStorage.removeItem('trello_token');
    location.reload();
  }

  async authenticate() {
    try {
      await Trello.authorize({
        name: "Trello Dashboard",
        type: "popup",
        scope: { read: 'true' },
        expiration: '30days',
      });
    } catch (e) {
      console.error(e);
      this.logout();
    }
  }

  async getBoards() {
    try {
      return await Trello.get("member/me/boards")
    } catch (e) {
      console.error(e);
      this.logout();
    }
  }
}

const trello = new TrelloClient();

export default trello;