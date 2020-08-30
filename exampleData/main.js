const main = 
`import math, random   
	 
w = [random.random()/3, random.random()/3, random.random()/3]
h = [1.+math.sin(1+x/6.)*w[0]+math.sin(-.3+x/9.)*w[1]+math.sin(-.2+x/30.)*w[2] for x in range(100)]
h[0] = 0.0; h[99] = 0.0

def climb(x, h):
    summit = False

    while not summit:
        summit = True
        if h[x + 1] > h[x] and h[x+1]:
            x = x + 1
            summit = False
        elif h[x - 1] > h[x]:
            x = x - 1
            summit = False
    return x

def main(h):

    x0 = random.randint(1, 98)
    x = climb(x0, h)

    return x0, x

print(main(h))
`

export default main

/*

I'm exporting Python Code in JS files in these examples. 
In a real world scenario, you might pull this python code from a remote server then parse the .py file as a string to be loaded into the editor / pyodide. 

For example, with Building-AI, we download the exercise zip containing the necessary .py files, unzip the files using JSZIP which parses them to strings, then we load those into the code editor component. Of course, this is just one example which worked for Building-AI while I was nosing my way around deadlines.

*/


