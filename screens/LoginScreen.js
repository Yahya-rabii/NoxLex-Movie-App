import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../API/firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import CustomAlert from "../components/CustomAlert";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      if (!emailRegex.test(email)) {
        setAlertTitle("Invalid email address");
        setAlertMessage("");
        setShowAlert(true);
        return;
      }
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendVerificationEmail(user);
      })
      .catch((error) => {
        setAlertTitle("Registartion Error");
        setAlertMessage(error.message);
        setShowAlert(true);
      });
  };

  const sendVerificationEmail = (userObj) => {
    sendEmailVerification(userObj)
      .then(() => {
        setAlertTitle("Verification email sent");
        setAlertMessage("Please check your email to verify your account.");
        setShowAlert(true);
      })
      .catch((error) => {
        setAlertTitle("Error");
        setAlertMessage(error.message);
        setShowAlert(true);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          setAlertTitle("Logged in with:");
          setAlertMessage(user.email);
          setShowAlert(true);
          navigation.replace("Home");
        } else {
          setAlertTitle("Email not verified");
          setAlertMessage("please verify your email");
          setShowAlert(true);
        }
      })
      .catch((error) => {
        setAlertTitle("Login Error");
        setAlertMessage(error.message);
        setShowAlert(true);
      });
  };

  const isDarkMode = colorScheme === "dark";
  const backgroundColor = isDarkMode ? "#121212" : "#fff";
  const textColor = isDarkMode ? "#121212" : "#fff";
  const buttonBackgroundColor = isDarkMode ? "#FF0000" : "red";

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20} // adjust this value as needed
    >
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{
          width: 200,
          height: 200,
          marginBottom: 50,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: "red",
          backgroundColor: "gray",
          padding: 10,
          margin: 10,
          marginLeft: 50,
          marginRight: 50,
          marginTop: 50,
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, { color: textColor, borderColor: textColor }]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, { color: textColor, borderColor: textColor }]}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={[
            styles.button,
            styles.buttonOutline,
            { borderColor: textColor },
          ]}
        >
          <Text style={[styles.buttonOutlineText, { color: textColor }]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        title={alertTitle}
        message={alertMessage}
        visible={showAlert}
        onPress={() => setShowAlert(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#FF0000",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#121212",
    fontWeight: "700",
    fontSize: 16,
  },
});
