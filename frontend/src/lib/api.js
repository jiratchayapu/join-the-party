import axios from 'axios'
import {
  message,
} from 'antd';

//User
export const user = {
  register: (data) =>
    axios
      .post(`http://localhost:4000/users/register`, data)
      .then(({ data }) => data),
  login: (data) =>
  axios
    .post(`http://localhost:4000/users`, data)
    .then(({ data }) => data),
  /*getInStock: () =>
    axios
      .get(`http://localhost:3001/products/stock/1234567890121`, null)
      .then(({ data }) => data),
  delete: (ProductID) =>
    axios
      .delete(`http://localhost:3001/products/${ProductID}`, null)
      .then(({ data }) => data),*/
}

//Party
export const party = {
  get: (UserId) =>
    axios
      .get(`http://localhost:4000/parties/${UserId}`, null)
      .then(({ data }) => data),
  getMyParties : (UserId) => 
    axios
    .get(`http://localhost:4000/parties/my-parties/${UserId}`, null)
    .then(({ data }) => data),
  create: (data) =>
    axios
      .post(`http://localhost:4000/parties/`, data)
      .then(({ data }) => data),
  join: (data) =>
    axios
      .post(`http://localhost:4000/parties/join`, data)
      .then(({ data }) => data),
  disjoin: (data) =>
    axios
      .post(`http://localhost:4000/parties/disjoin`, data)
      .then(({ data }) => data),
}
/*
//Order
export const order = {
  get: () =>
    axios
      .get(`http://localhost:3001/orders/1234567890124`, null)
      .then(({ data }) => data),
  checkout: () =>
    axios
      .put(`http://localhost:3001/orders`, { CitizenID: '1234567890124' })
      .then(({ data }) => data),
}

//Wishlist
export const wishlist = {
  get: () =>
    axios
      .get(`http://localhost:3001/wishlists/1234567890124`, null)
      .then(({ data }) => {
        console.log(data)
        return data
      }),
  add: (ProductID) =>
    axios
      .post(`http://localhost:3001/wishlists`, {
        ProductID,
        CitizenID: '1234567890124',
      })
      .then(({ data }) => data),
  delete: (ProductID) =>
    axios
      .delete(`http://localhost:3001/wishlists/${ProductID}/1234567890124`)
      .then(({ data }) => data),
}

export const ads = {
  get: () =>
    axios.get(`http://localhost:3001/mongo/`, null).then(({ data }) => data),
}*/