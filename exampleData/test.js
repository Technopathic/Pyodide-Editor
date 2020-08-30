const test =
`
import contextlib
import unittest
import io
import unittest.mock
from unittest import TextTestRunner

class MainTest(unittest.TestCase):

    def test_answer(self):
        w = [random.random()/3, random.random()/3, random.random()/3]
        h = [1.+math.sin(1+x/6.)*w[0]+math.sin(-.3+x/9.)*w[1]+math.sin(-.2+x/30.)*w[2] for x in range(100)]
        h[0] = 0.0; h[99] = 0.0

        x0, x = main(h)

        self.assertGreater(h[x], h[x - 1])
        self.assertGreater(h[x], h[x + 1])

        # I'm going to mention this here as well. This is unrelated to the above unittest above, but I feel like it's important.
        # We don't have access to the TMC helper function get_out() in Pyodide, so we cannot get stdout that way. 
        # Also, we've aliased the print function in Pyodide, so that's also a kick in the teeth when getting stdout.
        # But it's still possible as seen below.
        
        # capturedOutput = io.StringIO()                 
        # sys.stdout = capturedOutput                     
        # main()
        # sys.stdout = sys.__stdout__ 

        # self.assertEqual(capturedOutput.getvalue().strip(), 'Hello World')


test_suite = unittest.TestLoader().loadTestsFromTestCase(MainTest)
with io.StringIO() as buf:
    # run the tests
    with contextlib.redirect_stdout(buf):
        TextTestRunner(stream=buf).run(test_suite)
    # process (in this case: print) the results
    testOutput = buf.getvalue()
`

export default test


/*
We're using TextTestRunner in these pyodide tests so we can get the stdout 
of the tests and store them in the testOutput variable.

Someone better at Python than me could most likely write this test better. 

*/