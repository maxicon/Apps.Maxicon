import { HttpStatusCode, IHttp, ILogger, IRead, IHttpRequest } from '@rocket.chat/apps-engine/definition/accessors';
import { Result } from './result';



export class Getter {
    private readonly url = 'https://confluence.maxiconsystems.com.br/rest/quicknav/1/search?query=';
    private readonly defaultKey = 'kICM0DRhpfvIcGLhtmCjqEigApnPMLXf';

    public async search(logger: ILogger, http: IHttp, phase: string, read: IRead): Promise<Array<Result>> {
        // TODO: Maybe error out when they don't provide us with something?
        let search = phase.trim();
        if (!search) {
            search = 'random';
        }

        let url = await read.getEnvironmentReader().getSettings().getValueById('url_alias');
        if (!url) {
            throw new Error('url_alias not found')
        }
        if(url.substring(url.length -1, url.length) === '/'){
            url = url.substring(0, url.length -1)
        }
        const username = await read.getEnvironmentReader().getSettings().getValueById('user_alias');
        if (!username) {
            throw new Error('uruser_aliasl_alias not found')
        }
        const passwd = await read.getEnvironmentReader().getSettings().getValueById('passwd_alias');
        if (!passwd) {
            throw new Error('url_alias not found')
        }

        const pass64 = this.converte64(`${username}:${passwd}`)
        const headers = {
            Authorization: `Basic ${pass64}`
        }
        const opt: IHttpRequest = {};
        opt.headers = headers;

        const response = await http.get(`${url}/rest/quicknav/1/search?query=${search}`, opt);


        if (response.statusCode !== HttpStatusCode.OK || !response.data || !response.data.contentNameMatches) {
            logger.debug('Did not get a valid response', response);
            throw new Error('Unable to retrieve');
        } else if (!Array.isArray(response.data.contentNameMatches[0])) {
            logger.debug('The response data is not an Array:', response.data.data);
            throw new Error('Data is in a format we don\'t understand.');
        }

        return response.data.contentNameMatches[0].map((r) => new Result(r, logger));
    }



    converte64(input) {
        var str = String(input);
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        for (
            // initialize result and counter
            var block, charCode, idx = 0, map = chars, output = '';
            // if the next str index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || (map = '=', idx % 1);
            // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = str.charCodeAt(idx += 3 / 4);
            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            block = block << 8 | charCode;
        }
        return output;
    }


}
