import { queryExecute } from "../route";

export async function GET(req) {
    const qData = Object.fromEntries(req.nextUrl.searchParams);

    const data = await queryExecute(`select * from members where id=?`, [qData.id]);
    console.log(data);
    if (data.length) {return Response.json(true)}
    else {return Response.json(false);
}}