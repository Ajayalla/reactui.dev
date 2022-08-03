import axios from 'axios'

export const registerUser = async (values: any) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, values)
