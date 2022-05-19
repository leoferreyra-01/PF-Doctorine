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

// Syncing all the models at once

const syncConfig = { force: true }; // -FIX-

conn.sync(syncConfig).then(() => {
  server.listen(process.env.PORT, () => {
    // eslint-disable-line no-console
    console.log('°');
    console.log('°');
    console.log('°');
    console.log('<>----------[ Listening at', process.env.PORT, ']----------<>');
    console.log('-');
    console.log('Sync Config: ', syncConfig);
    console.log('-');
  });
});
