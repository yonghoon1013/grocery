import { queryExecute } from "../route";

export async function GET(req) {
    const qData = Object.fromEntries(req.nextUrl.searchParams);

    const data = await queryExecute(`select * from match_member where sNum=?`, [qData.num]);
    const modifydata = await queryExecute("update new_match set mCount=? where num=?", [data.length, qData.num]);
    const getdata = await queryExecute(`select * from new_match where num=?`, [qData.num]);
    return Response.json(getdata)
}
