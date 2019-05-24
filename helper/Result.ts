import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { ILogger } from '@rocket.chat/apps-engine/definition/accessors';

export class Result {
    public id: string;
    public title: string;
    public previewUrl: string;
    public originalUrl: string;

    // Returns data we care about from the result endpoints
    constructor(data?: any, logger?: ILogger) {
        if(logger)
        logger.info(data);
        if (data) {
            this.id = data.href as string;
            this.title = data.spaceName as string;
            this.previewUrl = data.name as string;
            this.originalUrl = data.href as string;
        }
    }

    public toPreviewItem(): ISlashCommandPreviewItem {
        if (!this.id || !this.previewUrl) {
            throw new Error('Invalid result');
        }
        return {
            id: this.id,
            type: SlashCommandPreviewItemType.OTHER,
            value: this.previewUrl,
        };
    }
}
