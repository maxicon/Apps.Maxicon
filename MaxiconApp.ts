import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { Getter } from './commands/Getter';
import { ManualSlashCommand } from './commands/manual';
import { ConfluenceSlashCommand } from './commands/confluence';
import { StatusProjetoSlashCommand } from './commands/statusprojeto';
import { StatusPortifolioSlashCommand } from './commands/statusportifolio';
import { StatusPacoteSlashCommand } from './commands/statuspacote';

export class MaxiconApp extends App {

    private getter: Getter;

    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
        this.getter = new Getter();
    }

    public getGetter(): Getter {
        return this.getter;
    }

    public async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {

        configuration.settings.provideSetting({
            id: 'user_alias',
            type: SettingType.STRING,
            packageValue: 'username',
            required: true,
            public: false,
            i18nLabel: 'user_alias_label',
            i18nDescription: 'user_alias_description',
        });

        configuration.settings.provideSetting({
            id: 'passwd_alias',
            type: SettingType.STRING,
            packageValue: 'password',
            required: true,
            public: false,
            i18nLabel: 'passwd_alias',
            i18nDescription: 'passwd_alias_description',
        });

        configuration.settings.provideSetting({
            id: 'url_alias',
            type: SettingType.STRING,
            packageValue: 'https://confluence.maxiconsystems.com.br/',
            required: true,
            public: false,
            i18nLabel: 'passwd_alias',
            i18nDescription: 'passwd_alias_description',
        });

        configuration.settings.provideSetting({
            id: 'url_status',
            type: SettingType.STRING,
            //packageValue: 'http://127.0.0.1:5000/statusprojeto/',
            packageValue: 'https://sds.maxiconsystems.com.br/statusprojeto/',
            required: true,
            public: false,
            i18nLabel: 'passwd_alias',
            i18nDescription: 'passwd_alias_description',
        });

        configuration.settings.provideSetting({
            id: 'url_statusportifolio',
            type: SettingType.STRING,
            //packageValue: 'http://127.0.0.1:5000/statusportifolio/',
            packageValue: 'http://192.168.180.127:5000/statusportifolio',
            required: true,
            public: false,
            i18nLabel: 'passwd_alias',
            i18nDescription: 'passwd_alias_description',
        });

        configuration.slashCommands.provideSlashCommand(new ManualSlashCommand(this));
        configuration.slashCommands.provideSlashCommand(new ConfluenceSlashCommand(this));
        configuration.slashCommands.provideSlashCommand(new StatusPacoteSlashCommand(this));
        configuration.slashCommands.provideSlashCommand(new StatusProjetoSlashCommand(this));
        configuration.slashCommands.provideSlashCommand(new StatusPortifolioSlashCommand(this));
        


    }
}
