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
This page just holds our Code component. The Code component can take three props. 
code: the code for the editor.
test: the test to run against the code
plot: an optional prop for including any function for plotting data from the code.

*/