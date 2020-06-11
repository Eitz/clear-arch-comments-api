import axios from 'axios'
import querystring from 'querystring'
import makeIsQuestionable from './is-questionable'

const isQuestionable = makeIsQuestionable({
  issueHttpRequest: axios,
  querystring
})

export default isQuestionable
