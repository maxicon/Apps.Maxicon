import { ISlashCommand, SlashCommandContext, ISlashCommandPreview, SlashCommandPreviewItemType, ISlashCommandPreviewItem } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { MaxiconApp } from '../MaxiconApp';
import { CommandHelper } from "./commandHelper";

export class StatusProjetoSlashCommand implements ISlashCommand {
    public command = 'statusprojeto';
    public i18nParamsExample = 'slashcommand_params';
    public i18nDescription = 'command_description';
    public providesPreview = false;
    public permission = 'view-commmand-maxicon';

    constructor(private readonly app: MaxiconApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        let statusProjeto = ''
        let statusPacote = ''
        let statusPortifolio = ''

        let roles = context.getSender().roles

        for(let i in roles){
            if (roles[i].includes("statusprojeto")){
                statusProjeto = 'True'
            }
            if (roles[i].includes("statuspacote")){
                statusPacote = 'True'
            }

            if (roles[i].includes("statusportifolio")){
                statusPortifolio = 'True'
            }
        }
        let paramStatus = "&statusProjeto="+statusProjeto+"&statusPacote="+statusPacote+"&statusPortifolio="+statusPortifolio;
        const command = new CommandHelper(this.app);
        command.getStatus(http, context.getSender().username, context.getArguments().toString(), paramStatus, read);
        
        let url: string = await read.getEnvironmentReader().getSettings().getValueById('url_status');
        this.app.getLogger().info(url+paramStatus);
           
        }
        
        
    }

    

