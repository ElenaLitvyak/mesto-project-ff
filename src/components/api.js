import { checkResponse } from './utils';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '6f0a75bb-d041-4b1b-acc6-7c252bbb532e',
    'Content-Type': 'application/json'
  }
};

function request(url, options) {
   return fetch(url, options).then(checkResponse)
};

export const getUserInformation = request(`${config.baseUrl}/users/me`, {headers: config.headers});

export const getInitialCards = request(`${config.baseUrl}/cards`, {headers: config.headers});

export const patchUserInformation = (name, job) => request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        about: job,
    })
});

export const postNewCard = (name, link) => request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
});

export const deleteMyCard = (_id) => request(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE', 
    headers: config.headers
});

export const patchAvatar = (avatar) => request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: avatar,
    })
});

export const putLikeCard = (_id) => request(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: config.headers,
});

export const deleteLikeCard = (_id) => request(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
});