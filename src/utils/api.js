class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseCheck(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(this._getResponseCheck)
  }

  saveUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(this._getResponseCheck)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(this._getResponseCheck)
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this._getResponseCheck)
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._getResponseCheck)
  }

  changeLikeCardStatus(id, isLikes) {
    if (isLikes) {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this.headers,
        })
        .then(this._getResponseCheck);
    } else {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this.headers,
        })
        .then(this._getResponseCheck);
      }
  }

  saveUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(this._getResponseCheck)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '342c5125-3193-41dd-94d4-70f64e8689ce',
    'Content-Type': 'application/json'
  }
});

export default api;