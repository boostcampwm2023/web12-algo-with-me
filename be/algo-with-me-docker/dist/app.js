"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_child_process_1 = __importDefault(require("node:child_process"));
const app = (0, express_1.default)();
const PORT = 5000;
const TIMEOUT_IN_MILLI = 10000;
app.post('/:competitionId/:userId/:problemId/:testcaseId', (req, res) => {
    const { competitionId, userId, problemId, testcaseId } = req.params;
    const responseJson = { result: '', competitionId, userId, problemId };
    const command = `/algo-with-me/node-sh/run.sh ${competitionId} ${userId} ${problemId} ${testcaseId}`;
    try {
        node_child_process_1.default.execSync(command, { timeout: TIMEOUT_IN_MILLI });
        responseJson.result = 'SUCCESS';
    }
    catch (error) {
        responseJson.result = error.code === 'ETIMEDOUT' ? 'TIMEOUT' : error.code;
    }
    res.send(JSON.stringify(responseJson));
});
app.listen(PORT, () => {
    console.log(`[algo-with-me-docker] listening at port ${PORT}`);
});
//# sourceMappingURL=app.js.map