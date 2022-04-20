import { getToken } from "../helpers/helper";

interface Options {
	method: string;
	headers?: {
		'content-type': string;
      Authorization?: string
	};
	body?: string;
}

export class Api {
   public static createHeaders(
      secure: boolean = true,
      method: string = 'get',
      body: any = null
   ) {
      const options: Options = {
         method
      };
      const headers: any = {};

      if(secure) {
         headers.Authorization = `Bearer ${getToken()}`;
      }
      headers['content-type'] = 'application/json';
      options.headers = headers;
      if (body) options.body = JSON.stringify(body);
      return options;
   }

   public static handleError(error: any) {
      return {
         error: true,
         errorInfo: error,
      };
   }

   public static async handleResponse(response: any) {
      return response.json();
   }
}
