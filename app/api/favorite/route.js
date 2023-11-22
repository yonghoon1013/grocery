import { Ruthie } from "next/font/google";
import { queryExecute } from "../route";

export async function GET(req) {
    let qData = Object.fromEntries(req.nextUrl.searchParams)
    console.log(req.nextUrl.searchParams);
    let data = await queryExecute("select * from favorite where id=?", [qData.id]);
    return Response.json(data);
}

export async function POST(req) {
    const data = await req.json();
    console.log(data);
    await queryExecute("insert into favorite (id, name) values (?, ?)", [data.id, data.name])
    const getData =  await queryExecute("select * from favorite where id=?",[data.id])

    return Response.json(getData);
}

export async function DELETE(req) {
    let qData = Object.fromEntries(req.nextUrl.searchParams)
    console.log(req.nextUrl.searchParams);
    let aaa = await queryExecute("delete from favorite where id=? && num=?", [qData.id, qData.num])
    const getData = await queryExecute("select * from favorite where id=?",[qData.id])

    
    return Response.json(getData);
}