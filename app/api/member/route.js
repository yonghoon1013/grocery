import { queryExecute } from "../route";

export async function GET() {
    const data = await queryExecute('select * from members');

	return Response.json(data);
}

export async function POST(req) {
    const data = await req.json();
    await queryExecute(`insert into members (id, nickname, password, email) values (?, ?, ?, ?)`, [data.id , data.nickname, data.password, data.email]);

    return Response.json([]);
}