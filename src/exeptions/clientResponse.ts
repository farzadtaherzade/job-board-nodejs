export class ClientResponse extends Error {
  success: boolean;
  statusCode: number;
  data: any;
  message: any;
}
