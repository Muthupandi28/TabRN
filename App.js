import * as React from 'react';
import { Text, View,Image,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';


function CustomHeader({title,isHome,navigation})
{
  return(
    <View style={{flexDirection:'row'}}>
          <View style={{flex:1,justifyContent:'center'}}>
            {
              isHome ?
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                  <Image style={{width:30,height:30,marginLeft:5}}
                    source={require('./src/images/menu.png')}
                    resizeMode='contain'
                  />
            </TouchableOpacity> 
            :
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
            onPress={()=>navigation.goBack()}>
                  <Image style={{width:20,height:20,marginLeft:5}}
                  source={require('./src/images/return.png')}
                  resizeMode='contain'
                  />
                  <Text>Back</Text>
            </TouchableOpacity>
            }
            
          </View>
          
         
        
        <View style={{flex:1.5,justifyContent:'center'}}>
           <Text style={{textAlign:'center'}}>{title}</Text>
        </View>
        <View style={{flex:1}}></View>
    </View>
  );
}


function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <CustomHeader title="Home" isHome={true} navigation={navigation}/>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text>Home!</Text>
          <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate('HomeDetails')}>
              <Text>Go to Home Details</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeScreenDetail({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Home Details" navigation={navigation}/>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text>Home Details!</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomHeader title="Settings" isHome={true} navigation={navigation}/>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
        <Text>Settings!</Text>
        <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate('SettingsDetails')}>
              <Text>Go to Settings Details</Text>
          </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}


function SettingsScreenDetail({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Settings Details" navigation={navigation}/>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text>Settings Details!</Text>
      </View>
  </SafeAreaView>
  );
}



function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Notifications" navigation={navigation}/>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text>Notifications</Text>
      </View>
  </SafeAreaView>
  );
}




function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Register" navigation={navigation}/>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text>Register screen</Text>
      </View>
  </SafeAreaView>
  );
}



function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
        <Text style={{backgroundColor:'lightgray',borderColor:'black'}}>Login screen!</Text>
        <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate('HomeApp')}>
              <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate('Register')}>
              <Text>Register</Text>
          </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}






function CustomDrawerContent(props)
{
      return(
        <SafeAreaView style={{flex:1}}>
            <View style={{height:150,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('./src/images/profile.png')} style={{height:120,width:120,borderRadius:60}}/>
            </View>
            <ScrollView style={{marginLeft:5}}>
                  <TouchableOpacity style={{marginTop:20}} onPress={()=>props.navigation.navigate('MenuTab')}>
                    <Text>Menu Tab</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginTop:20}} onPress={()=>props.navigation.navigate('Notifications')}>
                    <Text>Notifications</Text>
                  </TouchableOpacity>
              </ScrollView>
        </SafeAreaView>
      );
}

const Tab = createBottomTabNavigator();

const navOptionHandler =()=>({
  headerShown:false
});

const StackHome=createStackNavigator();

function HomeStack()
{
  return(
  <StackHome.Navigator initialRouteName="Home">
    <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler}/>
    <StackHome.Screen name="HomeDetails" component={HomeScreenDetail} options={navOptionHandler}/>
</StackHome.Navigator>);
}

const StackSetting=createStackNavigator();

function SettingsStack()
{
  return (
    <StackSetting.Navigator initialRouteName="Settings">
      <StackSetting.Screen name="Settings" component={SettingsScreen} options={navOptionHandler}/>
      <StackSetting.Screen name="SettingsDetails" component={SettingsScreenDetail} options={navOptionHandler}/>
  </StackSetting.Navigator>
  );
  
}




function TabNavigator()
{
      return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? require('./src/images/homewhite.png')
                    : require('./src/images/home.png')
                } else if (route.name === 'Settings') {
                  iconName = focused ?  require('./src/images/settingswhite.png') :  require('./src/images/settings.png');
                }
                // You can return any component that you like here!
                return <Image source={iconName} style={{width:20,height:20}} resizeMode='contain' />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'red',
              inactiveTintColor: 'black',
            }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
      );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation()
{
  return(
    <Drawer.Navigator initialRouteName="MenuTab" drawerContent={props=>CustomDrawerContent(props)}>
            <Drawer.Screen name="MenuTab" component={TabNavigator} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const StackApp=createStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
         <StackApp.Navigator initialRouteName="Login">
         <StackApp.Screen name="HomeApp" component={DrawerNavigation} options={navOptionHandler}/>
         <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler}/>
         <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler}/>
  </StackApp.Navigator>
    </NavigationContainer>
  );
}