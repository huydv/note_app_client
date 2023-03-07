import { graphQLRequest } from "./request";

export const folderLoader = async () => {
  const query = `query Folders {
                folders {
                  createdAt
                  id
                  name
                }
              }`;
  const data = await graphQLRequest({ query });

  return data;
};

export const addNewFolder = async (newFolder) => {
  console.log("newFolder", newFolder);
  const query = `mutation Mutation($name: String!) {
  addFolder(name: $name) {
    name
    author {
      name
    }
  }
}`;

  const data = await graphQLRequest({
    query,
    variables: {
      name: newFolder.name,
    },
  });
  return data;
};
