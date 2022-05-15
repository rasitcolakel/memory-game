import { Text } from "react-native";
import React from "react";
import AppContainer from "../UI/AppContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollections,
  getCompletedCollections,
} from "../../../store/actions/collections";
import CollectionCard from "../UI/CollectionCard";
import { FlatList } from "native-base";

export default function Collections({ navigation }) {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.contents);

  React.useEffect(() => {
    fetch();
  }, []);
  const fetch = () => {
    dispatch(getCollections(true)).then(() => {
      dispatch(getCompletedCollections());
    });
  };
  const loadMore = async () => {
    if (collections.loading) return;
    if (collections.nextToken !== null) {
      dispatch(getCollections()).then(() => {
        dispatch(getCompletedCollections());
      });
    }
  };
  return (
    <AppContainer>
      <FlatList
        data={collections.data}
        renderItem={({ item }) => <CollectionCard collection={item} />}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        onRefresh={() => fetch()}
        refreshing={collections.loading}
        style={{
          flex: 1,
          flexDirection: "column",
          marginHorizontal: 60,
        }}
        numColumns={3}
      />
    </AppContainer>
  );
}
