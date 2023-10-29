import { app } from "app";
import { db } from "config/database";

export function startServer() {
  const port = process.env.PORT || 80;

  db.initialize()
    .then(() => {
      console.log("Database initialized");
      app.listen(port, () => console.log("Server started on port: ", port));
    })
    .catch((error) => {
      console.error("Error during Data Source initialization:", error);
    });
}

startServer();
