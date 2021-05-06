import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

export default function App() {
  //Api url
  var url = "https://beta.api.ninjasalary.com/get-dummy-dashboard-data/";
  //Variables to display data
  var isLoading = false;
  var [balance, setBalance] = useState([]);
  var [salary, setSalary] = useState([]); //Monthly Salary
  var [available, setAvailable] = useState([]); //Available balance
  var [maxwithdraw, setMaxwithdraw] = useState([]); //Maximum allowed
  var [name, setName] = useState(""); //Name = FirstName + MiddleName + LastName
  var [isLoading, setloading] = useState(true); //Status of API Loading

  //Calling API and fetching data
  useEffect(() => {
    if (isLoading) {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          //Fetching Name
          setName(
            json.data.first_name +
              " " +
              json.data.middle_name +
              " " +
              json.data.last_name
          );

          setAvailable(json.data.balance_details.available_balance_in_paisa);
          setSalary(json.data.balance_details.monthly_salary_in_paisa);
          setMaxwithdraw(json.data.balance_details.max_allowed_in_paisa);
        })
        .catch((err) => console.log(err))
        .finally(setloading(false));
    }
  });

  // setloading(true);
  if (isLoading == false) {
    // setname(datasrc.data.first_name);
    return (
      <ScrollView>
        {/* Displaying Name , Salary, Available Balance and Maximum withdrawable amount */}
        <View style={styles.container}>
          <Text style={styles.heading}>Hello {name},</Text>
          <Text style={styles.bodytext}>
            You have earned Rs. {salary / 100} this month.
          </Text>
          <Text style={styles.bodytext}>
            Your available balance is Rs. {available / 100}
          </Text>
          <Text style={styles.bodytext}>
            You can withdraw Rs. {maxwithdraw / 100}
          </Text>
          <View style={styles.horizon}>
            <Text style={styles.prefix}>Rs</Text>
            <TextInput
              placeholder="Enter Amount"
              keyboardType="number-pad"
              style={styles.editText}
              value={balance.toString()}
              onChangeText={(text) => {
                setBalance(text);
              }}
            />
          </View>
          {/* For each options calculating percentage of maximum withdrawable amount like for 25% I calculated (Maximum withdrawable * 25/100) in Rs */}
          <View style={styles.options}>
            <Text
              style={styles.rounded}
              onPress={() => {
                setBalance(maxwithdraw * (25 / 10000));
              }}
            >
              25%
            </Text>
            <Text
              style={styles.rounded}
              onPress={() => setBalance(maxwithdraw * (50 / 10000))}
            >
              50%
            </Text>
            <Text
              style={styles.rounded}
              onPress={() => setBalance(maxwithdraw * (75 / 10000))}
            >
              75%
            </Text>
            <Text
              style={styles.rounded}
              onPress={() => setBalance(maxwithdraw * (100 / 10000))}
            >
              100%
            </Text>
          </View>
          {/*WithDraw Button*/}

          <TouchableOpacity style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Withdraw</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "30%",
    backgroundColor: "#fff",
    flexDirection: "column",
    margin: "8%",
  },
  heading: {
    fontSize: 25,
    color: "#000000",
  },
  bodytext: {
    fontSize: 20,
    color: "#030303",
    marginTop: 20,
  },
  horizon: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "space-around",
    borderWidth: 1,
    borderColor: "#b5b5b3",
    borderRadius: 10,
    marginTop: "20%",
    height: Dimensions.get("screen").height * 0.1,
    width: Dimensions.get("screen").width * 0.8,
  },
  btn: {
    marginTop: "10%",
    width: Dimensions.get("screen").width * 0.1,
  },
  prefix: {
    fontSize: 20,
    color: "#030303",
    // marginTop: "10%",
    alignContent: "center",
    // marginTop: 30,
    marginLeft: 20,
    alignSelf: "center",
    // height: Dimensions.get("screen").height * 0.1,
    // width: Dimensions.get("screen").width * 0.2,
    paddingVertical: 10,
  },
  editText: {
    fontSize: 20,
    color: "#030303",
    // marginTop: "10%",
    alignContent: "center",
    alignSelf: "center",
    // height: Dimensions.get("screen").height * 0.1,
    // width: Dimensions.get("screen").width * 0.6,
    padding: 10,
  },

  options: {
    marginTop: "4%",
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "space-around",
  },
  rounded: {
    marginHorizontal: "2%",
    marginVertical: 10,
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#b5b5b3",
    flex: 1,
    borderRadius: 20,
    width: "5%",
    backgroundColor: "#fff",
  },

  appButtonContainer: {
    color: "#000",
    elevation: 4,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: "20%",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    // textTransform: "uppercase",
  },
});
