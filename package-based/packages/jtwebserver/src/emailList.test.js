import { describe, expect, it } from "vitest";
import { TEST_EMAIL } from "./emailList";

const PORT = 3000;
const BASE_URI = `http://localhost:${PORT}/`;

const makeRequest = (options) => fetch(`${BASE_URI}bast/subscribe`, options);

describe("subscribing", () => {
  it("should reject missing input", async () => {
    const response = await makeRequest({
      method: "POST",
      body: "",
    });
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(true);
    expect(jsonResponse.response).toBe("INVALID_EMAIL");
  });

  it("should reject empty input", async () => {
    const response = await makeRequest({
      method: "POST",
      body: JSON.stringify({
        email: "",
      }),
    });
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(true);
    expect(jsonResponse.response).toBe("INVALID_EMAIL");
  });

  it("should reject bogus input", async () => {
    const response = await makeRequest({
      method: "POST",
      body: JSON.stringify({
        email: "i2jo2j3/ 303 -20 3nfn/a/slk2@jfioj11!",
      }),
    });
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(true);
    expect(jsonResponse.response).toBe("INVALID_EMAIL");
  });

  it("should reject bogus email", async () => {
    const response = await makeRequest({
      method: "POST",
      body: JSON.stringify({
        email: "test @email.net",
      }),
    });
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(true);
    expect(jsonResponse.response).toBe("INVALID_EMAIL");
  });

  it("should accept valid email", async () => {
    const response = await makeRequest({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
      }),
    });
    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(false);
    expect(jsonResponse.response).toBe("SUBSCRIBE");
  });
});
