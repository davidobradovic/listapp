import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {TextInput, FlatList, Image, ImageBackground} from 'react-native'
import data from '../constants/api.json';
import {useEffect,useState} from 'react'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [car, setCar] = useState([])
  const [searchedData, setSearchedData] = useState([])
  const [search, setSearch] = useState('');

  const searchFilter = (text) => {
    if(text) {
        const newData = searchedData.filter((item) => {
            const itemData = item.carmake ? 
                             item.carmake.toUpperCase() : 
                             ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setCar(newData);
        setSearch(text);
    } else {
        setCar();
        setSearch(text);
    }
}

  useEffect(() => {
    setSearchedData(data)
    setCar();
  }, [])

  const carcontainer = ({item}) => {
    return (
      <View key={item.id} style={styles.carbox}>
        <View style={styles.firstcontainer}>
          <Image source={require('../assets/images/car.gif')} style={styles.carimage} />
          <View style={styles.fss}>
            <Text style={styles.cartitle}>{item.carmake} {item.carmodel}</Text>
            <Text style={styles.caryear}>Car year : {item.carmodelyear}</Text>
          </View>
        </View>
        <View style={{width: '35%'}}>
          <Text style={styles.vintitle}>Car vin :</Text>
          <Text style={styles.carvin}>{item.carvin}</Text>
        </View>
      </View>
    )
  }
  
  return (
    <ImageBackground source={require('../assets/images/cars.jpeg')} resizeMode="cover" style={styles.container}>
      <Text style={styles.title}>Cars list</Text>
      <TextInput style={styles.searchinput} placeholder="Search cars.." value={search} onChangeText={(text) => searchFilter(text)} />
      <FlatList 
        data={car}
        renderItem={carcontainer}
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
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
    marginBottom: 15
  },
  searchinput: {
    backgroundColor: 'rgba(250,250,250, 0.8)',
    color: 'black',
    height: 50,
    marginVertical: 20,
    padding: 15
  },
  carbox: {
    width: '100%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity:  0.1,
    shadowRadius: 5,
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  carimage: {
    width: 50,
    height: 50
  },  
  firstcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fss: {
    marginLeft: 5
  },
  cartitle: {
    fontSize: 13
  },
  caryear: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(20,20,20,0.5)'
  },
  carvin: {
    fontSize: 10,
    marginRight: 15,
    fontWeight: '600',
    color: 'rgba(20,20,20,0.75)'
  },
  vintitle: {
    fontSize: 11,
  }
});
