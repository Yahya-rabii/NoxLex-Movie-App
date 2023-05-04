import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  DrawerLayoutAndroid,
} from "react-native";
import { auth } from "../API/firebaseConfig.js";
import { MaterialIcons } from "@expo/vector-icons";

const About = ({ navigation }) => {
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
        <View style={styles.header}>
          <Text style={styles.name}>Yahya Rabii</Text>
          <Text style={styles.jobTitle}>Software Engineering Student</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/profile.jpg")}
          />
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutHeader}>About Me</Text>
          <Text style={styles.aboutText}>
            I am a junior developer studying at EMSI school. I enjoy coding,
            designing, innovating, and experimenting. I am enthusiastic and a
            social person who loves to take up new challenges and learn new
            skills. I enjoy meeting new people, exchanging ideas, and spreading
            knowledge and positivity.
          </Text>
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.socialHeader}>Follow me on Social Media</Text>

          <View style={styles.socialLinksContainer}>
            <TouchableOpacity
              style={styles.socialLink}
              onPress={() => Linking.openURL("https://github.com/Yahya-rabii/")}
            >
              <Image
                style={styles.socialIcon}
                source={require("../assets/github.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialLink}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/yahya____rabii/")
              }
            >
              <Image
                style={styles.socialIcon}
                source={require("../assets/instagram.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialLink}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/rabii-yahya-1b093a20b/"
                )
              }
            >
              <Image
                style={styles.socialIcon}
                source={require("../assets/linkedin.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialLink}
              onPress={() => Linking.openURL("https://yahya.rabii.me/")}
            >
              <Image
                style={styles.socialIcon}
                source={require("../assets/website.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopColor: "#fff",
    borderWidth: 2,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },

  jobTitle: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 30,
  },

  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 1,
  },

  image: {
    width: 150,
    height: 150,

    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 20,
  },

  aboutContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 30,
  },

  aboutHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  aboutText: {
    fontSize: 16,
    color: "#d3d3d3",
    lineHeight: 24,
  },

  socialContainer: {
    width: "100%",
    backgroundColor: "#222",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  socialHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  socialLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  socialLink: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  socialIcon: {
    width: 30,
    height: 30,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 50,
    width: "100%",
    height: 50,
    aspectRatio: 1,
    resizeMode: "contain",
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

export default About;
