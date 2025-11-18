import cv2
from fastapi import FastAPI, UploadFile
# STEP 1: Import the necessary modules.
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python.components import processors
from mediapipe.tasks.python import vision
import numpy as np
# STEP 2: Create an ImageClassifier object.
base_options = python.BaseOptions(model_asset_path='.\\model\\efficientnet_lite0.tflite')
options = vision.ImageClassifierOptions(
    base_options=base_options, max_results=4)
classifier = vision.ImageClassifier.create_from_options(options)
app = FastAPI()
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    #3-1 read data from client
    #http통신으로 들어온 이미지 파일은 텍스트 형태임
    contents = await file.read() #비동기로 호출된 함수이기 때문에
    #3-2 convert binary from string
    nparr = np.frombuffer(contents, np.uint8) #이때는 bitmap
    #3-3 image decode from binary image array(buffer)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    #3-4 creae mp image from opencv matrix(img) mediapipe형태의 객체입력을 요구
    rgb_frame = mp.Image(image_format=mp.ImageFormat.SRGB, data=img)
    # STEP 4: Classify the input image.
    classification_result = classifier.classify(rgb_frame)
    # STEP 5: Process the classification result. In this case, visualize it.
    top_category = classification_result.classifications[0].categories[0]
    pred = f"{top_category.category_name} ({top_category.score:.2f})"
    return {"prediction": pred}





