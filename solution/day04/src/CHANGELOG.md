Improvements to the tests:
1. "it should add valid comment" - no assertion; added the missing assertion by combining this and the following two tests: "it should add a comment with the given text", "it should add a comment with the given author"
2. "it should add a comment with the date of the day" - no assertion, added the missing one.
3. Added a test that checks if the provided comment date is saved.
4. Cleaned up test setup.
5. "it should throw an exception when adding existing comment" - the test checked the exception but not the state of the article; asserted that the comment was not added despite the error.
6. Improved test names to focus just on article comments (and not on `Article` as a whole)
