import request from 'superagent'
import imageTemplate from '../views/image.hbs'

const showImage = (err, res) => {
  const placeholder = document.getElementById('placeholder')
  placeholder.innerHTML = imageTemplate(res.body)
}

const getImage = () => {
  const apod = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
  request.get(apod).end(showImage)
}

document.addEventListener('DOMContentLoaded', getImage)
