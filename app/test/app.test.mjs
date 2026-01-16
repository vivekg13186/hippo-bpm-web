import { describe, it, expect, vi, assert, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.mjs";
import { config} from "./test.config.mjs";
 import fs from "fs";

 
import * as bawService from "../baw_api.mjs";


describe("Express API Tests", () => {
   beforeAll(()=>{
    if(fs.existsSync("../data/hippo-bpm-web.db"))
    fs.rmSync("../data/hippo-bpm-web.db");
   })

  it("GET /version", async () => {
    const res = await request(app).get("/version");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Hippo BPM");
  });

  it("GET /api/accounts", async () => {
    

    const res = await request(app).get("/api/accounts");

    expect(res.status).toBe(200);
    expect(res.body.length).greaterThan(1);
  });

  it("PUT /api/accounts", async () => {
   

    const res = await request(app)
      .put("/api/accounts")
      .send({
        title :"demo",
        username: "hello",
        password : "hello",
        type :"zen"
      });
   assert(res.body.title,"demo");
  });

  it("DELETE /api/accounts/:id", async () => {
    const res = await request(app).delete("/api/accounts/1");
    expect(res.status).toBe(204);
  });

  it("GET /api/account/:id - 404", async () => {
     

    const res = await request(app).get("/api/account/99");

    expect(res.status).toBe(404);
  });

  it("GET /api/tests", async () => {
 

    const res = await request(app).get("/api/tests");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("POST /api/apps", async () => {
     

    const res = await request(app)
      .post("/api/apps")
      .send({ username: "admin" });

    expect(res.status).toBe(200);
    expect(bawService.getApps).toHaveBeenCalled();
  });

  it("POST /api/executeService", async () => {
    

    const res = await request(app)
      .post("/api/executeService")
      .send({
        account: config.account,
        testService: config.testService
      });

    expect(res.status).toBe(200);
    expect(bawService.executeService).toHaveBeenCalled();
  });
});
