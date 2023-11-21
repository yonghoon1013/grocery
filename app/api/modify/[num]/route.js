import { queryExecute } from "../../route";

export async function GET(req, {params}) {
    let qData = Object.fromEntries(req.nextUrl.searchParams);

    let data = await queryExecute("select * from new_match where num=? && id=?", [params.num, qData.id]);


    if(data.length > 0) {return Response.json(true)}
    else {return Response.json(false)}
    
}

export async function PUT(req, {params}) {
    let qData = await req.json();
    let qData2 = Object.fromEntries(req.nextUrl.searchParams);

    const data = await queryExecute("update new_match set title=?, time=?, count=?, lng=?, lat=?, address=?, text=? where id=? AND num=?", [qData.title, qData.time, qData.count, qData.lng, qData.lat, qData.address, qData.text, qData.id, params.num])


    if (data.length > 0) return Response.json("바뀜");
    else {return Response.json("안바뀜")}
}