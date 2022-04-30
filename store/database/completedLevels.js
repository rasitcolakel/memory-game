import { openDatabase } from ".";

export const createCompletedLevelsTable = (db) => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists completed_levels 
        (id integer primary key not null,
         level_id string, user_id, rate int);`
            );
        });
    } catch (e) {
        console.log(e);
    }
};

export const dropCompletedLevelsTableAndRecreate = (db) => {
    try {
        db.transaction((tx) => {
            tx.executeSql("drop table completed_levels;");
        });
        createCompletedLevelsTable(db);
    } catch (e) {
        console.log(e);
    }
};

export const clearCompletedLevels = (db) => {
    try {
        db.transaction((tx) => {
            tx.executeSql("delete from completed_levels;");
        });
    } catch (e) {
        console.log(e);
    }
};

export const insertCompletedLevel = (db, level) => {
    try {
        console.log("inserted")
        db.transaction((tx) => {
            tx.executeSql(
                `insert into completed_levels (level_id, user_id, rate)
                values (?, ?, ?)`,
                [level.levelID, level.userID, level.rate]
            );
        });
    } catch (e) {
        console.log(e);
    }
};



// export const getCompletedLevelsFromDB = async (db) => {
//     db.transaction(tx => {
//         tx.executeSql('SELECT * FROM completed_levels;', [], (tx, results) => {
//             const { rows } = results;
//             let users = [];
//             console.log("rows", rows);
//             for (let i = 0; i < rows.length; i++) {
//                 users.push({
//                     ...rows.item(i),
//                 });
//             }

//             resolve(users);

//         });
//     });

// }


export const getCompletedLevelsFromDB = (db) => {
    try {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM completed_levels;",
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