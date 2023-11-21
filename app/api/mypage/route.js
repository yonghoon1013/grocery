import { queryExecute } from "../route";

export async function GET(req) {
    const qData = Object.fromEntries(req.nextUrl.searchParams);

    const data = await queryExecute("select * from members where id=? && nickname=?", [qData.id, qData.nickname]);

    return Response.json(data);
}

export async function PUT(req) {
    const qData = await req.json();
    console.log(qData);

    const data = await queryExecute("update members set password=? where id=? && password=?", [qData.apassword, qData.id, qData.bpassword]);
    console.log(data);

    return Response.json(data);
}