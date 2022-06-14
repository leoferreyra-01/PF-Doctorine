//
//                            ^7?YJ     75?7~
//                          JP~^:        :^~Y5.
//                         :#^              .#~
//                          B!              ^#:
//                          JP              JP
//                          ^#:             B!
//                           G7            ~#.
//           .^^^.           ?P            Y5
//          7YYPYY?          :#:           B!
//         ~G?@@@?G~          P?          ~B
//          JP&GPYY           Y&~        .BB
//          J5!!!^            !@P        ?@Y
//         5Y                  Y@5:    :J@G.
//        J5                    7B#G5YP##J.
//       :B^                     .^~J#!^.
//       ~B                         ?5
//       ^B.                       .B~
//        P?                       YY
//        :P?                     JP.
//         .JY~.                :YY.
//           ^JY7~:.         .^?5!
//             .~?JJ?7!!!!!7?J?~.
//                 .:^~~!~~^:.
//
//|+|~~~~~~~~~~~~~~~DOCTORINE~~~~~~~~~~~~~~~~~~~~~~

const server = require('./src/server.js');
const { conn } = require('./src/db.js');
const { preload_db } = require('./preload_db/');

// Syncing all the models at once



const syncConfig = { force: false }; // -FIX-
const PORT = parseInt(process.env.PORT);

conn.sync(syncConfig).then(() => {
  server.listen(PORT, async () => {
    // eslint-disable-line no-console
    console.log('°');
    console.log('°');
    console.log('°');
    console.log('<>----------[ Listening at', PORT, ']----------<>');
    console.log('-');
    console.log('\x1b[31m%s\x1b[0m', 'Sync Config: ', syncConfig);
    console.log('-');

    if (syncConfig.force === true) await preload_db();
  });
});
