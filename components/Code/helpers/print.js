const print = 
`
import sys

output = []
figureOutput = []
testOutput = ""

def print(data):
    output.append(str(data))
    sys.stdout.write(str(data))
`

export default print

/*
This is a print alias so we can output our print functions to the actual page, instead of just console.log()
Also included an stdout so we can get the print function result from the local test. 
This script should not be sent to TMC. It's just a helper for Pyodide.
*/