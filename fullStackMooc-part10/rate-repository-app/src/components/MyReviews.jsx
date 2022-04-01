import React from "react";
import { FlatList } from "react-native";
import { ReviewItem, ItemSeparator } from "./Repository";
import useMyReviews from "../hooks/useMyReviews";

const MyReviews = () => {
  const { myReviews } = useMyReviews({ includeReviews: true });

  const reviews = myReviews ? myReviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem isMyReview review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
