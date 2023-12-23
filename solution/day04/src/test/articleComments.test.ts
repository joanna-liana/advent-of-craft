import { Article } from '../Article';
import { CommentAlreadyExistException } from '../CommentAlreadyExistException';

describe('Article comments', () => {
  let article: Article;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    article = new Article(
      'Lorem Ipsum',
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    );
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('a comment can be added', () => {
    const text = 'Amazing article !!!';
    const author = 'Pablo Escobar';

    article.addComment(text, 'Pablo Escobar');

    expect(article.getComments()).toHaveLength(1);
    expect(article.getComments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text, author })
      ])
    );
  });

  describe('comment date', () => {
    test('given no date, the comment is added with the date of the day', () => {
      const now = new Date(2020, 0, 12);
      jest.setSystemTime(now);

      article.addComment('Amazing article !!!', 'Pablo Escobar');

      expect(article.getComments()).toHaveLength(1);
      expect(article.getComments()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ creationDate: now })
        ])
      );
    });

    test('given a date, the comment is added with the provided date', () => {
      const now = new Date(2020, 0, 12);
      jest.setSystemTime(now);
      const creationDate = new Date(2022, 5, 20);

      article.addComment('Amazing article !!!', 'Pablo Escobar', creationDate);

      expect(article.getComments()).toHaveLength(1);
      expect(article.getComments()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ creationDate })
        ])
      );
    });
  });

  describe('multiple comments', () => {
    const existingCommentText = 'Amazing article !!!';
    const existingCommentAuthor = 'Pablo Escobar';

    let articleWithSingleComment: Article;

    beforeEach(() => {
      articleWithSingleComment = new Article(
        'Lorem Ipsum',
        'consectetur adipiscing elit'
      );

      articleWithSingleComment.addComment(
        existingCommentText,
        existingCommentAuthor
      );

      expect(articleWithSingleComment.getComments()).toHaveLength(1);
    });

    test.each([
      {
        scenario: 'the same author, different text',
        text: existingCommentText + 'part two',
        author: existingCommentAuthor,
      },
      {
        scenario: 'the same text, different author',
        text: `${existingCommentText} part two`,
        author: existingCommentAuthor,
      },
      {
        scenario: 'different text, different author',
        text: `${existingCommentText} part two`,
        author: `${existingCommentAuthor} Junior`,
      }
    ])(
      'an article can have multiple comments - $scenario',
      ({ author, text }) => {
        articleWithSingleComment
          .addComment(text, author);

        expect(articleWithSingleComment.getComments()).toHaveLength(2);
      }
    );

    test('the same comment by the same author cannot be added twice', () => {
      expect(() => {
        articleWithSingleComment
          .addComment(existingCommentText, existingCommentAuthor);
      }).toThrow(CommentAlreadyExistException);

      expect(articleWithSingleComment.getComments()).toHaveLength(1);
    });
  });
});
