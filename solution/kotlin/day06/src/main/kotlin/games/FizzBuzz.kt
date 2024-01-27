package games

private const val MIN = 0
private const val MAX = 100

object FizzBuzz {
    fun convert(input: Int): String = when {
        isOutOfRange(input) -> throw OutOfRangeException()
        `is`(15, input) -> "FizzBuzz"
        `is`(3, input) -> "Fizz"
        `is`(5, input) -> "Buzz"
        else -> input.toString()
    }

    private fun `is`(divisor: Int, input: Int): Boolean {
        return input % divisor == 0
    }

    private fun isOutOfRange(input: Int) = input <= MIN || input > MAX
}
