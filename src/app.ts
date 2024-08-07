import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

// Tạo kết nối đến cơ sở dữ liệu
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Datbeo@0025',
  database: 'guest'
});

app.use(express.json());

// Route để lấy danh sách khách
app.get('/get-visitors', async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM visitors');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching visitors: ', error);
    res.status(500).send('Error fetching visitors');
  }
});

app.post('/visitors', async (req: Request, res: Response) => {
  const { name, email, phone, visit_date, check_in_time, check_out_time, purpose } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO visitors (name, email, phone, visit_date, check_in_time, check_out_time, purpose) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, visit_date, check_in_time, check_out_time, purpose]
    );
    res.status(201).json({ id: (result as any).insertId });
  } catch (error) {
    console.error('Error inserting visitor: ', error);
    res.status(500).send('Error inserting visitor');
  }
});

app.post('/security_policies', async (req: Request, res: Response) => {
  const { visitor_id, allow_entry, allow_photos } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO security_policies (visitor_id, allow_entry, allow_photos) VALUES (?, ?, ?)',
      [visitor_id, allow_entry, allow_photos]
    );
    res.status(201).json({ id: (result as any).insertId });
  } catch (error) {
    console.error('Error inserting security policy: ', error);
    res.status(500).send('Error inserting security policy');
  }
});

app.post('/approvals', async (req: Request, res: Response) => {
  const { policy_id, approved_by, approval_date, notes } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO approvals (policy_id, approved_by, approval_date, notes) VALUES (?, ?, ?, ?)',
      [policy_id, approved_by, approval_date, notes]
    );
    res.status(201).json({ id: (result as any).insertId });
  } catch (error) {
    console.error('Error inserting approval: ', error);
    res.status(500).send('Error inserting approval');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});