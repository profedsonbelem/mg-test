/** @todo fix aditionalInfo (should be additionalInfo)
 * @todo change order of params in _400
 */
export const Responses = {
	_200: (
		message: string,
		aditionalInfo: any = {},
		statusCode: number = 200
	) => {
		return {
			statusCode,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			},
			body: JSON.stringify({
				message,
				aditionalInfo,
			}),
		};
	},

	_400: (
		message: string,
		statusCode: number = 400,
		aditionalInfo: any = {}
	) => {
		return {
			statusCode,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			},
			body: JSON.stringify({
				message,
				aditionalInfo,
			}),
		};
	},

	_500: (message: string, status = 500) => {
		return {
			statusCode: status,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			},
			body: JSON.stringify({
				message,
			}),
		};
	},
};

interface Response {
	statusCode: number;
	data: any;
	error?: {
		code?: number;
		message?: string;
	};
}

export const Response = ({ data, statusCode, error = {} }: Response) => {
	return {
		statusCode,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
		},
		body: JSON.stringify({
			data,
			error,
		}),
	};
};
