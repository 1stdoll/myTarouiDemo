const files = require.context('./models', false, /\.js$/)
const modules = files.keys().map(i => files(i).default);
// console.log("modules", modules)
export default [...modules];