import {BooksAPI} from '../../APILink';

export const getBooks = async () => {
  return await fetch(BooksAPI) //api
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      return json;
    });
};

export const getBook = async (id) => {
  //id指定で1データ取る
  return await fetch(BooksAPI + '/' + id) //api
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

export const checkBookInQuestions = async (id) => {
  return await fetch(BooksAPI + '/' + id + '/questions').then((res) => {
    if (res.status === 404) {
      return false;
    } else {
      return true;
    }
  });
};

export const createBook = async (jsonData) => {
  return await fetch(BooksAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      summary: jsonData.summary,
      access_key: jsonData.access_key,
      user_id: jsonData.user_id,
    }),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('BookCreateError');
      }
      return getBooks();
    })
    .catch((error) => alert('作成に失敗しました。', error))
    .finally(() => getBooks());
};

export const deleteBook = async (id) => {
  return await fetch(BooksAPI + '/' + id, {
    method: 'DELETE',
  }).then(() => getBooks());
};
