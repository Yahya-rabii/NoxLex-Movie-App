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
import { Card } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Loading from "../components/Loading";
import { fetchMovies } from "../servises/servises";
import { auth } from "../API/firebaseConfig.js";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);

  //take a backup of all movies in movies2 state
  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm, movies).then((data) => {
      setMovies2(data);
      setLoading(false);
    });
  }, []);

  //fetches movie and stores them in movies state
  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm, movies2).then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, [searchTerm]);

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
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={200}
      renderNavigationView={renderNavigationView}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
            }}
            style={styles.banner}
          />
          <View style={styles.bannerInfoCard}>
            <Text style={styles.bannerTitle}>
              {movies[0]?.original_title.substr(0, 20)}
            </Text>
            <Text style={styles.bannerOverview}>
              {movies[0]?.overview.substr(0, 80) + "..."}
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder={"search movies"}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <TouchableOpacity
              onPress={() => {
                console.log("pressed");
                setSearchNow(!searchNow);
                // if the input is empty, then set the movies state to the original movies state that existed before the search in the movies2 state
                if (searchTerm === "") {
                  setMovies(movies2);
                }
              }}
            >
              <EvilIcons
                name={searchTerm ? "search" : "refresh"}
                size={20}
                color="black"
                style={{ alignSelf: "center", marginHorizontal: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.movieListCard}>
            <FlatList
              data={movies}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Card style={styles.movieCard}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Movie", { movie: item })
                      }
                    >
                      <Image
                        source={{
                          uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                        }}
                        style={{ width: Constants.width, height: 200 }}
                      />
                    </TouchableOpacity>
                  </Card>
                );
              }}
            />
          </View>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  banner: { width: Constants.width, height: 200, top: 0 },
  bannerInfoCard: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
    right: 0,
    left: 0,
    backgroundColor: "rgba(21,21,21,0.5)",
  },
  bannerTitle: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1.2,
  },
  bannerOverview: {
    color: "grey",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    borderTopColor: "white",
    borderTopWidth: 2,
    paddingBottom: 250,
  },
  inputCard: {
    position: "absolute",
    top: -40,
    margin: 20,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 100,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  movieCard: {
    flex: 1,
    height: 200,
    margin: 5,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 5,
  },
  movieListCard: {
    top: screen.height * 0.05,
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
