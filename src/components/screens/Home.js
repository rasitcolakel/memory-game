import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppContainer from "../UI/AppContainer";
import { getCompletedLevels, getLevels } from "../../../store/actions/levels";
import { getImages } from "../../../store/actions/image";
import { FlatList, StatusBar, Text, View } from "native-base";
import LevelCard from "../UI/LevelCard";
import { openDatabase } from "../../../store/database";
import {
  cacheAllImages,
  removeDuplicatedImages,
} from "../../../store/database/images";
const db = openDatabase();
export default function Home({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = 140;

  const dispatch = useDispatch();
  const { data, loading, nextToken } = useSelector(
    (state) => state.contents.levels
  );

  useEffect(() => {
    cacheAllImages(db);
    removeDuplicatedImages(db);
    dispatch(getCompletedLevels());
  }, []);

  React.useEffect(() => {
    dispatch(getImages(true));
    if (data) return;
    dispatch(getLevels(true));
  }, []);

  const loadMore = () => {
    if (loading) return;
    if (nextToken !== null) {
      dispatch(getLevels());
      dispatch(getCompletedLevels());
    }
  };

  return (
    <AppContainer>
      <View
        style={{
          flex: 1,
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: StatusBar.currentHeight || 0,
        }}
      >
        <Text>User 123456</Text>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <LevelCard
              level={item}
              key={item.id}
              isPrevLevelCompleted={
                index === 0 ||
                index === 1 ||
                data[index - 1]?.completed !== null ||
                data[index - 2]?.completed !== null
              }
              width={cardWidth}
            />
          )}
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          onRefresh={() => dispatch(getLevels(true))}
          refreshing={loading}
          style={{
            flex: 1,
            flexDirection: "column",
            marginHorizontal: 20,
          }}
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
          }}
          numColumns={Math.floor(windowWidth / cardWidth)}
        />
      </View>
    </AppContainer>
  );
}
