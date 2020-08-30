import Code from '../components/Code'

import main from '../exampleData/main.js'
import test from '../exampleData/test.js'
import plot from '../exampleData/plot.js'

const Home = () => (
  <div>
    <Code code={main} test={test} plot={plot}/>
  </div>
)

export default Home

/*
This page just holds our Code component and is an agnostic example.
The Code component can take three props. 
code: the code for the editor.
test: the test to run against the code
plot: an optional prop for including any function for plotting data from the code.

In Building AI, we don't do this. Instead of passing the data as componnet based props, 
we pass the data through redux after it's been pulled from the TMC server.

*/