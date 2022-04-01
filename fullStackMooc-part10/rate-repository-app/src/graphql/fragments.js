import { gql } from "apollo-boost";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    ownerAvatarUrl
  }
`;
