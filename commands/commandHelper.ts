import { SlashCommandContext, ISlashCommandPreview, ISlashCommandPreviewItem } from "@rocket.chat/apps-engine/definition/slashcommands";

import { IRead, IModify, IHttp, IPersistence } from "@rocket.chat/apps-engine/definition/accessors";
import { Result } from "./result";
import { MaxiconApp } from "../MaxiconApp";

export class  CommandHelper{

    constructor(private readonly app: MaxiconApp) { }


    async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
        let res: Array<Result>;
        let items: Array<ISlashCommandPreviewItem>;

        try {
            res = await this.app.getGetter().search(this.app.getLogger(), http, context.getArguments().join(' '), read);
            items = res.map((re) => re.toPreviewItem());
        } catch (e) {
            this.app.getLogger().error('Failed on something:', e);
            return {
                i18nTitle: 'ERROR',
                items: new Array(),
            };
        }

        return {
            i18nTitle: 'Results for',
            items,
        };
    }


    async getStatus(http: IHttp, user: string, param: string){
     
        try {
            await http.get("https://sds.maxiconsystems.com.br/statusprojeto/"+param+"?name="+user);
        } catch (e) {
            this.app.getLogger().error('Failed on something:', e);
            return {
                i18nTitle: 'ERROR',
                items: new Array(),
            };
        }

       return null;
    }

    public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
        modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const builder = modify.getCreator().startMessage().setSender(context.getSender()).setRoom(context.getRoom());

        try {
            let url: string = await read.getEnvironmentReader().getSettings().getValueById('url_alias');
            if (!url) {
                throw new Error('url_alias not found')
            }
            if(url.substring(url.length -1, url.length) === '/'){
                url = url.substring(0, url.length -1)
            }
            builder.setText(`${url}${item.id}`);
            await modify.getCreator().finish(builder);
        } catch (e) {
            this.app.getLogger().error('Failed getting a result', e);
            builder.setText('An error occurred');

            modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
        }
    }
}
