import pkg from "@google-cloud/bigquery";
const { BigQuery } = pkg;

const bigquery = new BigQuery();

export const runQuery = async (query) => {
  const [rows] = await bigquery.query({
    query,
    location: "US"
  });

  return rows;
};