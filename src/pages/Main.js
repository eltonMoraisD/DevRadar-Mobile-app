import React, {useState,useEffect} from 'react';
import { StyleSheet,Image,View,Text} from 'react-native';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

import MapView,{Marker,Callout} from 'react-native-maps';

function Main({navigation}) {

	const [currentRegion, setCurrentRegion] = useState(null)
	
	useEffect(() =>{
		async function loadInitialPosition() {
			const {granted} = await requestPermissionsAsync()

			if(granted){
				const {coords} = await getCurrentPositionAsync({
					enableHighAccuracy: true
				})

				const {latitude,longitude} = coords

				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta:0.04,
					longitudeDelta: 0.04,
				})
			}
		}

		loadInitialPosition();
	},[]);

	if(!currentRegion){
		return null;
	}

	return (
		<MapView initialRegion={currentRegion} style={styles.map}>
			<Marker coordinate={{latitude:16.8845284, longitude:-24.9777387}}>
				<Image style={styles.avatar} source={{uri:'https://avatars2.githubusercontent.com/u/39710764?s=460&u=7912ae5b1093e79f24c6f42bee54951a313d551d&v=4'}}/>
				<Callout onPress={() =>{
						navigation.navigate('Profile',{github_username:'eltonMoraisD'})
				}}>
					<View style={styles.callout}>
						<Text style={styles.devName}>Elton Morais</Text>
						<Text style={styles.devBio}>Lorem ipsum doloris sit amesi</Text>
						<Text style={styles.devTechs}>ReactJS, React Native , Node.js</Text>
					</View>
				</Callout>
				
			</Marker>
		</MapView>
	);
}

const styles = StyleSheet.create({
		map:{
			flex: 1
		},

		avatar:{
			width:54,
			height:54,
			borderRadius:4,
			borderWidth:4,
			borderColor:'#fff',
		},

		callout:{
			width: 260

		},
		devName:{
			fontWeight: 'bold',
			fontSize:16
		},

		devBio:{
			color:'#666',
			marginTop:5
		},


		devTechs:{
			marginTop:5

		}
})

export default Main;

