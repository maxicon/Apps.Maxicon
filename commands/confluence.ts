import { ISlashCommand, SlashCommandContext, ISlashCommandPreview, SlashCommandPreviewItemType, ISlashCommandPreviewItem } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { MaxiconApp } from '../MaxiconApp';
import { CommandHelper } from '../helper/commandHelper';

export class ConfluenceSlashCommand implements ISlashCommand {
    public command = 'confluence';
    public i18nParamsExample = 'slashcommand_params';
    public i18nDescription = 'command_description';
    public providesPreview = true;
    public permission = 'view-commmand-maxicon';

    constructor(private readonly app: MaxiconApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
        const command = new CommandHelper(this.app);
        return command.previewer(context, read, modify, http, persis);
    }

    public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
        modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const command = new CommandHelper(this.app);
        return command.executePreviewItem(item, context, read, modify, http, persis);
    }
}
