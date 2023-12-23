export class CommentAlreadyExistException extends Error {
  constructor() {
    super('Comment already exists');
  }
}
