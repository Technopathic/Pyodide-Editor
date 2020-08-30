const plot =
`
import matplotlib.pyplot as plt  
def plot(h):

    x0, x = main(h)
    plt.plot(range(100), h)
    plt.plot([x0], [h[x0]], 'gs')
    plt.plot([x], [h[x]], 'r>')

    plt.plot([x], [h[x]], 'b^')
    show()

plot(h)

`

export default plot

/*

Here's an example of a function that would output a plot graph.
I have no idea what the original intention of rendering these graphs was,
but to simplify things, I turn them into a base64 images. 

In Building AI, I separated the 'plot' function from the functions which
perform the logic and are checked by TMC.
Loading the modules for matplotlib and scikit is slow in Pyodide. 
This is why there is a separate "Plot" button on the editor, so users can run or test their code,
without loading the modules for plotting the code. (You can watch them load in the Browser Console).

Another reason for separating the code is so we can hide the plotting code from the user.
There were concerns the plotting code would look too complex for users and scare them away.
What's truely scary is getting all of this to work so it doesn't scare them away.

*/

