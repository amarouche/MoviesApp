import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class FilmItem extends React.Component{

  render()
  {
    // console.log(this.props)
    const {film, displatFilmDetail } = this.props
    return (
    <TouchableOpacity
    onPress={ () => displatFilmDetail(film.id)}
    style={styles.main_container}>
       <Image
       style={styles.image}
        source={{
          uri: "https://image.tmdb.org/t/p/w300" + film.poster_path 
        }}
      />
      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{film.title}</Text>
          <Text style={styles.vote_text} >{film.vote_average}</Text>
        </View>
        <View style={styles.description_container}>
          <Text style={styles.description_text}  numberOfLines={6}>{film.overview}</Text>
        </View>
        <View style={styles.date_container}>
          <Text style={styles.date_text} >Sorti le {film.release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
    
  )
  }
}
const styles = StyleSheet.create({
  main_container:{
    flexDirection:'row',
    // backgroundColor:getRandomColor()
  },
  image:{
    height:180,
    width:120,
    backgroundColor:'gray'
  },
  content_container: {
    flex: 1,
    margin: 5,
    backgroundColor:getRandomColor()
  },
  header_container: {
    // flex: 3,
    flexDirection: 'row',
    backgroundColor:getRandomColor()
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7,
    backgroundColor:getRandomColor()
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}