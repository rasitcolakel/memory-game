import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";
const BASE_IMAGE_URL =
  "https://memorygamebucket105340-staging.s3.eu-central-1.amazonaws.com/public/";
export const createImageTable = (db) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists images (id integer primary key not null, url string, usageCount int, cached int);"
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const dropImageTableAndRecreate = (db) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("drop table images;");
    });
    createImageTable(db);
  } catch (e) {
    console.log(e);
  }
};

export const insertImage = (db, url) => {
  try {
    getImageByUrl(db, url).then((image) => {
      if (!image) {
        db.transaction((tx) => {
          tx.executeSql(
            "insert into images (url, usageCount, cached) values (?, ?, ?);",
            [url, 0, 0]
          );
        });
      } else {
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const getImagesFromDb = (db) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from images order by usageCount desc;",
          [],
          (tx, results) => {
            const images = [];
            for (let i = 0; i < results.rows.length; i++) {
              images.push(results.rows.item(i));
            }
            resolve(images);
          }
        );
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const getImageByUrl = (db, url) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from images where url = ?;",
          [url],
          (tx, results) => {
            resolve(results.rows.item(0));
          }
        );
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const setUsageCount = (db, url) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "update images set usageCount = usageCount + 1 where url = ?;",
        [url],
        (tx, results) => {}
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const setCacheStatus = (db, url, cached = 1) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "update images set cached = ? where url = ?;",
        [cached, url],
        (tx, results) => {}
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllImages = (db) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("delete from images;", [], (tx, results) => {});
    });
  } catch (e) {
    console.log(e);
  }
};

export const getNotCachedImages = (db) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from images where cached = 0;",
          [],
          (tx, results) => {
            const images = [];
            for (let i = 0; i < results.rows.length; i++) {
              images.push(results.rows.item(i));
            }
            resolve(images);
          }
        );
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const cacheAllImages = (db) => {
  try {
    getImagesFromDb(db).then((images) => {
      images.forEach(async (image) => {
        const url = BASE_IMAGE_URL + image.url;
        const name = shorthash.unique(url);
        const path = `${FileSystem.cacheDirectory}${name}`;
        const file = await FileSystem.getInfoAsync(path);
        if (file.exists) {
          setCacheStatus(db, file.url);
          return;
        }
        const newImage = await FileSystem.downloadAsync(url, path);
        setCacheStatus(db, image.url);
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const getImageFromCache = async (db, url) => {
  try {
    let image = await getImageByUrl(db, url);
    const name = shorthash.unique(BASE_IMAGE_URL + url);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const file = await FileSystem.getInfoAsync(path);
    if (!image) {
      db.transaction((tx) => {
        tx.executeSql(
          "insert into images (url, usageCount, cached) values (?, ?, ?);",
          [url, 0, 0]
        );
      });
    }
    if (file.exists) {
      return file.uri;
    } else {
      const newImage = await FileSystem.downloadAsync(url, path);
      setCacheStatus(db, image.url);
      return newImage.uri;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getRandomImages = (db, count) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from images order by usageCount asc limit ?;",
          [count],
          (tx, results) => {
            const images = [];
            for (let i = 0; i < results.rows.length; i++) {
              setUsageCount(db, results.rows.item(i).url);
              images.push(results.rows.item(i));
            }
            resolve(images);
          }
        );
      });
    });
  } catch (e) {
    console.log(e);
  }
};
