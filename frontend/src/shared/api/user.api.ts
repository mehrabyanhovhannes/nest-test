import { UserModel } from '../models/signModel';
import { Api } from './api';

const apiURI = 'http://localhost:3000';

export class UserApi extends Api {
   public static login(data: {username: string; password: string}) {
      return fetch(
         `${apiURI}/login`,
         UserApi.createHeaders(false, 'POST', data),
      )
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }

   public static register(data: Partial<UserModel>) {
      return fetch(`${apiURI}/registration`, UserApi.createHeaders(false, 'POST', data))
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }

   public static getLogedInUser = () => {
      return fetch(`${apiURI}/me`, UserApi.createHeaders(true))
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }

   public static getAllUsers = () => {
      return fetch(`${apiURI}/all`, UserApi.createHeaders(true))
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }
}
