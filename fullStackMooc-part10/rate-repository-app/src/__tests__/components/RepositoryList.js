import React from "react";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { render } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      expect(getAllByTestId("repositoryFullName")[0]).toHaveTextContent(
        "jaredpalmer/formik"
      );
      expect(getAllByTestId("repositoryAvatar")[0]).toHaveProp("source", {
        uri: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      });
      expect(getAllByTestId("repositoryDescription")[0]).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(getAllByTestId("repositoryLang")[0]).toHaveTextContent(
        "TypeScript"
      );
      expect(getAllByTestId("summaryItemValue")[0]).toHaveTextContent("21.9 k");
      expect(getAllByTestId("summaryItemValue")[1]).toHaveTextContent("1.6 k");
      expect(getAllByTestId("summaryItemValue")[2]).toHaveTextContent("3");
      expect(getAllByTestId("summaryItemValue")[3]).toHaveTextContent("88");

      expect(getAllByTestId("repositoryFullName")[1]).toHaveTextContent(
        "async-library/react-async"
      );
      expect(getAllByTestId("repositoryAvatar")[1]).toHaveProp("source", {
        uri: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      });
      expect(getAllByTestId("repositoryDescription")[1]).toHaveTextContent(
        "Flexible promise-based React data loader"
      );
      expect(getAllByTestId("repositoryLang")[1]).toHaveTextContent(
        "JavaScript"
      );
      expect(getAllByTestId("summaryItemValue")[4]).toHaveTextContent("1.8 k");
      expect(getAllByTestId("summaryItemValue")[5]).toHaveTextContent("69");
      expect(getAllByTestId("summaryItemValue")[6]).toHaveTextContent("3");
      expect(getAllByTestId("summaryItemValue")[7]).toHaveTextContent("72");
    });
  });
});
