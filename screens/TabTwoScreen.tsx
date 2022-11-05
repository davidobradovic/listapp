import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {TextInput, ImageBackground, FlatList, Image} from 'react-native'
import locations from '../constants/apic.json'
import {useEffect, useState} from 'react'

export default function TabTwoScreen() {

  const [destination, setDestination] = useState([])
  const [searchedData, setSearchedData] = useState([])
  const [search, setSearch] = useState('');

  const searchFilter = (text) => {
    if(text) {
        const newData = searchedData.filter((item) => {
            const itemData = item.destination ? 
                             item.destination.toUpperCase() : 
                             ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setDestination(newData);
        setSearch(text);
    } else {
        setDestination();
        setSearch(text);
    }
}

  useEffect(() => {
    setSearchedData(locations)
    setDestination();
  }, [])


  const location = ({item}) => {
    return (
      <View style={styles.locationbox} key={item.id}>
        <Text style={styles.titlel}>{item.destination}</Text>
        <View>
          <Text style={styles.price}>{item.price} EUR</Text>
          <Text style={styles.nights}>For: {item.nights} nights</Text>
        </View>
      </View>
    )
  }

  return (
      <ImageBackground source={require('../assets/images/contacts.jpg')} style={styles.container} resizeMode="cover">
        <Text style={styles.title}>Destinations list</Text>
        <TextInput value={search} onChangeText={(text) => searchFilter(text)} placeholder='Search contacts..' style={styles.searchbox}/>
        <FlatList 
          numColumns={2}
          data={destination}
          renderItem={location}
        />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 21,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
    marginBottom: 15
  },
  searchbox: {
    backgroundColor: 'rgba(250,250,250, 0.5)',
    color: 'white',
    height: 50,
    borderRadius: 50,
    marginVertical: 20,
    padding: 15
  },
  locationbox: {
    flex: 1,
    width: '50%',
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 10,
    height: 150,
    shadowColor: 'white',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity:  0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 15
  },
  titlel: {
    fontSize: 17,
    fontWeight: '700'
  },
  price: {
    fontWeight: '600',
    fontSize: 14
  },
  nights: {
    fontSize: 11
  },
});
