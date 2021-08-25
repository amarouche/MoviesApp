import React from 'react';
import { Button, StyleSheet, Text, TextInput, View , FlatList, ActivityIndicator} from 'react-native';
import FilmItem from "./FilmItem"
import {getFilmsFromApiWithSearchedText} from "../api/IMDBAPI"

export default class App extends React.Component {
  page: number;
  searchedText: string;
  totalPages: number;
  
  
  constructor(props){
    super(props);
    this.state = {
      films:[],
      isLoading: true
     }
   this.searchedText = ""
   this.page = 0
   this.totalPages = 0

  }
  _loadFilms() {
    this.setState({isLoading: true})
    if (this.searchedText.length >0){
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data =>{
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [... this.state.films, ...data.results],
          isLoading: false
        })
      } )
    }
  }

  _getSearchedText(text:string) {
      this.searchedText = text
  }
  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    })
    console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
    this._loadFilms()
  }
  
  _displayFilmDetail = (filmID:number) =>{
    this.props.navigation.navigate("FilmDetail", {film_id: filmID})
  }

  render() {
    // console.log("render")
    return (
  <View  style={style.main_container}>
    <TextInput onChangeText={(text) => this._getSearchedText(text)}
     style={style.textInput}  placeholder="Titre de film"
     onSubmitEditing={() => this._searchFilms()}></TextInput>
    <Button title="recherche" onPress={()=>this._searchFilms()} ></Button>
    <FlatList
      data={this.state.films}
      keyExtractor={(item, index) => {
          return item.id.toString();
        }}
      onEndReachedThreshold={0.5}
      onEndReached={() =>{
        if(this.page < this.totalPages){
          this._loadFilms()
        }
      }}
      renderItem={({item}) =><FilmItem film={item} displatFilmDetail={this._displayFilmDetail} ></FilmItem>}>
      </FlatList>
     { this.state.isLoading ?
          <View style={style.loading_container}>
            <ActivityIndicator size='large' />
          </View>
          : null
      }
  </View>
  // <View style={{flex:1, backgroundColor:'yellow',alignItems:'center', justifyContent:'flex-end'}}>
  //   <View style={{height:50, width:50, backgroundColor:'red'}}></View>
  //   <View style={{height:50, width:50, backgroundColor:'green'}}></View>
  //   <View style={{height:50, width:50, backgroundColor:'blue'}}></View>
  // </View>
  )}
}

const style = StyleSheet.create({
  main_container:{
    flex:1
  },
  textInput:{
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
