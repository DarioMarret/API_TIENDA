import { base64encode, base64decode } from 'nodejs-base64';
import 'dotenv/config'
export function ValidacionBasic(req, reply, next) {
    console.log(req.headers['authorization']);
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const Basic = bearerHeader.split(" ")[1];
        let BasicDecode = base64decode(Basic).split(":")
        console.log(BasicDecode);
        if (process.env.BASIC_USERNAME == BasicDecode[0] && process.env.BASIC_PASSWORD == BasicDecode[1]) {
            req.basic = Basic;
            next();
        } else {
            reply.code(403).send('not authorized');
        }
    } else {
        reply.code(403).send('not authorized');
    }
}