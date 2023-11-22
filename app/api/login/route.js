import { queryExecute } from "../route";

export async function GET(req, {params}) {
    const qData = Object.fromEntries(req.nextUrl.searchParams)
    
    console.log(qData)

    const data = await queryExecute('select * from members where id=? && password=?', [qData.id, qData.password]);

    console.log(data);
	return Response.json(data);
}
