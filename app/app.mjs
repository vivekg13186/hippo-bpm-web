import express from "express";
import * as db from "./database.mjs";
import * as bawService from "./baw_api.mjs";

const app = express();
app.use(express.json());
app.use(express.static("public"));

export default app;
db.initDatabase();
app.get("/version", (req, res) => {
  res.send(`Hippo BPM - version 1.0`);
});

app.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await db.getAllAccounts();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/accounts", async (req, res) => {
  try {
    const account = await db.insertAccount(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/accounts/:id", async (req, res) => {
  try {
    await db.deleteAccount(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/account/:id", async (req, res) => {
  try {
    const account = await db.getAccount(req.params.id);
    if (!account) {
      return res.sendStatus(404);
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /tests
app.get("/api/tests", async (req, res) => {
  try {
    const tests = await db.getAllTestService();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /tests
app.put("/api/tests", async (req, res) => {
  try {
    if (req.body.id) {
      console.log(req.body,"update")
      const testServiceModel = await db.updateTestService(req.body);
      res.status(201).json(testServiceModel);
    } else {
      const testServiceModel = await db.insertTestService(req.body);
      res.status(201).json(testServiceModel);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /tests/:id
app.delete("/api/tests/:id", async (req, res) => {
  try {
    await db.deleteTestService(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// GET /tests/:id
app.get("/api/tests/:id", async (req, res) => {
  try {
    const testServiceModel = await db.getTestService(req.params.id);
    if (!testServiceModel) {
      return res.sendStatus(404);
    }
    res.json(testServiceModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /apps
app.post("/api/apps", async (req, res) => {
  try {
    const result = await bawService.getApps(req.body);
    res.status(200).type("application/json").send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /toolkits
app.post("/api/toolkits", async (req, res) => {
  try {
    const result = await bawService.getToolkits(req.body);
    res.status(200).type("application/json").send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /instance/:instanceId
app.post("/api/instance/:instanceId", async (req, res) => {
  try {
    const result = await bawService.getInstance(
      req.body,
      req.params.instanceId
    );
    res.status(200).type("application/json").send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /snapshot
app.post("/api/snapshot", async (req, res) => {
  try {
    const result = await bawService.getSnapshotInfo(
      req.body.account,
      req.body.snapshotId
    );

    res.status(200).type("application/json").send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /executeService
app.post("/api/executeService", async (req, res) => {
  try {
    const { account, testService } = req.body;

    const result = await bawService.executeService(account, testService);
    res.status(200).type("application/json").send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
