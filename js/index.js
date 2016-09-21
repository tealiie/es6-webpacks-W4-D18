import request from 'superagent'
import imageTemplate from '../views/image.hbs'

const showImage = (err, res) => {
  const placeholder = document.getElementById('placeholder')
  placeholder.innerHTML = imageTemplate(res.body)
}

const getImage = () => {
  showImage(null, {
    body: {
      title: 'DEMO',
      explanation: 'DEMO'
    }
  })
}

document.addEventListener('DOMContentLoaded', getImage)
