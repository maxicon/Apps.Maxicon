import { ISlashCommand, SlashCommandContext, ISlashCommandPreview, SlashCommandPreviewItemType, ISlashCommandPreviewItem } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { MaxiconApp } from '../MaxiconApp';
import { CommandHelper } from "./commandHelper";

export class StatusProjetoSlashCommand implements ISlashCommand {
    public command = 'statusprojeto';
    public i18nParamsExample = 'slashcommand_params';
    public i18nDescription = 'command_description';
    public providesPreview = true;
    public permission = 'view-commmand-maxicon';

    constructor(private readonly app: MaxiconApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        this.app.getLogger().info(context.getSender().username);
        this.app.getLogger().info(context.getArguments().toString());
        const command = new CommandHelper(this.app);

        command.getStatus(http, context.getSender().username,context.getArguments().toString());
        
    }

    
}
