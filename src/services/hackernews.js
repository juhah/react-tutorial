import axios from 'axios'

const API_URL = 'https://hacker-news.firebaseio.com/v0/'

function getApiUrlByItemType (type) {
	switch (type) {
		case 'ask':
			return 'askstories';
		case 'show':
			return 'showstories';
		case 'jobs':
			return 'jobstories';
		case 'newest':
			return 'newstories';
		case 'newcomments':
			return 'topstories';
		default:
			return 'topstories';
	}
}

export function getStories(section) {
  return axios.get(API_URL + getApiUrlByItemType(section) + '.json')
    .then((response) => (response.data))
}

export function getItem(itemId) {
  return axios.get(API_URL + `item/${itemId}.json`)
    .then((response) => (response.data))
}
