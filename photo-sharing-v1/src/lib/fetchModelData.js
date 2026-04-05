import models from "../modelData/models";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url The URL to issue the GET request.
 * @returns {Promise<any>} The JSON response, or a fallback model if fetch fails.
 */
async function fetchModel(url) {
  const endpoint = new URL(url, window.location.origin).pathname;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (endpoint === "/test/info") {
      return models.schemaInfo();
    }
    if (endpoint === "/user/list") {
      return models.userListModel();
    }
    if (endpoint.startsWith("/user/")) {
      return models.userModel(endpoint.replace("/user/", ""));
    }
    if (endpoint.startsWith("/photosOfUser/")) {
      return models.photoOfUserModel(endpoint.replace("/photosOfUser/", ""));
    }
    throw error;
  }
}

export default fetchModel;
