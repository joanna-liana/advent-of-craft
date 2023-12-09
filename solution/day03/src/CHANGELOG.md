Implementation:
- Change `Person.addPet` signature to accept the `Pet` to add - the method is no longer concerned with constructing the pet
- Improve `Person.pets`` encaspsulation (no longer mutable from outside)

Tests:
- Improve readability:
  - Divide the test body into more meaningful variables
  - Extract a helper for extracting the youngest pet age by person
