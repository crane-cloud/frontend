import axios from "../../axios";
import {
  handlePostRequestWithDataObject,
  handlePostRequestWithOutDataObject,
  handleGetRequest,
  handlePatchRequest,
  handleDeleteRequest,
} from "../apis";

jest.mock("../../axios"); // Mocking axios module

describe("API functions", () => {
  const endpoint = "/test-endpoint";
  const data = { key: "value" };
  const response = { data: "response data" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handlePostRequestWithDataObject", () => {
    it("should make a POST request with data object and resolve with response", async () => {
      axios.post.mockResolvedValueOnce(response);

      await expect(handlePostRequestWithDataObject(data, endpoint)).resolves.toEqual(response);

      expect(axios.post).toHaveBeenCalledWith(endpoint, { data });
    });

    it("should reject with an error if the POST request fails", async () => {
      const error = new Error("Request failed");
      axios.post.mockRejectedValueOnce(error);

      await expect(handlePostRequestWithDataObject(data, endpoint)).rejects.toThrow(error);

      expect(axios.post).toHaveBeenCalledWith(endpoint, { data });
    });
  });

  describe("handlePostRequestWithOutDataObject", () => {
    it("should make a POST request with data and resolve with response", async () => {
      axios.post.mockResolvedValueOnce(response);

      await expect(handlePostRequestWithOutDataObject(data, endpoint)).resolves.toEqual(response);

      expect(axios.post).toHaveBeenCalledWith(endpoint, data);
    });

    it("should reject with an error if the POST request fails", async () => {
      const error = new Error("Request failed");
      axios.post.mockRejectedValueOnce(error);

      await expect(handlePostRequestWithOutDataObject(data, endpoint)).rejects.toThrow(error);

      expect(axios.post).toHaveBeenCalledWith(endpoint, data);
    });
  });

  describe("handleGetRequest", () => {
    it("should make a GET request and resolve with response", async () => {
      axios.get.mockResolvedValueOnce(response);

      await expect(handleGetRequest(endpoint)).resolves.toEqual(response);

      expect(axios.get).toHaveBeenCalledWith(endpoint);
    });

    it("should reject with an error if the GET request fails", async () => {
      const error = new Error("Request failed");
      axios.get.mockRejectedValueOnce(error);

      await expect(handleGetRequest(endpoint)).rejects.toThrow(error);

      expect(axios.get).toHaveBeenCalledWith(endpoint);
    });
  });

  describe("handlePatchRequest", () => {
    it("should make a PATCH request with data and resolve with response", async () => {
      axios.patch.mockResolvedValueOnce(response);

      await expect(handlePatchRequest(endpoint, data)).resolves.toEqual(response);

      expect(axios.patch).toHaveBeenCalledWith(endpoint, data);
    });

    it("should reject with an error if the PATCH request fails", async () => {
      const error = new Error("Request failed");
      axios.patch.mockRejectedValueOnce(error);

      await expect(handlePatchRequest(endpoint, data)).rejects.toThrow(error);

      expect(axios.patch).toHaveBeenCalledWith(endpoint, data);
    });
  });

  describe("handleDeleteRequest", () => {
    it("should make a DELETE request with data and resolve with response", async () => {
      axios.delete.mockResolvedValueOnce(response);

      await expect(handleDeleteRequest(endpoint, data)).resolves.toEqual(response);

      expect(axios.delete).toHaveBeenCalledWith(endpoint, data);
    });

    it("should reject with an error if the DELETE request fails", async () => {
      const error = new Error("Request failed");
      axios.delete.mockRejectedValueOnce(error);

      await expect(handleDeleteRequest(endpoint, data)).rejects.toThrow(error);

      expect(axios.delete).toHaveBeenCalledWith(endpoint, data);
    });
  });
});
