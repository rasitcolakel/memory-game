import React from "react";
import AppContainer from "../UI/AppContainer";
import { View } from "native-base";
import LevelToolbar from "../UI/LevelToolbar";
import GameGrid from "../UI/GameGrid";
import { useDispatch } from "react-redux";
import { levelActions } from "../../../store/slices/level";
import { initializeLevel, stopTimer } from "../../../store/actions/level";
import LevelResult from "../UI/LevelResult";

export default function Level({ route, navigation }) {
  const { level } = route.params;
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      dispatch(levelActions.initializeLevel());
      stopTimer();
    });
    return unsubscribe;
  }, [navigation]);
  const restartGame = () => {
    dispatch(initializeLevel(level));
  };
  return (
    <AppContainer>
      <View m={2} mx={10} flex={1}>
        <LevelResult level={level} />
        <LevelToolbar level={level} restartGame={restartGame} />
        <GameGrid level={level} />
      </View>
    </AppContainer>
  );
}
