// const person = () => {
//   this.status = "Beautiful Butterfly";
//   this.annoyed = true;
// };
// const eric = person => {
//   const trivia = {
//     rambler: true
//   };
//   this.trivia = trivia;
//   delete this.annoyed;
//   const code = () => {
//     console.log("zzzzzz");
//   };
// };
//
// const me = eric(new Person());
//
// while (true) {
//   me.code;
// }

const moment = require("moment");
var a = moment("2016-01-01").startOf("year");
var u = moment.utc("2016-01-01").startOf("year");
console.log(a.valueOf() === u.valueOf());
// var b = moment(`2016-01-01`).endOf("year")
// moment("aapl");
// try {
//   console.log(moment("aapl").isValid());
// } catch (e) {
//   console.log("eerorr");
// } finally {
// }
// console.log("things");
// var query = {
//   owner: "defunkt",
//   repo: "assignment_node_dictionary_reader"
// };
// const thing = async () => {
//   var query = {
//     owner: "defunkt",
//     repo: "assignment_node_dictionary_reader"
//   };
//   let commit;
//   try {
//     commit = await github.repos.getCommits(query);
//   } catch (e) {
//     throw e;
//   }
//   fs.writeFileSync(
//     "../data/message.txt",
//     JSON.stringify(Object.assign({}, query)),
//     null,
//     2
//   );
// };
//
// github.repos.getCommits(query, function(err, res) {
//   if (err) throw err;
//
//   var commitFeed = res.data.map(data => {
//     return {
//       message: data.commit.message,
//       author: data.commit.author,
//       url: data.commit.tree.url,
//       sha: data.commit.tree.sha
//     };
//   });
//   commit[query.owner] = {
//     [query.repo]: commitFeed
//   };
//   fs.writeFileSync("../data/message.txt", JSON.stringify(commitObj, null, 2));
// });

/////
