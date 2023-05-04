import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  TouchableOpacity,
} from "react-native";
import { Asset } from "expo-asset";
import { auth } from "../API/firebaseConfig.js";
import { MaterialIcons } from "@expo/vector-icons";

const ActorScreen = ({ route, navigation }) => {
  const { actor, movie } = route.params;

  // Get the banner image from the movie or use a default image from assets if banner doesn't exist
  const bannerUrl = movie?.backdrop_path
    ? `http://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie?.poster_path
    ? `http://image.tmdb.org/t/p/w780${movie.poster_path}`
    : Asset.fromModule(require("../assets/adaptive-icon.png")).uri;

  // Get the actor image from the actor
  const actorImageUrl = `http://image.tmdb.org/t/p/w185${actor.profile_path}`;

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAboutMe = () => {
    navigation.navigate("AboutMe"); // Navigate to 'AboutMe' page
  };
  const handleHome = () => {
    navigation.navigate("Home"); // Navigate to 'Home' page
  };

  const renderNavigationView = () => (
    <View style={styles.drawer}>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.drawerItemContainer}>
          <MaterialIcons name="logout" size={24} color="red" />
          <Text style={styles.drawerItem}>Logout</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAboutMe}>
        <View style={styles.drawerItemContainer}>
          <MaterialIcons name="person" size={24} color="blue" />
          <Text style={styles.drawerItem}>About Me</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHome}>
        <View style={styles.drawerItemContainer}>
          <MaterialIcons name="home" size={24} color="green" />
          <Text style={styles.drawerItem}>Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={200}
      renderNavigationView={renderNavigationView}
    >
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: bannerUrl }}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>

        <View style={styles.actorInfoContainer}>
          <Image
            source={{ uri: actorImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          <Text style={styles.name}>{`Name: ${actor.original_name}`}</Text>
        </View>

        <Text style={styles.name2}>{`Character: ${actor.character}`}</Text>
        <Text style={styles.name2}>{`Popularity: ${actor.popularity}`}</Text>
        <Text
          style={styles.name2}
        >{`Known For: ${actor.known_for_department}`}</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
  },
  bannerContainer: {
    height: 250,
    width: "100%",
  },
  banner: {
    flex: 1,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
  },
  actorInfoContainer: {
    marginTop: -100,
    backgroundColor: "#5b5b5b",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
    borderColor: "black",
    borderWidth: 3,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 3,
  },
  name: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  name2: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 50,
  },
  drawer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  drawerItem: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default ActorScreen;
