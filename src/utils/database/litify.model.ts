import { ConnectionLitify } from "./conn";
import { QueryResult } from "jsforce";
import { sendDuplicateEmail } from "../email/email.utils";

export default class litify {
	static async apexGet<T = any>(path: string) {
		const conn = await ConnectionLitify.getConnection();

		return conn.apex.get<T>(path);
	}
	static async apexPost<T = any>(path: string, body?: any) {
		const conn = await ConnectionLitify.getConnection();

		return conn.apex.post<T>(path, body);
	}
	static async apexPut<T = any>(path: string, body?: any) {
		const conn = await ConnectionLitify.getConnection();

		return conn.apex.put<T>(path, body);
	}
	static async apexPatch<T = any>(path: string, body?: any) {
		const conn = await ConnectionLitify.getConnection();

		return conn.apex.patch<T>(path, body);
	}
	static async apexDelete<T = any>(path: string, body?: any) {
		const conn = await ConnectionLitify.getConnection();

		return conn.apex.delete<T>(path, body);
	}

	static async soqlFind<T = any>(soql: string) {
		const conn = await ConnectionLitify.getConnection();

		const records: T[] = [];
		let results: QueryResult<T> = await conn.query(soql);
		records.push(...results.records);

		while (!!results.nextRecordsUrl) {
			results = await conn.queryMore<T>(results.nextRecordsUrl);
			records.push(...results.records);
		}

		return records;
	}

	static async queryFind<T = any>(resource: string, query: any) {
		const conn = await ConnectionLitify.getConnection();

		return await conn
			.sobject(resource)
			.find<T>(query)
			.execute();
	}

	static async retrieve<T = any>(resource: string, id: string) {
		const conn = await ConnectionLitify.getConnection();

		return await conn.sobject<T>(resource).retrieve(id);
	}

	static async create<T = any>(resource: string, object: T): Promise<string> {
		const conn = await ConnectionLitify.getConnection();

		return new Promise((res, rej) => {
			conn.sobject<T>(resource).create(object, (err, ret) => {
				if (err || !ret.success) {
					if (err.name === "DUPLICATES_DETECTED") {
						sendDuplicateEmail(resource, object, err).finally(() => {
							console.log(`Error on create: ${err}`);
							rej(err);
						});
						return;
					} else {
						console.log(`Error on create: ${err}`);
						rej(err);
						return;
					}
				}
				console.log(`Created ${resource} id : ` + ret.id);
				res(ret.id);
			});
		});
	}

	static async update<T = any>(resource: string, object: T): Promise<string> {
		const conn = await ConnectionLitify.getConnection();

		return new Promise((res, rej) => {
			conn.sobject<T>(resource).update(object, (err, ret) => {
				if (err || !ret.success) {
					console.log(`Error on update: ${err}`);
					rej(err);
					return;
				}
				console.log(`Updated ${resource} id : ` + ret.id);
				res(ret.id);
			});
		});
	}

	static async delete<T = any>(resource: string, id: string) {
		const conn = await ConnectionLitify.getConnection();

		return await conn.sobject<T>(resource).delete(id);
	}
}
