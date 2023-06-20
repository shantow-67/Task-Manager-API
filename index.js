const app = require("./app")
require("dotenv").config();

const port =process.env.PORT

app.listen(port, () => {
    console.log(`server listening at port no ${port}`);
});