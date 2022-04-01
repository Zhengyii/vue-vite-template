import fetch from '@/utils/fetch'
export default {
  user: {
    login: body => fetch.post('/login')(body)
  }
}
