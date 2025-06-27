import gradio as gr
from predict import predict_iris

def predict_wrapper(sl,sw,pl,pw):
    return predict_iris(sl,sw,pl,pw)

demo = gr.Interface(
    fn=predict_wrapper,
    inputs=[
        gr.Number(label="Sepal Length"),
        gr.Number(label="Sepal Width"),
        gr.Number(label="Petal Length"),
        gr.Number(label="Petal Width")
    ],
    outputs=gr.Textbox(label="Predicted Species"),
    title="Iris Flower Classifier",
    description="Enter flower measurements to predict its species"
)

demo.launch()