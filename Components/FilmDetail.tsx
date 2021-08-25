import React from "react";
import {StyleSheet ,View, Text,Image, ActivityIndicator, ScrollView} from "react-native";
import { getFilmsFromApiById } from "../api/IMDBAPI";
import moment from 'moment'
import numeral from 'numeral'
import { connect } from "react-redux";

class FilmDetail extends React.Component {
  constructor(props){
    super(props)
    this.state={
      film: undefined,
      isLoading:true
    }
  }
  
  componentDidMount(){
    getFilmsFromApiById(this.props.navigation.state.params.film_id).then(data =>{
      this.setState({
        film : data,
        isLoading:false
      })
    })
  }
  _displayLoading = ()=>{
    if(this.state.isLoading){
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }
  _displayFilm = () =>{
    const { film } = this.state

    if(film != undefined){
      return (
        <ScrollView>
          <View style={styles.image_container}>
          <Image 
            style={styles.image}
            source={{
            uri: "https://image.tmdb.org/t/p/w300" + film.poster_path 
          }}/>
          </View>

          
          <Text style={styles.title_text}>{film.title}</Text>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }

  }
  render(){
    console.log(this.props)
    const film_id = this.props.navigation.state.params.film_id
   
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main_container:{
    flex:1,
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  image_container:{
    flex: 1,
    alignItems:'center'
  },
  image:{
    margin:5,
    height:280,
    width:200
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})
const mapStateToProps = (state:any) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
export default  connect(mapStateToProps)(FilmDetail)
