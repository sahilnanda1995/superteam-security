// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import archiver from "archiver";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
  const dir = path.resolve("ctfs/flash-loan");
  if (req.method === 'POST') {
    let parseBody = JSON.parse(req.body);
    
    fs.writeFileSync(`${dir}/keys/pubkeys.json`, JSON.stringify(parseBody));
    res.status(200).json({ status: "Done" });

  } else if (req.method === 'GET') {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=flash-loan.zip");

    const zip = archiver("zip");
    
    zip.on('error', function(err) {
      throw err;
    });
    zip.pipe(res);
    zip.directory(dir, "flash-loan");
    zip.finalize();
  }  
} catch (e) {
  console.log(`error :: ${e}`);
  
}
}