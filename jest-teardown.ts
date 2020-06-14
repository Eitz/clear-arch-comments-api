import { closeDb } from "./__test__/fixtures/db";

export default async function () {
  await closeDb();
}
