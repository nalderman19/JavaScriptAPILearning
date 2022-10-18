import librosa as lbs
from keyword_spotting_service import Keyword_Spotting_Service
# import os
import numpy as np

# load and trim signal to remove silence
signal, sr = lbs.load("./scripts/predict/audio.wav")
y, _ = lbs.effects.trim(signal, 10)

print(signal)

# lengthen signal to be exactly 1 second (22050 samples) for the model
out = np.array(y)
out.resize((22050), refcheck=False)
lbs.output.write_wav("./scripts/predict/audio1.wav", out, sr)


# instantiate singleton
kss = Keyword_Spotting_Service()

# predict using model
prediction = kss.predict('./scripts/predict/audio1.wav')

print(prediction)

# record prediction
with open("./scripts/predict/pred.txt", 'w') as f:
    f.write(prediction)

#os.remove('/predict/audio.wav')

# TODO - write text file containing prediction,
# or figure out how to send it directly back to index.js (server)

