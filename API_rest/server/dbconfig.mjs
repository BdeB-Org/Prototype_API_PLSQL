export default {
    user: process.env.NODE_ORACLEDB_USER || "commande",
    password: process.env.NODE_ORACLEDB_PASSWORD || "oracle",
    connectString: "127.0.0.1/freepdb1",
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
  };