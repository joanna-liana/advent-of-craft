import { Comment } from './Comment';
import { CommentAlreadyExistException } from './CommentAlreadyExistException';

export class Article {
  private comments: Comment[] = [];

  constructor(
    private readonly name: string,
    private readonly content: string
  ) {}

  addComment(
    text: string,
    author: string,
    creationDate: Date = new Date()
  ): void {
    const comment = new Comment(text, author, creationDate);

    const commentExists = this.comments
      .find(c => c.text === comment.text && c.author === comment.author);

    if (commentExists) {
      throw new CommentAlreadyExistException();
    } else {
      this.comments.push(comment);
    }
  }

  public getComments(): Comment[] {
    return this.comments;
  }
}
