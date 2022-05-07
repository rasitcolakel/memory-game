import { Text } from "react-native";
import React from "react";
import AppContainer from "../UI/AppContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../../store/actions/collections";
import CollectionCard from "../UI/CollectionCard";
import { FlatList } from "native-base";

export default function Collections() {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.contents);

  React.useEffect(() => {
    dispatch(getCollections(true));
  }, []);
  const loadMore = async () => {
    if (collections.loading) return;
    if (collections.nextToken !== null) {
      dispatch(getCollections());
    }
  };
  return (
    <AppContainer>
      <FlatList
        data={collections.data}
        renderItem={({ item }) => <CollectionCard collection={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onRefresh={() => dispatch(getCollections(true))}
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
