import { beforeEach, describe, expect, it } from "vitest";
import { db } from "./emailList.js";

const BASE_URI = "http://localhost:3000/";

const makeRequest = (options) => fetch(`${BASE_URI}bast/subscribe`, options);

beforeEach(() => {
  db.exec("DELETE FROM unverified_list");
  db.exec("DELETE FROM verified_list");
});

describe("subscribing", () => {
  it("should reject missing input", async () => {
    const response = await makeRequest({
      method: "post",
      body: "",
    });
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(true);
    expect(jsonResponse.response).toBe("INVALID_EMAIL");
  });

  it("should reject empty input", async () => {
    const response = await makeRequest({
      method: "post",
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
      method: "post",
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
      method: "post",
      body: JSON.stringify({
        email: "_test-@email.mail",
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
        email: "user@email.mail",
      }),
    });
    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.isError).toBe(false);
    expect(jsonResponse.response).toBe("SUBSCRIBED");
  });
});
