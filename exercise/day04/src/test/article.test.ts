import { Article } from '../Article';
import { CommentAlreadyExistException } from '../CommentAlreadyExistException';

describe('Article', () => {
  test('it should add valid comment', () => {
    const article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );

    article.addComment('Amazing article !!!', 'Pablo Escobar');
  });

  test('it should add a comment with the given text', () => {
    const article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );

    const text = 'Amazing article !!!';
    article.addComment(text, 'Pablo Escobar');

    expect(article.getComments()).toHaveLength(1);
    expect(article.getComments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text })
      ])
    );
  });

  test('it should add a comment with the given author', () => {
    const article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );

    const author = 'Pablo Escobar';
    article.addComment('Amazing article !!!', author);

    expect(article.getComments()).toHaveLength(1);
    expect(article.getComments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ author })
      ])
    );
  });

  test('it should add a comment with the date of the day', () => {
    const article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );

    article.addComment('Amazing article !!!', 'Pablo Escobar');
  });

  test('it should throw an exception when adding existing comment', () => {
    const article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );
    article.addComment('Amazing article !!!', 'Pablo Escobar');

    expect(() => {
      article.addComment('Amazing article !!!', 'Pablo Escobar');
    }).toThrow(CommentAlreadyExistException);
  });
});
