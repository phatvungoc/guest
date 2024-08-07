"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
const port = process.env.PORT;
// Tạo kết nối đến cơ sở dữ liệu
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Datbeo@0025',
    database: 'guest'
});
app.use(express_1.default.json());
app.post('/visitors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, visit_date, check_in_time, check_out_time, purpose } = req.body;
    try {
        const [result] = yield db.query('INSERT INTO visitors (name, email, phone, visit_date, check_in_time, check_out_time, purpose) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, phone, visit_date, check_in_time, check_out_time, purpose]);
        res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        console.error('Error inserting visitor: ', error);
        res.status(500).send('Error inserting visitor');
    }
}));
app.post('/security_policies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { visitor_id, allow_entry, allow_photos } = req.body;
    try {
        const [result] = yield db.query('INSERT INTO security_policies (visitor_id, allow_entry, allow_photos) VALUES (?, ?, ?)', [visitor_id, allow_entry, allow_photos]);
        res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        console.error('Error inserting security policy: ', error);
        res.status(500).send('Error inserting security policy');
    }
}));
app.post('/approvals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { policy_id, approved_by, approval_date, notes } = req.body;
    try {
        const [result] = yield db.query('INSERT INTO approvals (policy_id, approved_by, approval_date, notes) VALUES (?, ?, ?, ?)', [policy_id, approved_by, approval_date, notes]);
        res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        console.error('Error inserting approval: ', error);
        res.status(500).send('Error inserting approval');
    }
}));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
