const show = 
`
import os
os.environ['MPLBACKEND'] = 'AGG'

import io, base64
def show():
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    figureOutput.append('data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8'))
`

export default show