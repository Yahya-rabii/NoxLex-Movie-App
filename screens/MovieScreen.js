import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from "react-native";
import Constants from "expo-constants";
import Loading from "../components/Loading";
import ProfileThumb from "../components/ProfileThumb";
import InfoCard from "../components/InfoCard";
import { auth } from "../API/firebaseConfig.js";
import { MaterialIcons } from "@expo/vector-icons";

const screen = Dimensions.get("window");

import { fetchCredits } from "../servises/servises";

export default function MovieScreen({ navigation, route }) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [director, setDirector] = useState("");
  const { movie } = route.params;

  useEffect(() => {
    setLoading(true);
    fetchCredits(movie.id).then((data) => {
      setCredits(data.credits);
      setDirector(data.director);
      setLoading(false);
    });
  }, []);

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

  return loading ? (
    <Loading />
  ) : (
    <DrawerLayoutAndroid
      drawerWidth={200}
      renderNavigationView={renderNavigationView}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
            }}
            style={styles.banner}
          />
          <InfoCard movie={movie} director={director} />
        </View>
        <View style={styles.credit}>
          <>
            <Text style={styles.title}>CAST</Text>
            {credits && (
              <FlatList
                data={credits.cast}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Actor", { actor: item })
                    }
                  >
                    <ProfileThumb item={item} />
                  </TouchableOpacity>
                )}
                horizontal
              />
            )}
          </>
          <>
            <Text style={styles.title}>CREW</Text>
            {credits && (
              <FlatList
                data={credits.crew}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Actor", {
                        actor: item,
                        movie: movie, //send movie to actor screen to show the banner
                      })
                    }
                  >
                    <ProfileThumb item={item} />
                  </TouchableOpacity>
                )}
                horizontal
              />
            )}
          </>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  banner: { width: Constants.width, height: 200 },

  credit: {
    flex: 1,
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#121212",
    borderTopColor: "white",
    borderTopWidth: 2,
  },

  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
