export const createCompletedCollectionsTable = (db) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists completed_collections
        (id integer primary key not null, collection_id string, user_id, item_id string);`
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const dropCompletedCollectionsTableAndRecreate = (db) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("drop table completed_collections;");
    });
    createCompletedCollectionsTable(db);
  } catch (e) {
    console.log(e);
  }
};

export const clearCompletedCollections = (db) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("delete from completed_collections;");
    });
  } catch (e) {
    console.log(e);
  }
};

export const insertCompletedCollection = (db, level) => {
  try {
    console.log("insertCompletedCollection", level);
    db.transaction((tx) => {
      tx.executeSql(
        `insert into completed_collections (item_id, collection_id, user_id)
                values (?, ?, ?)`,
        [level.id, level.collectionID, level.userID]
      );
    });
  } catch (e) {
    console.log(e);
  }
};
export const getCompletedCollectionsFromDB = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from completed_collections`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.log("error", error);
          reject(error);
        }
      );
    });
  });
};
