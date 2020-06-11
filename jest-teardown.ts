import { closeDb } from "./__test__/fixtures/db";

export default async function () {
  console.log("TEARING DOWN!!");
  await closeDb();
}
