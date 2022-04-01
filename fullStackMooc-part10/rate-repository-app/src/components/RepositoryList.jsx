import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import SortPrinciple from "./SortPrinciple";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [value] = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (value) {
      props.setSortPrinciple(value);
    } else {
      props.setSortPrinciple("latest");
    }
  }, [value]);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <SortPrinciple {...props} />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        sortPrinciple={props.sortPrinciple}
        setSortPrinciple={props.setSortPrinciple}
      />
    );
  };

  render() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={
          this.props.repositories
            ? this.props.repositories.edges.map((edge) => edge.node)
            : []
        }
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem single={false} item={item} />}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortPrinciple, setSortPrinciple] = useState("latest");
  const { repositories, fetchMore } = useRepositories(sortPrinciple);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      sortPrinciple={sortPrinciple}
      setSortPrinciple={setSortPrinciple}
      repositories={repositories}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
