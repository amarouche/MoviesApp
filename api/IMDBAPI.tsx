const API_TOKEN = "a9d0b1b0e317ee286a26a709f96e8a92";

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +'&page='+page
  return fetch(url).then((res) =>{
    return res.json()
    }).catch((err)=> console.log(err))
}

export function getFilmsFromApiById (id){
  const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=' + API_TOKEN + '&language=fr'
  return fetch(url).then((res) =>{
    return res.json()
    }).catch((err)=> console.log(err))
}