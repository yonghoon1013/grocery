import { queryExecute } from "../route";

export async function POST(req) {
    const qData = await req.json();
    
    const data = await queryExecute("insert into new_match (title, time, id, nickname, count, lng, lat, address, text) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [qData.title, qData.time, qData.id, qData.nickname, qData.count, qData.lng, qData.lat, qData.address, qData.text])
    
    return Response.json(data);
}

export async function GET() {
    let data = await queryExecute("select * from new_match");
    
    return Response.json({data});
}