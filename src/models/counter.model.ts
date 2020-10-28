import { Counters } from "../types/counter";
import db from "../utils/database/db.model";

/** Static class to work with counters */
export class CounterModel {
  static async getCounter(collection: string): Promise<Counters> {
    console.log("GET COUNTER OF " + collection + " collection");
    const counter = await db.retrieve<Counters>("Counters", {
      _id: collection,
    });
    if (counter.length == 0) {
      throw new Error("Couldn't find counter for" + collection);
    }
    return counter[0];
  }

  static async updateCounter(collection: string) {
    console.log("UPDATE Counter", collection);
    return db.update(
      "Counters",
      { _id: collection },
      { $inc: { count: 1 } },
      false
    );
  }
}
