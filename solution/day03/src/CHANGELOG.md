Implementation:
- Change `Person.addPet` signature to accept the `Pet` to add - the method is no longer concerned with constructing the pet
- Improve `Person.pets` encaspsulation (no longer mutable from outside)

Tests:
- Improve readability:
  - Divide the test body into more meaningful variables
  - Extract a helper for extracting the youngest pet age by person
  - Assert the actual person, not just the name (inspired by [Yann's solution](https://github.com/yanncourtel/advent-of-craft-2023/blob/f2f732b1675582f38f62d6e7b24a1f56538d4273/exercise/day03/src/test/java/PopulationTests.java#L30))
