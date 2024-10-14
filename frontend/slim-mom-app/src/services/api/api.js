import axios from 'axios';

//axios.defaults.baseURL = 'https://.com';
 axios.defaults.baseURL = 'http://localhost:3001';
// const API_KEY = '';

const END_POINTS = {

  UpdateUserInfo: '/api/users/infouser'
};



export const apiUpdateInfoUser = async (token, body) => {
  const res = await axios.put(END_POINTS.UpdateUserInfo, body, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return res.data.result
}

export const apiAddMyProduct = async (body, token, date) => {
  const res = await axios.post(END_POINTS.AddMyProduct, body, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  const result = await res.data.newProduct.productInfo
  return result
}

export const apiDeleteMyProduct = async (id, token, date) => {
  const res = await axios.delete(END_POINTS.DeleteMyProduct + id, {
    headers: {
    Authorization: `Bearer ${token}` 
  },
  data: {
    date
  }
  })
  const result = await res.data.newProduct.productInfo
  return result
}

export const apiListMyProducts = async (date, token) => {
  const res = await axios.post(END_POINTS.ListMyProducts, {
    date
   }, {
   headers: {
     Authorization: `Bearer ${token}`
   },
  })
  const result = await res.data.productList;
  return result
}

export const apiGetSearchProducts = async (value) => {
  const res = await axios(END_POINTS.GetSearchProducts, {
    params: {
      title: value
    }
  })
  const result = await res.data.data
  return result
}