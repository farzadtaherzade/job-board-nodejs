import { ClientResponse } from "../exeptions/clientResponse";

const ResponseHandler = (
  statusCode: number,
  success: boolean,
  data: any,
  error: any
) => {
  const response = new ClientResponse();
  response.success = success;
  response.statusCode = statusCode;
  response.data = data;
  response.message = error;

  return response;
};

export default ResponseHandler;
