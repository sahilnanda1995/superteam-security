// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import archiver from "archiver";
import fs from "fs";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dir = path.resolve("ctfs/dyswap");

  if (req.method === 'POST') {
    let parseBody = JSON.parse(req.body);
    // Add user.keypair
    fs.writeFileSync(`${dir}/keys/player.json`, JSON.stringify(parseBody.player));
    res.status(200).json({ status: "Done" });

  } else if (req.method === 'GET') {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=dyswap.zip");

    const zip = archiver("zip");
    
    zip.on('error', function(err) {
      throw err;
    });
    zip.pipe(res);
    zip.directory(dir, "dyswap");
    zip.finalize();
  }  
}