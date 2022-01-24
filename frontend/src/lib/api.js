import axios from 'axios'

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