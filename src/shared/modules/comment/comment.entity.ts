import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: 5,
    maxlength: 1024,
  })
  public text: string;

  @prop({required: true})
  public date?: string;

  @prop({
    required: true,
  })
  public rating: number;

  @prop({required: true})
  public authorEmail: string;
}

export const CommentModel = getModelForClass(CommentEntity);
