import { ISlashCommand, SlashCommandContext, ISlashCommandPreview, SlashCommandPreviewItemType, ISlashCommandPreviewItem } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { MaxiconApp } from '../MaxiconApp';
import { CommandHelper } from "./commandHelper";

export class StatusPortifolioSlashCommand implements ISlashCommand {
    public command = 'statusportifolio';
    public i18nParamsExample = 'slashcommand_params';
    public i18nDescription = 'command_description';
    public providesPreview = false;
    public permission = 'view-commmand-maxicon';

    constructor(private readonly app: MaxiconApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        let statusPortifolio = 'False'

        let roles = context.getSender().roles

        for(let i in roles){
            if (roles[i].includes("statusportifolio")){
                statusPortifolio = 'True'
            }
        }

        let paramStatus = "&statusPortifolio="+statusPortifolio;
        const command = new CommandHelper(this.app);
        command.getStatusPortifolio(http, context.getSender().username, context.getArguments().toString(), paramStatus, read);
           
        }
    }

    

