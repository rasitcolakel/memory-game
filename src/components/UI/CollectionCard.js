import { useNavigation } from "@react-navigation/native";
import { Text, Box, Image, Pressable } from "native-base";
import React from "react";
import { openDatabase } from "../../../store/database";
import { getImageFromCache } from "../../../store/database/images";
const db = openDatabase();

export default function CollectionCard({ collection }) {
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    getCoverImage(collection.id);
  }, []);
  const getCoverImage = async () => {
    let image = collection?.images?.items[0].image;
    if (image) {
      getImageFromCache(db, image.url).then((imageData) => {
        setImage(imageData);
      });
    }
  };
  if (!image) return null;
  return (
    <Pressable
      p="2"
      width="1/3"
      onPress={() =>
        navigation.push("Collection", {
          collection: { ...collection, type: "collection" },
        })
      }
    >
      <Box>
        <Box
          w="100%"
          alignItems="center"
          justifyContent="center"
          backgroundColor="warmGray.100"
          pt="3"
          borderRadius="xl"
          opacity={collection?.completed ? 1 : 0.8}
        >
          <Box>
            <Image
              src={image}
              width="100px"
              height="100px"
              alt={collection.title}
              style={{ tintColor: "gray" }}
            />
            <Image
              src={image}
              width="100px"
              height="100px"
              alt={collection.title}
              style={{
                position: "absolute",
                opacity: collection?.completed ? 1 : 0.05,
              }}
            />
          </Box>
          <Text
            fontSize={{
              base: "md",
              md: "xl",
              lg: "2xl",
            }}
            py={3}
          >
            {collection?.title}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
