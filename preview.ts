import { ISlashCommandPreview, ISlashCommandPreviewItem, SlashCommandPreviewItemType } from "@rocket.chat/apps-engine/definition/slashcommands";

export class PreviewManual implements ISlashCommandPreview{
    i18nTitle: string;
    items: ISlashCommandPreviewItem[];
}


export class PreviewItemManual implements ISlashCommandPreviewItem {
    type: SlashCommandPreviewItemType;
    value: string;
    id: string;


    constructor(_id: string, _type: SlashCommandPreviewItemType, _value: string){
        this.id = _id;
        this.type = _type;
        this.value = _value;
    }


}
