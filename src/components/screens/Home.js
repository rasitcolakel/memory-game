import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppContainer from "../UI/AppContainer";
import { getCompletedLevels, getLevels } from "../../../store/actions/levels";
import { getImages } from "../../../store/actions/image";
import { StatusBar } from "native-base";
import LevelCard from "../UI/LevelCard";
import { openDatabase } from "../../../store/database";
import {
  cacheAllImages,
  createImageTable,
  getImagesFromDb,
} from "../../../store/database/images";
const db = openDatabase();
export default function Home() {
  const { orientation } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { data, nextToken, loading } = useSelector(
    (state) => state.contents.levels
  );
  useEffect(() => {
    createImageTable(db);
    cacheAllImages(db);
    dispatch(getCompletedLevels());
  }, []);
  React.useEffect(() => {
    dispatch(getImages(true));
    if (data) return;
    dispatch(getLevels(true));
  }, []);
  const loadMore = () => {
    dispatch(getLevels());
  };
  return (
    <AppContainer>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: StatusBar.currentHeight || 0,
          marginHorizontal: 20,
        }}
      >
        {data &&
          data.map((item, index) => (
            <LevelCard
              level={item}
              key={item.id}
              isPrevLevelCompleted={
                index === 0 ||
                index === 1 ||
                data[index - 1]?.completed !== null ||
                data[index - 2]?.completed !== null
              }
            />
          ))}
      </ScrollView>
    </AppContainer>
  );
}
