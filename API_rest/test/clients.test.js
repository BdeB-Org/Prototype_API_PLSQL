import request from "supertest";
import { describe, it, expect } from "@jest/globals"; 
import http from "../server/serveur-APIv3.js"; 

describe("API Tests for Clients", () => {
  it("GET /clients/:id - Should retrieve a client", async () => {
    const res = await request(http).get("/clients/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("NOM");
  });

  it("POST /clients - Should insert a new client", async () => {
    const res = await request(http)
      .post("/clients")
      .send({
        NOM: "Test",
        PRENOM: "Utilisateur",
        EMAIL: "test@test.com",
        TELEPHONE: "1234567890",
        ADRESSE: "123 rue test",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
  });

  it("PUT /clients/:id - Should update a client", async () => {
    const res = await request(http)
      .put("/clients/1")
      .send({
        NOM: "Modifié",
        PRENOM: "Utilisateur",
        EMAIL: "modifie@test.com",
        TELEPHONE: "0987654321",
        ADRESSE: "456 rue modifiée",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
  });

  it("DELETE /clients/:id - Should delete a client", async () => {
    const res = await request(http).delete("/clients/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
  });
});
