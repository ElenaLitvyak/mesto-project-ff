import { inputName, inputJob, inputPlace, inputLink, inputAvatar } from './index';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '6f0a75bb-d041-4b1b-acc6-7c252bbb532e',
    'Content-Type': 'application/json'
  }
};

export const getUserInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};

export const patchUserInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: inputName.value,
            about: inputJob.value,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};
 
export const postNewCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: inputPlace.value,
          link: inputLink.value,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};

export const deleteMyCard = (_id) => {
    return fetch(`${config.baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: config.headers,
        })
    .then(res => {
        if (res.ok) {
            return;
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};

export const patchAvatar = () => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: inputAvatar.value,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};

export const putLikeCard = (_id) => {
    return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};

export const deleteLikeCard = (_id) => {
    return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            /*likes: inputName.value,*/
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка:${res.status}`);
    });
};