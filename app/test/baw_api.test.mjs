import {config } from "./test.config.mjs"

import {getToolkits,getApps,getInstance, executeService} from "../baw_api.mjs"
import { assert, expect, test } from 'vitest'

const account = config.account;

test('test get application', async () => {
    const res = await getApps(account);
  expect(res.data.processAppsList.length).greaterThan(1);
});

test('test get toolkits', async () => {
    const res = await getToolkits(account);
  expect(res.data.processAppsList.length).greaterThan(1);
});

test('test get instance', async () => {
    const res = await getInstance(account,config.instanceId);
    expect(res.data.piid.length).greaterThan(1);
});

test('test execute service', async () => {
    const res = await executeService(account,config.testService);
    assert.deepEqual(res.data.data,config.testOutput)
});