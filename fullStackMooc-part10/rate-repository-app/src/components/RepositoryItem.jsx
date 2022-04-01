import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useHistory } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 5,
  },
  avatar: {
    margin: 10,
    width: 45,
    height: 45,
    borderRadius: 2,
  },
  description: {
    width: 0.8 * Dimensions.get('window').width,
    flexWrap: 'wrap'
  },
  flexRow: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  button: {
    textAlign: "center",
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 4,
    borderRadius: 4,
  },
  githubOpenBtn: {
    fontSize: 20,
    padding: 15,
    margin: 5,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  summaryItem: {
    padding: 10,
  },
});

const SummaryItem = ({ item }) => {
  const parseValue = (value) => {
    if (value > 1000) {
      return `${(value / 1000).toFixed(1)} k`;
    }
    return value;
  };

  return (
    <View style={styles.summaryItem}>
      <Text color="textSecondary">{item.label}</Text>
      <Text testID="summaryItemValue">{parseValue(item.value)}</Text>
    </View>
  );
};

const RepositoryItem = ({ item, single }) => {
  const history = useHistory();

  const summary = [
    { label: "Stars", value: item.stargazersCount },
    { label: "Forks", value: item.forksCount },
    { label: "Reviews", value: item.reviewCount },
    { label: "Rating", value: item.ratingAverage },
  ];

  const onRepoPress = (id) => {
    history.push(`repositories/${id}`);
  };
  const openGithub = (url) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity disabled={single} onPress={() => onRepoPress(item.id)}>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Image
            testID="repositoryAvatar"
            source={{ uri: item.ownerAvatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.spaceBetween}>
            <Text
              testID="repositoryFullName"
              fontSize="subheading"
              fontWeight="bold"
            >
              {item.fullName}
            </Text>
            <Text style={styles.description} testID="repositoryDescription" color="textSecondary">
              {item.description}
            </Text>   
            <View style={styles.flexRow}>
              <TouchableWithoutFeedback>
                <Text testID="repositoryLang" style={styles.button}>
                  {item.language}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={styles.summary}
          contentContainerStyle={styles.summary}
          data={summary}
          renderItem={SummaryItem}
        ></FlatList>
        {single ? (
          <TouchableOpacity onPress={() => openGithub(item.url)}>
            <Text style={[styles.button, styles.githubOpenBtn]}>
              Open in GitHub
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;
